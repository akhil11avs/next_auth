import Events from './events';

const showSnackbar = (message) => {
  Events.trigger('showSnackbar', message);
};

export {
  showSnackbar
}
