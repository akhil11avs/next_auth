import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';

import Box from '../Box';

const InputField = ({ name, type, label, error, size, required, helperText, ...restProps }) => (
  <Box component="div" noValidate autoComplete="off" sx={{ mb: 2 }} >
    <TextField
      type={type}
      error={error}
      label={label}
      id="outlined-start-adornment"
      helperText={helperText || null}
      required={required}
      size={size}
      name={name}
      fullWidth
      {...restProps}
    />
  </Box>
);

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
