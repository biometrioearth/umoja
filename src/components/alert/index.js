import React, { useState, useEffect } from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

function CustomAlert({ type, message, onClose }) {
  const [duration] = useState(3000);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(onClose, duration);
      setVisible(false);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [duration, onClose]);
  return (
    <div className="py-4" style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
      <Alert
        type={type}
        message={message}
        closable
        onClose={onClose}
        style={{ transition: 'opacity 3s ease-in-out', opacity: visible ? 1 : 0 }}
      />
    </div>
  );
}

CustomAlert.propTypes = {
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error']).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CustomAlert;
