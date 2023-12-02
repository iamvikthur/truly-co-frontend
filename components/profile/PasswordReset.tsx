import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import FormInput from './FormInput';
import Header from './Header';
import { ErrorMessage } from './ProfilePanel.styles';
import { ApiError } from '../../lib/fetcher';
import { passwordField } from '../../lib/forms';
import { ProfileContext } from '../../lib/context';

const PasswordReset = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, errors, formState } = useForm();
  const [submitError, setSubmitError] = useState(0);
  const [isSent, setIsSent] = useState(false);
  const setIsProfileOpened = useContext(ProfileContext)[1];

  const handleChange = async (data) => {
    setSubmitError(0);
    setIsSent(false);

    await fetch(`/api/password-reset`, {
      method: 'PUT',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: router.query.reset,
        newPassword: data.newPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new ApiError(response);
        return response.json();
      })
      .then((_data) => {
        setIsSent(true);
      })
      .catch((error) => {
        setSubmitError(error.status);
      });
  };

  const handleLinkClick = () => setTimeout(() => setIsProfileOpened(true));

  return (
    <div>
      <Header />
      {isSent ? (
        <>
          <h3>Success</h3>
          <p>You can now use your new password to log in to your account</p>
          <Link href="/">
            <a onClick={handleLinkClick}>Login</a>
          </Link>
        </>
      ) : (
        <>
          <h3>Enter new password to complete the reset process</h3>
          <form onSubmit={handleSubmit(handleChange)} noValidate>
            <FormInput
              type="password"
              placeholder="New password"
              name="newPassword"
              forwardRef={register(passwordField)}
            />
            <FormInput
              type="password"
              placeholder="Confirm new password"
              name="confirmPassword"
              forwardRef={register({
                validate: (value) => value === watch('newPassword') || "Password doesn't match",
              })}
            />
            {(errors.newPassword?.message || errors.confirmPassword?.message) && (
              <ErrorMessage>
                <b>
                  {errors?.newPassword?.message
                    ? errors?.newPassword?.message
                    : errors?.confirmPassword?.message
                    ? errors?.confirmPassword?.message
                    : ''}
                </b>
              </ErrorMessage>
            )}

            <input type="submit" disabled={formState.isSubmitting} value="Reset password" />
            <Link href="/[[...story]]" as="/">
              <a onClick={handleLinkClick}>Cancel</a>
            </Link>
          </form>

          {submitError < 400 ? null : submitError === 422 ? (
            <p>
              Your password reset link is invalid. Please{' '}
              <Link href="/">
                <a onClick={handleLinkClick}>request a new one</a>
              </Link>
            </p>
          ) : (
            <p>An unexpected error occurred. Please try again later</p>
          )}
        </>
      )}
    </div>
  );
};

export default PasswordReset;
