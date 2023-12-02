import { StyledTab } from './Tab.styles';

interface TabProps {
  brand?: string;
  color?: string;
  children?: React.ReactChild;
  selected: boolean;
  onClick?: () => void;
}

const Tab = ({ brand, color, children, selected, onClick }: TabProps) => {
  return (
    <StyledTab
      aria-selected={selected}
      brand={brand}
      color={color}
      role="tab"
      selected={selected}
      tabIndex={0}
      onClick={() => onClick && onClick()}
    >
      {children && <h3>{children}</h3>}
    </StyledTab>
  );
};

export default Tab;
