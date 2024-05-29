'use client'
import { alpha } from '@mui/material/styles';

import palette from '../palette';


export default function Input(theme) {
  return {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          fontFamily: 'var(--font-Poppins-Medium)',
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            '& svg': { color: theme.palette.text.disabled },
          },
        },
        input: {
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled,
          },
          color: theme.palette.text.secondary,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: alpha(theme.palette.grey[500], 0.56),
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[500], 0.12),
          '&:hover': {
            backgroundColor: alpha(theme.palette.grey[500], 0.16),
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.action.focus,
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
        underline: {
          '&:before': {
            borderBottomColor: alpha(theme.palette.grey[500], 0.56),
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(theme.palette.grey[500], 0.32),
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
          color: palette.grey[200],
          fontFamily: 'var(--font-Poppins-Medium)',
          fontSize: '16px',
          fontStyle: 'normal',
          lineHeight: 'normal',
        },
        sizeSmall: {
          color: palette.grey[800],
          fontSize: '16px',
          fontStyle: 'normal',
          fontFamily: 'var(--font-Poppins-Medium)',
          lineHeight: 'normal',
        },
      },
    },
  };
}
