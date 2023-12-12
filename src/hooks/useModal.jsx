import { useState } from 'react';

function useModal() {
  const [isModalVisible, setModalVisibility] = useState(false);

  return {
    isModalVisible,
    setModalVisibility
  };
}

export default useModal;
