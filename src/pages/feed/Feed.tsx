import React, { FC, useEffect } from 'react';
import Wrapper from '../../components/wrapper/Wrapper';
import Preloader from '../../components/preloader/Preloader';
import FeedList from '../../components/feed-list/FeedList';
import FeedTotal from '../../components/feed-total/FeedTotal';
import Modal from '../../components/modal/Modal';
import ModalContent from '../../components/modal-content/ModalContent';

import useModal from '../../hooks/useModal';

import { useSelector, useDispatch } from '../../services/hooks';
import { getFeedRequest, disconnect } from '../../services/slices/feed-slice';
import type { TRootState } from '../../services/store';

import styles from '../../components/wrapper/Wrapper.module.css';

import {
  ALL_ALIAS,
  WS_FEED_URL,
  FEED_TITLE,
  FEED_ERROR_MSG
} from '../../utils/constants';

const Feed: FC = () => {
  const dispatch = useDispatch();
  const {
    feedSucceed,
    feedFailed,
    totalData,
    feedOrders,
    feedOrdersDone,
    feedOrdersPending,
    errorMsg
  } = useSelector((state: TRootState) => state.feed);
  const { isModalVisible, setModalVisibility } = useModal();

  useEffect(() => {
    dispatch(getFeedRequest({ url: `${WS_FEED_URL}/${ALL_ALIAS}` }));

    return () => {
      dispatch(disconnect({}));
    }
  }, []);

  useEffect(() => {
    setModalVisibility(Boolean(errorMsg));
  }, [
    errorMsg
  ]);

  return (
    <Wrapper title={feedFailed ? FEED_ERROR_MSG : FEED_TITLE}>
      {
        feedSucceed ? (
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
      {(isModalVisible || feedFailed) && (
        <Modal isModalOpen={isModalVisible || feedFailed} closeModal={() => setModalVisibility(false)}>
          <ModalContent children={errorMsg} />
        </Modal>
      )}
    </Wrapper>
  )
};

export default Feed;
