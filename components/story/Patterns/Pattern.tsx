import BeyonderPattern from './BeyonderPattern';
import BloomerPattern from './BloomerPattern';
import OriginalPattern from './OriginalPattern';
import OutsiderPattern from './OutsiderPattern';

/**
 * SVG pattern
 * @param {String} brand - name of brand
 * @param {String} color
 * if brand equial 'beyonder' or 'bloomer' or 'original' or 'outsider' return <svg />
 */
const Pattern = ({ brand, color }) => {
  switch (brand) {
    case 'beyonder':
      return <BeyonderPattern color={color} />;
    case 'bloomer':
      return <BloomerPattern color={color} />;
    case 'original':
    case 'originals':
      return <OriginalPattern color={color} />;
    case 'outsider':
      return <OutsiderPattern color={color} />;
    default:
      return <div />;
  }
};

export default Pattern;
