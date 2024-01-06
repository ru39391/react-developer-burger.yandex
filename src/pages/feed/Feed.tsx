import React, { FC, useEffect } from 'react';
import Wrapper from '../../components/wrapper/Wrapper';
import FeedList from '../../components/feed-list/FeedList';
import FeedTotal from '../../components/feed-total/FeedTotal';

import useFeed from '../../hooks/useFeed';
import useSocket from '../../hooks/useSocket';

import styles from '../../components/wrapper/Wrapper.module.css';

import { WS_FEED_URL, FEED_TITLE } from '../../utils/constants';

const Feed: FC = () => {
  const {
    totalData,
    feedOrders,
    handleFeed
  } = useFeed();
  const { socketRef, connect } = useSocket(WS_FEED_URL, {
    onMessage: (event: MessageEvent) => handleFeed(JSON.parse(event.data)),
    onConnect: () => {
      console.log('Соединение установлено');
    }
  });

  useEffect(() => {
      connect();
    },
    [socketRef]
  );

  return (
    <Wrapper title={FEED_TITLE}>
      <div className={`${styles.container} ${styles.gcg_lg}`}>
        <FeedList orders={feedOrders} />
        <FeedTotal total={totalData.total} totalToday={totalData.totalToday} />
      </div>
    </Wrapper>
  )
};

export default Feed;
