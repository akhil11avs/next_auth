/* eslint-disable react/prop-types */
import * as React from 'react';
import isArray from 'lodash/isArray';

import MuiSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: '250px',
      width: '250px',
    },
  },
};

const Select = ({
  name,
  variant,
  label,
  control,
  loading,
  onChange,
  defaultValue,
  gridProps,
  size = 'small',
  valueAccessor = 'value',
  labelAccessor = 'label',
  getOptionLabel,
  options,
  showPlaceholder = false,
  placeholder,
  inputProps,
  helperText,
  value,
  ...restProps
}) => (
  <FormControl
    variant={variant}
    size={size}
    fullWidth
    sx={{
      '& .mui-select .MuiSelect-select': {
        color: 'black',
      },
      mb: 2,
    }}
    {...restProps}
  >
    <InputLabel id="demo-select-medium-label" sx={{ fontSize: '14px', fontFamily: 'var(--font-Poppins-Medium)' }}>{label}</InputLabel>
    <MuiSelect
      name={name}
      labelId="demo-select-medium-label"
      id="demo-select-medium"
      defaultValue={defaultValue}
      label={label}
      value={value}
      onChange={onChange}
      MenuProps={MenuProps}
      displayEmpty={showPlaceholder}
      {...inputProps}
    >
      {placeholder && (
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
      )}
      {options?.map((item) => (
        <MenuItem
          key={item[valueAccessor] || item.value}
          value={item[valueAccessor] || item.label}
          sx={{
            fontSize: '14px',
            height: 'auto',
            textWrap: 'wrap',
            fontFamily: 'var(--font-Poppins-Regular)'
          }}
          size="small"
        >
          {isArray(labelAccessor) ? getOptionLabel(item) : item[labelAccessor]}
        </MenuItem>
      ))}
    </MuiSelect>
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

export default Select;
