import React, { useCallback, useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { MenuItem, Select } from '@mui/material';
import Box from '../Box';

import './dropDown.scss';

const DropDown = ({
  name, options, onChange = () => {}, defaultValue = '', label, setValue = () => {}, placeholder, reduxValue, register, handleFieldChange = () => {}, ...restProps
}) => {
  const [value, setValues] = useState('');

  useEffect(() => {
    setValues(reduxValue === undefined ? defaultValue : reduxValue);
  }, [defaultValue, reduxValue]);

  const handleOnSelect = useCallback((event) => {
    setValues(event.target.value);
    setValue(register?.name, event.target.value);
    if (event.target.value === 'All') {
      onChange({ [name]: '' });
      return;
    }
    onChange({ [name]: event.target.value });
    handleFieldChange();
  }, [handleFieldChange, name, onChange, register?.name, setValue]);

  return (
    <Box className="drop-down-container">
      <FormControl fullWidth>
        {label && (
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          {label}
        </InputLabel>
        )}
        <Select
          placeholder="helo"
          value={value !== '' ? value : 'All'}
          onChange={options?.length >= 1 && handleOnSelect}
          {...restProps}
        >
          {options?.map(
            (item) => (
              <MenuItem key={item} value={item?.value !== '' ? item?.value : item?.label}>
                {item?.label}
              </MenuItem>
            ),
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDown;

