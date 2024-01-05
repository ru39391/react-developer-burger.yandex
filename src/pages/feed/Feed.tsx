import React, { FC, useEffect } from 'react';
import Wrapper from '../../components/wrapper/Wrapper';
import FeedList from '../../components/feed-list/FeedList';
import FeedTotal from '../../components/feed-total/FeedTotal';

import useSocket from '../../hooks/useSocket';

import styles from '../../components/wrapper/Wrapper.module.css';

import { FEED_TITLE } from '../../utils/constants';

const Feed: FC = () => {
  const { socketRef, connect } = useSocket('wss://norma.nomoreparties.space/orders/all', {
    onMessage: (event: MessageEvent) => {
      const { data } = event;
      console.log(JSON.parse(data));
    },
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
        <FeedList />
        <FeedTotal />
      </div>
    </Wrapper>
  )
};

export default Feed;
