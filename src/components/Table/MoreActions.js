'use client';
import React, { useState } from 'react';
import { Popover } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import palette from '@/theme/palette';

import Box from '../Box';
import Divider from '../Divider';
import Typography from '../Typography';
import TableActionIcons from './TableActionIcons';

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
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,.07) !important',
              },
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                padding: 10
              }}
            >
              {TableActionIcons(item.icon)}
              <Typography
                sx={{
                  ml: 1.5,
                  cursor: !item?.disabled ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  fontFamily: 'var(--font-Poppins-SemiBold)',
                }}
                key={item?.label}
                cursor="pointer"
                color={item?.disabled ? palette.grey[600] : palette.grey[800]}
              >
                {item?.label}
              </Typography>
            </div>
            <Divider variant='fullWidth' m={0} />
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

export default MoreActions;
