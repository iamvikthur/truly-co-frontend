import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import FormInput from './FormInput';
import { ButtonEdit, ProfileContainer, UserForm, UserView } from './Profile.styles';
import ProfileEditPassword from './ProfileEditPassword';
import { ErrorMessage } from './ProfilePanel.styles';
import { ApiError } from '../../lib/fetcher';
import { emailField, fullNameField } from '../../lib/forms';
import useUser from '../../lib/useUser';
import Avatar from '../Avatar';

const Profile = ({ isEditingPassword, onEditPassword }) => {
  const { user } = useUser();
  const { register, handleSubmit, errors, formState, reset } = useForm();
  const { register: registerAvatar, handleSubmit: handleSubmitAvatar } = useForm();
  const [isChanged, setIsChanged] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleAvatarUpload = async (data) => {
    const formData = new FormData();
    formData.append('image', data.image[0]);

    setServerError('');

    await fetch(`/api/my-profile/avatar`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    })
      .then((_data) => {
        mutate(`/api/my-profile`);
      })
      .catch(() => setServerError('An unexpected error occurred'));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChanged = user.email !== e.target.value && user.fullName !== e.target.value;
    setIsChanged(isChanged);
    setServerError('');
  };

  const handleCancel = () => {
    reset();
    setIsChanged(false);
    setServerError('');
  };

  const handleSaveProfile = async (data) => {
    if (!isChanged) return;

    if (data && data.email === user.email) delete data.email;

    setServerError('');

    await fetch(`/api/my-profile`, {
      method: 'PUT',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) throw new ApiError(response);
        return response.json();
      })
      .then((_data) => {
        setIsChanged(false);
        mutate(`/api/my-profile`);
      })
      .catch((error) => {
        setServerError(
          error.status === 422 ? 'The email is already in use' : 'An unexpected error occurred'
        );
      });
  };

  if (isEditingPassword) return <ProfileEditPassword />;

  return (
    <ProfileContainer>
      <UserView>
        <Avatar id={user.id} name={user.fullName} image={user.avatar} />

        <ButtonEdit title="Change avatar"></ButtonEdit>

        <form onSubmit={handleSubmitAvatar(handleAvatarUpload)}>
          <input
            type="file"
            name="image"
            accept="image/png, image/jpeg"
            ref={registerAvatar}
            onChange={handleSubmitAvatar(handleAvatarUpload)}
          />
        </form>
      </UserView>

      <UserForm onSubmit={handleSubmit(handleSaveProfile)} noValidate>
        <FormInput
          defaultValue={user.fullName}
          forwardRef={register(fullNameField)}
          name="fullName"
          type="text"
          onChange={handleChange}
        />
        <FormInput
          defaultValue={user.email}
          forwardRef={register(emailField)}
          name="email"
          type="text"
          onChange={handleChange}
        />
        {user?.role === 'Unverified email' && (
          <ErrorMessage>
            <b>Please verify your email</b>
            <br />A verification link has been sent to your email
          </ErrorMessage>
        )}

        {(errors?.fullName?.message || errors?.email?.message || serverError) && (
          <ErrorMessage>
            <b>{errors?.fullName?.message || errors?.email?.message || serverError || ''}</b>
          </ErrorMessage>
        )}

        {isChanged && <input type="submit" value="Save" disabled={formState.isSubmitting} />}
        {isChanged && (
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </UserForm>

      <button onClick={onEditPassword}>Change password</button>
    </ProfileContainer>
  );
};

export default Profile;
