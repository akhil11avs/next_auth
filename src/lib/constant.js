export const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
export const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,}$/;
export const nameRegex = /^[^0-9]*$/;
export const phoneNumberRegex = /^(\+91|\+91\-|0)?[6789]\d{9}$/;

export const HEADER = {
  H_MOBILE: 64,
  H_DESKTOP: 80,
  H_DESKTOP_OFFSET: 80 - 16,
};

export const NAV = {
  WIDTH: 280,
};