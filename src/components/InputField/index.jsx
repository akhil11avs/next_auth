'use client'
import { useState } from 'react';
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Box from '../Box';
import Divider from '../Divider';

const InputField = ({ name, type, label, error, size, required, helperText, InputProps, ...restProps }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleOnShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box component="div" noValidate autoComplete="off" sx={{ mb: 2 }} >
      <TextField
        type={showPassword ? 'text' : type}
        error={error}
        label={label}
        id="outlined-start-adornment"
        helperText={helperText || null}
        required={required}
        size={size}
        name={name}
        fullWidth
        InputProps={(type === 'password' ? {
          endAdornment: (
            <>
              <Divider orientation="vertical" variant="middle" flexItem />
              <div onClick={handleOnShowPassword} role="presentation" style={{ cursor: 'pointer', marginLeft: '10px' }} data-testid="password-visibility-toggle">
                {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </div>
            </>
          ),
        } : InputProps)}
        {...restProps}
      />
    </Box>
  )
};

InputField.defaultProps = {
  type: 'text',
  error: false,
  label: '',
  name: '',
  required: false,
  variant: 'outlined',
  size: 'small',
  helperText: ''
};

InputField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.bool,
  label: PropTypes.string,
  variant: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.string,
  helperText: PropTypes.string,
};

export default InputField;
