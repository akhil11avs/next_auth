export const phoneNumberPattern = /^\d{10}$/;
export const emailValidatorPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
