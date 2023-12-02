import React from 'react';
import styled from 'styled-components';
import { AvatarContainer } from '../Avatar';

/** Button Edit */
export const ButtonEdit = styled(({ ...rest }) => (
  <div {...rest}>
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 9.8L9.8 0L14 4.2L4.2 14H0V9.8Z" fill="white" />
    </svg>
  </div>
))`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #000;
  cursor: pointer;
`;

/** User View */
export const UserView = styled((props) => <label {...props} />)`
  position: relative;
  display: flex;
  align-items: center;
  width: 100px;
  height: 100px;
  cursor: pointer;

  & > form {
    display: none;
  }

  ${AvatarContainer} {
    flex: 0 0 auto;
    width: 100px;
    height: 100px;
    padding: 2px;
    border: 2px solid #000;
    line-height: 100px;
    font-size: 58px;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 27px;

  @media (min-width: 768px) {
    padding-top: 0;
  }
`;

export const UserForm = styled.form`
  margin-top: 27px;

  input:not([type='submit']) {
    font-weight: 300;
    font-size: 34px;
    line-height: 46px;
  }

  & + button {
    display: inline-block;
    margin-top: auto;
    margin-bottom: 29px;
    font-style: normal;
    font-weight: 300;
    font-size: 34px;
    line-height: 46px;
    color: #000;
    text-align: left;
    text-decoration: none;
    cursor: pointer;

    @media (min-width: 768px) {
      margin-bottom: 51px;
    }
  }
`;
