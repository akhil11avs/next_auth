import isEqual from "lodash/isEqual";
import toPairs from "lodash/toPairs";
import fromPairs from "lodash/fromPairs";
import differenceWith from "lodash/differenceWith";

export const phoneNumberPattern = /^\d{10}$/;
export const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
export const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,}$/;
export const nameRegex = /^[^0-9]*$/;
export const experienceRegex = /^[0-9]\d{0,1}$/;
export const phoneNumberRegex = /^(\+91|\+91\-|0)?[6789]\d{9}$/;

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

export const getFormError = {
  name: {
    empty: 'Please enter a name',
    valid: 'Please enter a valid name',
  },
  email: {
    empty: 'Please enter a email',
    valid: 'Please enter a valid email',
  },
  mobile: {
    empty: 'Please enter mobile number',
    valid: 'Please enter a valid mobile number',
  },
  address: {
    empty: 'Please enter address',
    valid: 'Please enter a minimum 10 words',
  },
  comment: {
    empty: 'Please enter a comments',
  },
  gender: {
    empty: "Please enter a gender"
  },
  degree: {
    empty: "Please enter a degree"
  },
  specialization: {
    empty: "Please enter a specialization"
  },
  experience: {
    empty: "Please enter a experience",
    valid: 'Please enter a valid experience',
  }
}

export const diffObject = (a, b) => fromPairs(differenceWith(toPairs(b), toPairs(a), isEqual))