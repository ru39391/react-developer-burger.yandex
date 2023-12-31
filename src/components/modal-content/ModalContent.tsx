import React, { FC, ReactNode } from 'react';

interface IModalContentProps {
  children: ReactNode;
};

const ModalContent: FC<IModalContentProps> = ({ children }) => {
  return (
    <div className="pt-20 pb-20" style={{ textAlign: 'center' }}><p className="text text_type_main-medium">{children}</p></div>
  );
}

export default ModalContent;
