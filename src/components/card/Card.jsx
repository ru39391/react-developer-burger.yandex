import {
  memo,
  useState,
  useEffect,
  useCallback
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './Card.module.css';

import useProdData from '../../hooks/useProdData';

import { productPropTypes } from '../../utils/proptypes';
import { ID_KEY } from '../../utils/constants';
import { setItemDetails } from '../../services/slices/products-slice';

function Card({
  data,
  name,
  picture,
  thumbnail,
  price,
  nutritional
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderList } = useSelector(state => state.order);
  const [counter, setCounter] = useState(0);
  const prodData = useProdData(nutritional);

  const handleCardData = useCallback(
    () => {
      dispatch(setItemDetails({
        name,
        image: picture,
        nutritional: prodData
      }));
      navigate(`/`, { replace: true, state: { isModalOpen: true } });
      console.log(data);
    },
    [
      name,
      picture,
      nutritional,
      dispatch
    ]
  );

  const [{ isClassMod }, cardRef] = useDrag({
    type: 'card',
    item: data,
    collect: monitor => ({
      isClassMod: monitor.isDragging()
    })
  });

  useEffect(() => {
    setCounter(orderList.filter(value => value === data[ID_KEY]).length);
  }, [orderList]);

  return (
    <div className={`${styles.item} ${isClassMod && styles.item_dragged}`} ref={cardRef} onClick={handleCardData}>
      {Boolean(counter) && <Counter count={counter} size="small" />}
      <img src={thumbnail} alt={name} />
      <div className={`${styles.meta} text text_type_digits-default`}>
        {price.toString()}
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.title} text text_type_main-default`}>{name}</div>
    </div>
  );
}

Card.propTypes = {
  data: productPropTypes.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  nutritional: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
};

export default memo(Card);
