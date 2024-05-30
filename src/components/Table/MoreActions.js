'use client';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Popover, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TableActionIcons from './TableActionIcons';
import palette from '@/theme/palette';

const MoreActions = ({ actions, data }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (item) => {
    if (item.disabled) return;
    setAnchorEl(null);
    item?.action(data);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'modal-popover' : undefined;

  return (
    <div style={{ width: '10px' }}>
      <MoreVertIcon onClick={handleClick} cursor="pointer" />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            backgroundColor: 'white',
          },
        }}
      >
        {actions?.map((item) => (
          <Box
            key={item?.label}
            onClick={() => handleActionClick(item)}
            sx={{
              ...(item?.preRender && item.preRender(data)),
              m: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              {TableActionIcons(item.icon)}
              <Typography
                sx={{
                  ml: 1.5,
                  cursor: !item?.disabled ? 'pointer' : 'not-allowed',
                  fontSize: '0.8rem',
                }}
                key={item?.label}
                cursor="pointer"
                color={item?.disabled ? palette.grey[600] : palette.grey[800]}
              >
                {item?.label}
              </Typography>
            </div>
          </Box>
        ))}
      </Popover>
    </div>
  );
};

MoreActions.defaultProps = {
  data: {},
  actions: [],
};

MoreActions.propTypes = {
  data: PropTypes.instanceOf(Object),
  actions: PropTypes.instanceOf(Object),
};

export default MoreActions;
