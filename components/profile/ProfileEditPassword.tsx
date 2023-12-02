import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from './FormInput';
import { ErrorMessage } from './ProfilePanel.styles';
import { ApiError } from '../../lib/fetcher';
import { passwordField } from '../../lib/forms';
import useUser from '../../lib/useUser';

const ProfileEditPassword = () => {
  const { user } = useUser();
  const { register, handleSubmit, watch, errors, formState } = useForm();
  const [submitError, setSubmitError] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);

  const handleChange = async (data) => {
    setSubmitError('');
    setIsChanged(false);

    await fetch(`/api/my-profile/password`, {
      method: 'PUT',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new ApiError(response);
        return response.json();
      })
      .then((_data) => {
        setIsChanged(true);
      })
      .catch((error) => {
        setSubmitError(
          error.status === 422 ? 'Invalid password supplied' : 'An unexpected error occurred'
        );
      });
  };

  const handleReset = async () => {
    setSubmitError('');
    setIsRecovery(false);

    await fetch(`/api/password-reset`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email }),
    })
      .then((response) => {
        if (!response.ok) throw new ApiError(response);
        return response.json();
      })
      .then((_data) => {
        setIsRecovery(true);
      })
      .catch((_error) => {
        setSubmitError('An unexpected error occurred. Please try again later');
      });
  };

  return isChanged ? (
    <>
      <h3>Success</h3>
      <p>Password changed successfully</p>
    </>
  ) : isRecovery ? (
    <>
      <h3>Check your email</h3>
      <p>
        We&apos;ve sent you an email with further instructions. If you don&apos;t see the email,
        check your spam folder. If you are still experiencing any problems, contact support at
        support@truly.co
      </p>
    </>
  ) : (
    <>
      <h3>
        Enter your current password
        <br />
        to reset.
      </h3>
      <form onSubmit={handleSubmit(handleChange)} noValidate>
        <FormInput
          forwardRef={register(passwordField)}
          name="oldPassword"
          placeholder="Current password"
          type="password"
        />
        <FormInput
          forwardRef={register(passwordField)}
          name="newPassword"
          placeholder="New password"
          type="password"
        />
        <FormInput
          forwardRef={register({
            validate: (value) => value === watch('newPassword') || 'Passwords do not match',
          })}
          name="confirmPassword"
          placeholder="Confirm new password"
          type="password"
        />

        {(errors?.oldPassword?.message ||
          errors?.newPassword?.message ||
          errors?.confirmPassword?.message ||
          submitError) && (
          <ErrorMessage>
            <b>
              {errors?.oldPassword?.message ||
                errors?.newPassword?.message ||
                errors?.confirmPassword?.message ||
                submitError}
            </b>
          </ErrorMessage>
        )}

        <input type="submit" disabled={formState.isSubmitting} value="Change password" />
        <button type="button" onClick={handleReset}>
          Get a recovery link
        </button>
      </form>
    </>
  );
};

export default ProfileEditPassword;
