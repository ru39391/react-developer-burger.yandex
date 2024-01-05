import React, { FC } from 'react';
import Wrapper from '../../components/wrapper/Wrapper';
import FeedList from '../../components/feed-list/FeedList';
import FeedTotal from '../../components/feed-total/FeedTotal';

import styles from '../../components/wrapper/Wrapper.module.css';

import { FEED_TITLE } from '../../utils/constants';

const Feed: FC = () => {
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
