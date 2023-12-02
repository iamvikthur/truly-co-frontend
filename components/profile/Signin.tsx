import { useState } from 'react';
import { mutate } from 'swr';
import { useForm } from 'react-hook-form';
import FormInput from './FormInput';
import { ErrorMessage } from './ProfilePanel.styles';
import { emailField } from '../../lib/forms';
import { ApiError } from '../../lib/fetcher';

const Login = ({ onForgotPasswordClick }) => {
  const { register, handleSubmit, formState, errors, setValue } = useForm();
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (data) => {
    setLoginError('');

    await fetch(`/api/session`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          mutate(`/api/my-profile`);
        } else {
          throw new ApiError(response);
        }
      })
      .catch((error) => {
        setLoginError(
          error.status === 422
            ? 'The email or password you entered is incorrect'
            : 'An unexpected error occurred'
        );
      });
  };

  const handleInputChange = () => loginError && setLoginError('');

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)} noValidate>
        <FormInput
          forwardRef={register(emailField)}
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleInputChange}
        />

        <FormInput
          forwardRef={register({
            required: 'Password is required',
          })}
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleInputChange}
        />
        {(errors?.password?.message || errors?.email?.message || loginError) && (
          <ErrorMessage>
            <b>{errors?.password?.message || errors?.email?.message || loginError}</b>
          </ErrorMessage>
        )}

        <input type="submit" disabled={formState.isSubmitting} value="Log in" />
        <button onClick={onForgotPasswordClick}>Forgot password?</button>
      </form>
      {process.env.NODE_ENV === 'development' && (
        <button
          style={{ fontSize: '70%' }}
          onClick={() => {
            setValue('email', 'test@email.com');
            setValue('password', '123QWEasd!');
          }}
        >
          Quick login
        </button>
      )}
    </div>
  );
};

export default Login;
