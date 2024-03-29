import React, { FC, useState, useEffect } from 'react';
import Wrapper from '../../components/wrapper/Wrapper';
import Preloader from '../../components/preloader/Preloader';
import FeedList from '../../components/feed-list/FeedList';
import FeedTotal from '../../components/feed-total/FeedTotal';
import Modal from '../../components/modal/Modal';
import ModalContent from '../../components/modal-content/ModalContent';

import useFeed from '../../hooks/useFeed';
import useModal from '../../hooks/useModal';
import useSocket from '../../hooks/useSocket';

import styles from '../../components/wrapper/Wrapper.module.css';

import {
  ALL_ALIAS,
  WS_FEED_URL,
  FEED_TITLE,
  FEED_ERROR_MSG
} from '../../utils/constants';

const Feed: FC = () => {
  const [socketMess, setSocketMess] = useState<string>('');
  const { isModalVisible, setModalVisibility } = useModal();
  const {
    isSucceed,
    isFailed,
    totalData,
    feedOrders,
    feedOrdersDone,
    feedOrdersPending,
    handleFeed,
  } = useFeed();
  const {
    socketRef,
    connect
  } = useSocket(`${WS_FEED_URL}/${ALL_ALIAS}`, {
    onMessage: (event: MessageEvent) => handleFeed(JSON.parse(event.data)),
    onConnect: () => open(),
    onError: () => close(),
    onDisconnect: (event: CloseEvent) => disconnect(event)
  });

  const open = () => {
    setSocketMess('');
    setModalVisibility(false);
  }

  const close = () => {
    setSocketMess(FEED_ERROR_MSG);
    setModalVisibility(true);
  }

  const disconnect = (event: CloseEvent) => {
    setSocketMess(event.wasClean
      ? `Соединение успешно закрыто (код ${event.code}), причина: ${event.reason}`
      : `Соединение закрыто с кодом ${event.code}`);
    setModalVisibility(true);
  }

  useEffect(() => {
      connect('');
    },
    [socketRef]
  );

  return (
    <Wrapper title={isFailed ? FEED_ERROR_MSG : FEED_TITLE}>
      {
        isSucceed ? (
          <div className={`${styles.container} ${styles.gcg_lg}`}>
            <FeedList orders={feedOrders} />
            <FeedTotal
              total={totalData.total}
              totalToday={totalData.totalToday}
              ordersDone={feedOrdersDone}
              ordersPending={feedOrdersPending}
            />
          </div>
        ) : (
          <Preloader />
        )
      }
      {(isModalVisible || isFailed) && (
        <Modal isModalOpen={isModalVisible || isFailed} closeModal={() => setModalVisibility(false)}>
          <ModalContent children={socketMess} />
        </Modal>
      )}
    </Wrapper>
  )
};

export default Feed;
