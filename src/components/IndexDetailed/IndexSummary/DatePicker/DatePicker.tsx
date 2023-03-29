import React, { useEffect, useRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Dayjs } from 'dayjs';
import dayjs from '../../../../utils/dayjs';
import { Calendar } from '../../../common/ui/icons';
import { TimeState } from '../../../../types/ui';
import { useTheme } from '../../../../hooks/useTheme';
import { useOnClickOutside } from '../../../../hooks/useClickOutside';

import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  timeState: TimeState;
  onSelect: (startTime: Dayjs, endTime: Dayjs) => void;
};

export const DatePicker: React.FC<Props> = ({ timeState, onSelect }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(
    timeState?.custom?.startTime?.toDate() ?? new Date()
  );
  const [endDate, setEndDate] = useState<Date | null>(
    timeState?.custom?.startTime?.toDate() ?? null
  );

  const onChange = (dates: (Date | null)[]) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      onSelect(dayjs(start).startOf('day'), dayjs(end).endOf('day'));

      setIsOpen(false);
    }
  };

  useOnClickOutside(ref, () => setIsOpen(false));

  useEffect(() => {
    if (!timeState.custom) {
      setStartDate(new Date());
      setEndDate(null);
    }
  }, [timeState]);

  return (
    <div ref={ref} className="fkl-flex fkl-relative">
      <button
        style={{
          color: timeState.custom ? colors.headline : colors.text,
        }}
        className="fkl-text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Calendar />
      </button>

      {isOpen && (
        <div className="fkl-absolute fkl-z-10 fkl-right-0 fkl-top-[calc(100%+10px)]">
          <ReactDatePicker
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            onChange={onChange}
            selectsRange
            inline
          />
        </div>
      )}
    </div>
  );
};
