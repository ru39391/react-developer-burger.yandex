import React, {
  FC,
  useEffect,
  useCallback
} from 'react';

import useAuth from '../../hooks/useAuth';
import useModal from '../../hooks/useModal';

import Modal from '../../components/modal/Modal';
import ModalContent from '../../components/modal-content/ModalContent';
import Preloader from '../../components/preloader/Preloader';
import FeedList from '../../components/feed-list/FeedList';

import { useSelector, useDispatch } from '../../services/hooks';
import { getAccessToken } from '../../services/actions/user';
import { getFeedRequest, disconnect } from '../../services/slices/feed-slice';

import {
  WS_FEED_URL,
  TOKEN_URL,
  TOKEN_ERROR_MSG
} from '../../utils/constants';

const OrdersList: FC = () => {
  const dispatch = useDispatch();
  const {
    feedSucceed,
    feedFailed,
    feedOrders,
    errorMsg
  } = useSelector(state => state.feed);
  const {
    accessToken,
    refreshToken,
    isAccTokExist,
    isRefTokExist,
    isTokenExpired
  } = useAuth();
  const { isModalVisible, setModalVisibility } = useModal();

  const getCurrentToken = useCallback(() => {
    if(isRefTokExist && refreshToken) {
      dispatch(getAccessToken({ token: refreshToken }, TOKEN_URL));
    } else {
      setModalVisibility(true);
    }
  }, [
    dispatch
  ]);

  const getUserOrders = () => {
    if(isAccTokExist && accessToken) {
      isTokenExpired
        ? getCurrentToken()
        : dispatch(getFeedRequest({ url: `${WS_FEED_URL}?token=${accessToken}` }));
    } else {
      setModalVisibility(true);
    }
  };

  useEffect(() => {
    getUserOrders();

    return () => {
      dispatch(disconnect({}));
    }
  }, [
    dispatch
  ]);

  useEffect(() => {
    setModalVisibility(Boolean(errorMsg));
  }, [
    errorMsg
  ]);

  return (
    <>
      {feedSucceed ? <FeedList orders={feedOrders} /> : <Preloader />}
      {(isModalVisible || feedFailed) && (
        <Modal isModalOpen={isModalVisible || feedFailed} closeModal={() => setModalVisibility(false)}>
          <ModalContent children={errorMsg || TOKEN_ERROR_MSG} />
        </Modal>
      )}
    </>
  )
};

export default OrdersList;
