import { useForm } from 'react-hook-form';
import { useState } from 'react';
import FormInput from './FormInput';
import Header from './Header';
import { ErrorMessage } from './ProfilePanel.styles';
import { ApiError } from '../../lib/fetcher';
import { emailField } from '../../lib/forms';

const PasswordForgot = ({ onBack }) => {
  const { register, handleSubmit, errors, formState } = useForm();
  const [submitError, setSubmitError] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleReset = async (data) => {
    setSubmitError('');
    setIsSent(false);

    await fetch(`/api/password-reset`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) throw new ApiError(response);
        return response.json();
      })
      .then((_data) => {
        setIsSent(true);
      })
      .catch((_error) => {
        setSubmitError('An unexpected error occurred. Please try again later');
      });
  };

  return (
    <>
      <Header onBack={onBack} />
      <h3>Forgot your password?</h3>
      {isSent ? (
        <>
          <br />
          <p>
            If we have this email address in our database, we will send you an email with further
            instructions. If you have not received an email yet, please check your spam folder. If
            you are still experiencing any problems, contact support at{' '}
            <a href="mailto:​support@bytruly.com">support@bytruly.com</a>.
          </p>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit(handleReset)} noValidate>
            <p>
              Enter the email address associated with your Truly Co account and we will send you a
              password reset link.
            </p>

            <FormInput
              forwardRef={register(emailField)}
              name="email"
              placeholder="Email"
              type="email"
            />
            {errors?.email?.message && (
              <ErrorMessage>
                <b>{errors?.email?.message}</b>
              </ErrorMessage>
            )}

            <input type="submit" disabled={formState.isSubmitting} value="Reset password" />
          </form>
          <p>{submitError}</p>
        </>
      )}
    </>
  );
};

export default PasswordForgot;
