/* eslint-disable react/prop-types */
import * as React from 'react';

import MUIRadio from '@mui/material/Radio';
import MUIRadioGroup from '@mui/material/RadioGroup';
import MUIFormControlLabel from '@mui/material/FormControlLabel';

import Box from '../Box';
import Typography from '../Typography';

const RadioGroup = (props) => {
  const {
    formController = [],
    defaultValue,
    controller,
    radioGroupProps,
    label
  } = props;
  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant='body1'>
        {label}
      </Typography>
      <MUIRadioGroup
        defaultValue={defaultValue}
        name="radio-buttons-group"
        {...radioGroupProps}
      >
        {formController.map((item) => (
          <MUIFormControlLabel
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            key="formController"
            value={item?.radioValue}
            control={<MUIRadio onClick={() => controller(item?.radioValue)} />}
            label={item?.radioLabel}
          />
        ))}
      </MUIRadioGroup>
    </Box>

  );
};
export default RadioGroup;
