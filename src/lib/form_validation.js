export const phoneNumberPattern = /^\d{10}$/;
export const emailValidatorPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
export const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,}$/;
export const nameRegex = /^[^0-9]*$/;
export const phoneNumberRegex = /^(\+91|\+91\-|0)?[6789]\d{9}$/;

export const errorValidate = (key, value) => {
  if (key === 'mobile' && value && !phoneNumberPattern.test(value)) {
    return getBookAppointmentError.validMobileNumber;
  }
  return '';
};

export const bookAppointmentFormField = [
  'name',
  'mobile',
  'gender',
  'city',
  'address',
  'painSite',
  'otherPainSite',
  'painIntensity',
  'appointmentDate',
  'appointmentSlot',
];

export const getBookAppointmentError = {
  name: 'Please enter name',
  mobile: 'Please enter mobile number',
  gender: 'Please enter gender',
  city: 'Please enter city',
  address: 'Please enter address',
  validMobileNumber: 'Please enter valid mobile number',
  painSite: 'Please enter Pain Site',
  otherPainSite: 'Please enter other pain site',
  painIntensity: 'Please enter Pain intensity',
  appointmentDate: 'Please enter Appointment Date',
  appointmentSlot: 'Please enter appointment Slot',
};
