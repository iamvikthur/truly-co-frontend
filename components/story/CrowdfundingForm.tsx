import { useEffect, useState } from 'react';
import FormInput from '../profile/FormInput';
import { ErrorMessage } from '../profile/ProfilePanel.styles';
import { CurrencyList, FieldWithCurrensyList, Form } from './CrowdfundingForm.styles';

const currencies = [
  { value: 'USD', name: 'United States Dollar', pre: '$', min: 10, max: 100000 },
  { value: 'GBP', name: 'Pound sterling', pre: '£', min: 5, max: 50000 },
  { value: 'EUR', name: 'Euro', pre: '€', min: 5, max: 80000 },
  { value: 'CAD', name: 'Canadian Dollar', pre: '$', min: 10, max: 100000 },
  { value: 'AUD', name: 'Australian Dollar', pre: '$', min: 10, max: 100000 },
];

const CrowdfundingForm = ({ curListIsOpened, onClick }) => {
  const [currency, setCurrency] = useState('USD');
  const [currencyData, setCurrencyData] = useState(
    currencies.filter((c: any) => c.value === currency).length
      ? Object.assign({}, currencies.filter((c: any) => c.value === currency)[0])
      : null
  );
  const [showCurrencyMessage, setShowCurrencyMessage] = useState(false);

  useEffect(() => {
    const c = currencies.filter((c: any) => c.value === currency);
    if (c[0]) {
      setCurrencyData(Object.assign({}, c[0]));
    }
  }, [currency]);

  const handleChangeCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    const { min, max } = currencyData;
    setShowCurrencyMessage(+value > max || +value < min);
  };

  const handleClickCurrency = (value: string) => {
    setCurrency(value);
  };

  return (
    <Form method="post" id="ggPaymentForm">
      <FieldWithCurrensyList minMaxCurrencyPrevent={showCurrencyMessage}>
        <span>{currencyData?.pre}</span>
        <FormInput
          defaultValue={'10'}
          id="amount"
          min={currencyData?.min}
          max={currencyData?.max}
          name="donation.amount"
          type="number"
          required
          onChange={handleChangeCurrency}
        />

        {currencies && (
          <CurrencyList opened={curListIsOpened}>
            <span onClick={onClick}>{currency}</span>
            <input
              name="donation.currencyCode"
              value={currency}
              style={{ display: 'none' }}
              readOnly
            />
            <ul>
              {currencies.map((c, key) => (
                <li value={c.value} key={key} onClick={() => handleClickCurrency(c.value)}>
                  <label>
                    <input
                      name="radioForCurrency"
                      defaultChecked={c.value === 'USD'}
                      type="radio"
                      value={c.value}
                    />
                    <p>{c.name}</p>
                    <span>{c.value}</span>
                  </label>
                </li>
              ))}
            </ul>
          </CurrencyList>
        )}

        {showCurrencyMessage && (
          <ErrorMessage>
            We does not accept donations of less than{' '}
            <b>
              {currencyData?.pre}
              {currencyData?.min} {currency}
            </b>{' '}
            or more than{' '}
            <b>
              {currencyData?.pre}
              {currencyData?.max} {currency}
            </b>
            . Please edit your donation.
          </ErrorMessage>
        )}
      </FieldWithCurrensyList>

      <FormInput
        name="donation.payment_detail.firstname"
        placeholder={'First Name'}
        type="text"
        id="firstName"
        required
      />

      <FormInput
        placeholder={'Last Name'}
        name="donation.payment_detail.lastname"
        type="text"
        id="lastName"
        required
      />

      <FormInput placeholder={'Email'} name="donation.email" type="email" id="email" required />

      <fieldset>
        <label className="hosted-fields--label" htmlFor="ggCardNumber">
          Card Number
          <div id="ggCardNumber" className="hosted-field"></div>
        </label>
        <label className="hosted-fields--label" htmlFor="ggCardExpiration">
          Expiration Date
          <div id="ggCardExpiration" className="hosted-field"></div>
        </label>

        <label className="hosted-fields--label" htmlFor="ggCardCvv">
          CVV
          <div id="ggCardCvv" className="hosted-field"></div>
        </label>

        <label className="hosted-fields--label" htmlFor="ggCardPostal">
          Postal Code
          <div id="ggCardPostal" className="hosted-field"></div>
        </label>
      </fieldset>

      <div className="button-container">
        <input type="submit" value="Donate" id="submitButton" />
      </div>
    </Form>
  );
};

export default CrowdfundingForm;
