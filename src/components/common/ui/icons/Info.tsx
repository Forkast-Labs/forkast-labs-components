import React from 'react';
import { useTheme } from '../../../../hooks/useTheme';

export const Info = (props: React.SVGProps<SVGSVGElement>) => {
  const { colors } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={13}
      viewBox="0 0 12 13"
      fill="none"
      {...props}
    >
      <path
        d="M12 6.5C12 9.81371 9.31371 12.5 6 12.5C2.68629 12.5 0 9.81371 0 6.5C0 3.18629 2.68629 0.5 6 0.5C9.31371 0.5 12 3.18629 12 6.5Z"
        fill={colors.text}
      />
      <path
        d="M6 7.32751V8.98269"
        stroke={colors?.background ?? '#1B1B1B'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.4145 4.01706C6.4145 4.2456 6.22924 4.43086 6.00071 4.43086C5.77218 4.43086 5.58691 4.2456 5.58691 4.01706C5.58691 3.78853 5.77218 3.60327 6.00071 3.60327C6.22924 3.60327 6.4145 3.78853 6.4145 4.01706Z"
        fill="white"
        stroke={colors?.background ?? '#1B1B1B'}
      />
    </svg>
  );
};
