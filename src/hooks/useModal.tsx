import { useState } from 'react';

type TModalHook = {
  isModalVisible: boolean;
  setModalVisibility: (isModalVisible: boolean) => void;
}

const useModal = (): TModalHook => {
  const [isModalVisible, setModalVisibility] = useState<boolean>(false);

  return {
    isModalVisible,
    setModalVisibility
  };
}

export default useModal;
