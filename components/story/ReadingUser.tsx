import { useEffect } from 'react';
import { useSpring } from 'react-spring';
import { Avatar } from './ReadingUser.styles';

export interface ReadingUsersProps {
  id?: number;
  name?: string;
  src?: string;
  w: number;
  h: number;
}

const random = (d: number) => Math.random() * d * 2 - d / 2;

const ReadingUser = ({ name, id = 0, src, w, h }: ReadingUsersProps) => {
  const W = w;
  const H = h;

  const [{ x, y }, animate] = useSpring(() => ({
    from: { x: random(W), y: Math.max(0, Math.min(random(H), H)), opacity: 0 },
    x: Math.min(random(W), W + 40),
    y: Math.max(0, Math.min(random(H), H)),
    opacity: 0.7,
    config: { mass: 700, tension: 180, friction: 6000 },
  }));

  useEffect(() => {
    if (!H || !W) return;

    const intervalX = setInterval(() => animate({ x: random(W) }), 5555);
    const intervalY = setInterval(() => animate({ y: random(H) }), 8888);

    return () => {
      clearInterval(intervalX);
      clearInterval(intervalY);
    };
  }, [animate, H, W]);

  const initials = name
    ? name
        .split(' ')
        .map((n, i, a) => (!i || i === a.length - 1 ? n[0] : null))
        .join('')
        .toUpperCase()
    : '';

  return (
    <Avatar style={{ x, y }}>
      <img
        src={src || `/images/avatars/avatar-${((id % 12) + 1).toFixed(0).padStart(2, '0')}.svg`}
        alt={name}
      />
      {initials && !src && <span>{initials}</span>}
    </Avatar>
  );
};

export default ReadingUser;
