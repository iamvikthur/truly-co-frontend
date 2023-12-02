import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import FormInput from './FormInput';
import { ErrorMessage } from './ProfilePanel.styles';
import { ApiError } from '../../lib/fetcher';
import { emailField, fullNameField, passwordField } from '../../lib/forms';

const Signup = () => {
  const { register, handleSubmit, watch, errors, clearErrors, formState } = useForm();
  const [signupError, setSignupError] = useState('');

  const handleSignup = async (data) => {
    setSignupError('');

    await fetch(`/api/users`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          mutate(`/api/my-profile`);
        } else {
          throw new ApiError(response);
        }
      })
      .catch((error) => {
        setSignupError(
          error.status === 422
            ? 'The email or password you entered is incorrect'
            : 'An unexpected error occurred'
        );
      });
  };

  const handleInputChange = () => signupError && setSignupError('');

  const handlePasswordChange = () => {
    clearErrors('confirmPassword');
    handleInputChange();
  };

  return (
    <div>
      <p style={{ fontSize: '21px', marginBottom: '30px' }}>
        TrulyCo stories are free to read. Sign up to receive thematic newsletters, discuss within
        stories, access exclusive content and support our social causes.
      </p>
      <form onSubmit={handleSubmit(handleSignup)} noValidate>
        <FormInput
          type="email"
          placeholder="Email"
          name="email"
          forwardRef={register(emailField)}
          onChange={handleInputChange}
        />

        <FormInput
          forwardRef={register(fullNameField)}
          name="fullName"
          placeholder="Full name"
          type="text"
        />

        <FormInput
          forwardRef={register(passwordField)}
          name="password"
          placeholder="Password"
          type="password"
          onChange={handlePasswordChange}
        />

        <FormInput
          forwardRef={register({
            validate: (value) => value === watch('password') || 'Passwords do not match',
          })}
          name="confirmPassword"
          placeholder="Confirm password"
          type="password"
          onChange={handleInputChange}
        />
        {(errors?.email?.message ||
          errors?.fullName?.message ||
          errors?.password?.message ||
          errors?.confirmPassword?.message ||
          signupError) && (
          <ErrorMessage>
            <b>
              {errors?.email?.message ||
                errors?.fullName?.message ||
                errors?.password?.message ||
                errors?.confirmPassword?.message ||
                signupError}
            </b>
          </ErrorMessage>
        )}

        <input type="submit" disabled={formState.isSubmitting} value="Sign up" />
      </form>
    </div>
  );
};

export default Signup;
