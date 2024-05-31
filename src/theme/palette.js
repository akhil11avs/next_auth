'use client'
import { alpha } from '@mui/material/styles';

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#9D9D9D',
  700: '#454F5B',
  800: '#303030',
  900: '#161C24',
  1000: '#84818A',
};

const PRIMARY = {
  lighter: '#D3E5F5',
  light: '#D3E5F5',
  main: '#3d2e6e',
  dark: '#001F24',
  darker: '#001E2F',
  contrastText: '#fff',
  drawerBg: '#006492',
};

const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#0C1D29',
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#fff',
};

const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#006492',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff',
  paleRed: '#FFCACA',
  dimGray: '#636363',
};

const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[800],
};

const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#fff',
};

const palette = {
  common: { black: '#000', white: '#fff', icon: '#3d2e6e' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: PRIMARY.darker,
    secondary: GREY[700],
    disabled: GREY[500],
  },
  background: {
    paper: '#fff',
    default: GREY[100],
    neutral: GREY[200],
    offWhite: '#F5FAFF',
    accentBlue: '#EAF0F7',
    lightRed: '#FF7A7A',
    appleGreen: '#34B239',
    pizazz: '#FF9500',
    pomegranate: '#EF3030',
    mediumPurple: '#9F47E3',
    drawerBgColor: PRIMARY.drawerBg,
    notificationIcon: '#dbddde',
    notificationBellIcon: PRIMARY.drawerBg,
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
  pageHeader: {
    titleColor: '#18395E',
  },
  appointmentStatus: {
    Missed: '#ff0000',
    Confirmed: '#34B239',
    'Pending Confirmation': '#ffc0cb',
    Cancelled: '#0000ff',
    'Check In': '#FF9500',
    Completed: '#808080',
    'Ready For Practitioner': '#808000',
    'Waiting Room': '#800080'
  },
  bmiCategory: {
    Underweight: '#FF9500',
    Normal: '#34B239',
    Overweight: '#ff0000',
    Obesity: '#8c0404',
  },
};

export default palette;