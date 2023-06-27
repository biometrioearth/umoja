import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Modal } from '../../../components/modals/antd-modals';
import { DELETE_PROJECT_MUTATION } from '../../../redux/mutation';

function DeleteModal({ visible, onCancel, id, onDeleteModal }) {
  const [state, setState] = useState({
    visible,
    modalType: 'primary',
    checked: [],
  });

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setState({
        visible,
      });
    }
    return () => {
      unmounted = true;
    };
  }, [visible]);
  const handleCancel = () => {
    onCancel();
  };

  const [deleteProject] = useMutation(DELETE_PROJECT_MUTATION);

  const handleDelete = async () => {
    try {
      const { data } = await deleteProject({
        variables: { id },
      });

      if (data?.deleteProject?.success) {
        // Handle successful deletion
        console.log({ data });
        onDeleteModal();
      } else {
        // Handle deletion failure
      }
    } catch (error) {
      console.log({ error });
      // Handle error during deletion
    }
  };

  return (
    <Modal
      className="update"
      type={state.modalType}
      title="Do you want to delete this project?"
      visible={state.visible}
      onCancel={handleCancel}
      footer={null}
      content="When clicked the OK button, this project  will be deleted"
      onOk={handleDelete}
    />
  );
}

DeleteModal.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  id: propTypes.string.isRequired,
  onDeleteModal: propTypes.func,
};

export default DeleteModal;
