import React from 'react';
import { FORKASTLABS } from 'constants/links';
import { useTheme } from 'hooks/useTheme';
import { Forkastlabs } from 'components/common/ui/icons';

export const Promo: React.FunctionComponent = () => {
  const { colors } = useTheme();

  return (
    <a href={FORKASTLABS} style={{ color: colors.text }}>
      <Forkastlabs />
    </a>
  );
};
