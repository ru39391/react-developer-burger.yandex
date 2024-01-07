import React, {
  FC,
  useState,
  useEffect,
  useCallback
} from 'react';

import useAuth from '../../hooks/useAuth';
import useFeed from '../../hooks/useFeed';
import useModal from '../../hooks/useModal';
import useSocket from '../../hooks/useSocket';

import Modal from '../../components/modal/Modal';
import ModalContent from '../../components/modal-content/ModalContent';
import Preloader from '../../components/preloader/Preloader';
import FeedList from '../../components/feed-list/FeedList';

import { useDispatch } from '../../services/hooks';
import { getAccessToken } from '../../services/actions/user';

import {
  TOKEN_URL,
  WS_FEED_URL,
  FEED_ERROR_MSG
} from '../../utils/constants';

const OrdersList: FC = () => {
  const dispatch = useDispatch();
  const [socketMess, setSocketMess] = useState<string>('');
  const { isModalVisible, setModalVisibility } = useModal();
  const {
    accessToken,
    refreshToken,
    isRefTokExist,
    isAccTokExist,
    isTokenExpired
  } = useAuth();
  const {
    isSucceed,
    isFailed,
    feedOrders,
    handleFeed,
  } = useFeed();
  const {
    socketRef,
    connect
  } = useSocket(WS_FEED_URL, {
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
      : `Произошла ошибка, соединение закрыто с кодом ${event.code}`);
    setModalVisibility(true);
  }

  const getCurrentToken = useCallback(() => {
    if(isRefTokExist) {
      const token: string | undefined = typeof refreshToken === 'object' && refreshToken !== undefined ? refreshToken.token : undefined;

      dispatch(getAccessToken({ token: token as string }, TOKEN_URL));
    } else {
      setSocketMess(FEED_ERROR_MSG);
      setModalVisibility(true);
    }
  }, [
    dispatch
  ]);

  const getUserOrders = () => {
    if(isAccTokExist) {
      const jwt: string | undefined = typeof accessToken === 'object' && accessToken !== undefined ? accessToken.token : undefined;

      isTokenExpired
        ? getCurrentToken()
        : connect(jwt);
    } else {
      setSocketMess(FEED_ERROR_MSG);
      setModalVisibility(true);
    }
  };

  useEffect(() => {
      getUserOrders();
    },
    [socketRef]
  );

  return (
    <>
      {isSucceed ? <FeedList orders={feedOrders} /> : <Preloader />}
      {(isModalVisible || isFailed) && (
        <Modal isModalOpen={isModalVisible || isFailed} closeModal={() => setModalVisibility(false)}>
          <ModalContent children={socketMess} />
        </Modal>
      )}
    </>
  )
};

export default OrdersList;
