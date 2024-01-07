import React, { FC } from 'react';
import Wrapper from '../../components/wrapper/Wrapper';
import Modal from '../../components/modal/Modal';
import ModalContent from '../../components/modal-content/ModalContent';
import OrderDetails from '../../components/order-details/OrderDetails';

import { FEED_ERROR_MSG } from '../../utils/constants';

import useModal from '../../hooks/useModal';

const OrderItem: FC = () => {
  const { isModalVisible, setModalVisibility } = useModal();

  return (
    <Wrapper>
      <OrderDetails onFailed={setModalVisibility} />
      {isModalVisible && (
        <Modal isModalOpen={isModalVisible} closeModal={() => setModalVisibility(false)}>
          <ModalContent children={FEED_ERROR_MSG} />
        </Modal>
      )}
    </Wrapper>
  )
};

export default OrderItem;
