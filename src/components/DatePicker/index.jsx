import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const DatePickers = ({ label, value, onChange, ...restProps }) => {
  const dayjsValue = value ? dayjs(value) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        label={label}
        value={dayjsValue}
        onChange={(newValue) => onChange(newValue ? newValue.toDate() : null)}
        {...restProps}
      />
    </LocalizationProvider>
  );
};

DatePickers.defaultProps = {
  label: '',
  value: null,
};

DatePickers.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
};

export default DatePickers;