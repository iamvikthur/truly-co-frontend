import styled from 'styled-components';

export const AvatarContainer = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 16px;
  line-height: 32px;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
    user-select: none;
  }
`;

const Avatar = ({ id = 0, name = '', image }) => {
  const initials = name
    .split(' ')
    .map((n, i, a) => (!i || i === a.length - 1 ? n[0] : null))
    .join('')
    .toUpperCase();

  return (
    <AvatarContainer>
      <img
        src={image || `/images/avatars/avatar-${((id % 12) + 1).toFixed(0).padStart(2, '0')}.svg`}
        alt={name}
      />
      {initials && !image && <span>{initials}</span>}
    </AvatarContainer>
  );
};

export default Avatar;
