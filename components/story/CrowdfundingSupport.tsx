import { useCallback, useEffect, useState } from 'react';
import {
  braintreeStyles,
  CrowdfundingDonationStatus,
  CrowdfundingSupportContainer,
  CrowdfundingSupportSection,
} from './CrowdfundingSupport.styles';
import CrowdfundingForm from './CrowdfundingForm';
import Header from '../profile/Header';
import useConfig from '../../lib/useConfig';
import { mutate } from 'swr';
import { useRouter } from 'next/router';

declare const GGPaymentConfig: any;
declare const GGPayment: any;

const CrowdfundingSupport = ({ isOpened, project, onCloseSupport }) => {
  const router = useRouter();
  const config = useConfig();
  const [receipt, setReceipt] = useState({
    currencyCode: '',
    totalAmountBilled: -1,
  });
  const [currencyListIsOpened, setCurrencyListIsOpened] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [error, setError] = useState(false);

  const initForm = useCallback(() => {
    async function getApiToken() {
      const response = await fetch('https://api.globalgiving.org/api/userservice/tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          auth_request: {
            user: {
              email: 'adetomiwa.isiaka@bytruly.com',
              password: 'Gorillaz1',
            },
            api_key: config.globalgiving_api_key,
          },
        }),
      });
      return response.json();
    }

    getApiToken().then((data) => {
      const paymentConfig = new GGPaymentConfig({
        api_key: config.globalgiving_api_key,
        api_token: data.auth_response.access_token,
        is_test: false,
        paymentGatewayKey: 'production_8hfk4tqb_4q6hk4rf4m6f9945',
        refcode: data.auth_response.access_token,
        transactionId: Date.now(),
      });
      const payment = new GGPayment(paymentConfig);

      const beforeSubmitCallback = function () {
        setProcessing(true);
        return true;
      };

      const successCallback = function (data, _s, _d, _n) {
        setProcessing(false);
        setDonationSuccess(true);
        const { currencyCode, totalAmountBilled } = data.donation.receipt;
        setReceipt({ currencyCode, totalAmountBilled });

        fetch(`/api/stories/${router.query.story}/donate`, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        })
          .then(() => mutate(`/api/my-profile`))
          .catch(() => undefined);

        setTimeout(() => {
          setReceipt({ currencyCode: '', totalAmountBilled: -1 });
          setDonationSuccess(false);
          initForm();
        }, 5000);
      };

      const errorCallback = function (_jqXHR) {
        setProcessing(false);
        setError(true);
      };

      payment.braintree.styles = braintreeStyles;
      payment.donation.project.id = project.id;
      payment.startup(successCallback, errorCallback, beforeSubmitCallback);
    });
  }, [config.globalgiving_api_key, project.id, router.query.story]);

  useEffect(() => {
    initForm();
  }, [initForm]);

  const handleBack = () => {
    onCloseSupport();
  };

  return (
    <>
      <CrowdfundingSupportContainer
        opened={isOpened}
        onClick={() => currencyListIsOpened && setCurrencyListIsOpened(false)}
      >
        {!processing && !donationSuccess && !error ? (
          <>
            <Header onlyBack={true} onBack={handleBack} />
            <CrowdfundingSupportSection>
              <h3>Support the project:</h3>

              <CrowdfundingForm
                curListIsOpened={currencyListIsOpened}
                onClick={() => setCurrencyListIsOpened(!currencyListIsOpened)}
              />
            </CrowdfundingSupportSection>
          </>
        ) : (
          <CrowdfundingDonationStatus>
            {error ? (
              <>
                <p>
                  Oops.
                  <br />
                  Payment failed. Please <b>try again.</b>
                </p>
                <button
                  onClick={() => {
                    setError(false);
                    initForm();
                  }}
                >
                  Try again
                </button>
              </>
            ) : processing ? (
              <p>Payment processing...</p>
            ) : donationSuccess ? (
              <p>
                Thank you!
                <br />
                The project <b>&quot;{project.title}&quot;</b> was successfully sponsored.
                <br />
                <br />
                Total donation: <b>{receipt.totalAmountBilled}</b> {receipt.currencyCode}
              </p>
            ) : null}
          </CrowdfundingDonationStatus>
        )}
      </CrowdfundingSupportContainer>
    </>
  );
};

export default CrowdfundingSupport;
