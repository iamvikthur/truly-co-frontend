import React from 'react';
import styled from 'styled-components';
import { ui } from '../../lib/utils';

const maker = (color: string) => `
  background-image: linear-gradient(to bottom, ${color} 2px, transparent 2px, transparent 4px, ${color} 4px, ${color});
  background-size: 4px 6px;
  background-position: 0 1px;
`;

const timeliner = (color: string) => `
  background-image: linear-gradient(to right, ${color} 0px, ${color} 2px, transparent 1px);
  background-size: 3px 4px;
  background-position: 0 2px;
`;

/**
 * Chapter Indicators container
 */
// eslint-disable-next-line
export const Indicators = styled(({ extendedWidth, indicatorMask, ...rest }) => <div {...rest} />)`
  position: absolute;
  top: 0;
  right: ${() => ui.scrollbarWidth}px;
  left: 0;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  z-index: 2;

  @media (min-width: 768px) {
    ${(props) => props.extendedWidth && `width: calc(((100% - 9 * 4px) / 10) * 12 + (4px * 11))`};
    ${(props) => props.extendedWidth && `left: calc(-1 * (((100% - 9 * 4px) / 10) + 4px))`};
    ${(props) => props.indicatorMask && `mask-image: ${props.indicatorMask}`};
  }

  & > div > div > div {
    @media (min-width: 768px) {
      left: ${(props) => (props.extendedWidth ? `calc((100% + 4px) / 12)` : 0)};
    }
  }
`;

// eslint-disable-next-line
export const PatternWrapper = styled(({ brand, color, maskImage, polygon, ...rest }) => (
  <div {...rest} />
))`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 300ms ease;
  clip-path: polygon(${(props) => props.polygon});
  mask-image: ${(props) => props.maskImage};

  & > div {
    position: relative;
    height: 100%;
    transition: transform 300ms ease;
    overflow-x: hidden;
    transform: translateX(10px);

    @media (min-width: 768px) {
      transform: translateX(0);
    }
  }

  & > div svg,
  & > div div {
    position: absolute;
    top: 1px;
    left: 0;
    min-width: 540px;
    height: 8px;
    transform-origin: center left;

    @media (min-width: 768px) {
      top: 0;
    }
  }

  & > div div {
    width: 100%;
  }

  & > div > div {
    background-repeat: repeat-x;
    ${(props) => {
      switch (props.brand) {
        case 'maker':
          return maker(props.color);
        case 'timeliner':
          return timeliner(props.color);
        default:
          return null;
      }
    }}
  }
`;

export const PatternContainer = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 10px;

  @media (min-width: 768px) {
    height: 8px;
  }
`;
