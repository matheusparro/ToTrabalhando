import React, { ReactNode } from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../global/styles/theme';

type Props = {
  children: ReactNode;
}

export function Background({ children }: Props) {

  return (
    <LinearGradient
      style={{flex:1}}
      colors={[theme.color.background,theme.color.background]}
    >
      {children}
    </LinearGradient>
  )
}