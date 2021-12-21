import React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';
import SilicoinIcon from './images/silicoin.svg';

export default function Keys(props: SvgIconProps) {
  return <SvgIcon component={SilicoinIcon} viewBox="0 0 150 58" {...props} />;
}
