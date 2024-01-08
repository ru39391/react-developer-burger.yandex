import { useState } from 'react';

interface IModalHook {
  isModalVisible: boolean;
  setModalVisibility: (isModalVisible: boolean) => void;
}

const useModal = (): IModalHook => {
  const [isModalVisible, setModalVisibility] = useState<boolean>(false);

  return {
    isModalVisible,
    setModalVisibility
  };
}

export default useModal;
