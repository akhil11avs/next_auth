import { startCase } from 'lodash';
import Events from './events';
import moment from 'moment';

const showSnackbar = (message) => {
  Events.trigger('showSnackbar', message);
};

const dateFormatter = (date, format = 'll') => moment(date).format(format);

const getStartCase = (str) => startCase(str);

// const generateUniqueId = () => {
//   const id = new ShortUniqueId({ length: 16 });
//   return id();
// };

export {
  showSnackbar,
  dateFormatter,
  getStartCase,

}
