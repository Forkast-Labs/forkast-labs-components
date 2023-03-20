import React from 'react';
import dayjs from '../../../utils/dayjs';

type Props = {
  timestamp: number;
  format?: string;
};

export const UserTime: React.FunctionComponent<Props> = ({
  timestamp,
  format = 'MMMM D[,] YYYY [at] hh:mma',
}) => {
  return (
    <>
      {dayjs(timestamp).format(format)} {dayjs().offsetName()}
    </>
  );
};

export default UserTime;
