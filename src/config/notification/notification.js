// notification.js

import { toast } from 'react-toastify';

const notify = (type, message) => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'warning':
      toast.warn(message);
      break;
    default:
      toast(message);
      break;
  }
};

// Attach the notify function to the window object
window.notify = notify;
