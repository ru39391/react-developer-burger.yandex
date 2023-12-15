import React, {
  FC,
  useRef,
  RefObject,
  memo
} from 'react';
import {
  useDrag,
  useDrop,
  DropTargetMonitor,
  DragSourceMonitor
} from 'react-dnd';

import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './Ingredient.module.css';

import {
  ID_KEY,
  TOP_KEY,
  BOTTOM_KEY,
  TOP_PRODUCT_CAPTION,
  BOTTOM_PRODUCT_CAPTION,
} from '../../utils/constants';

import type { TProduct } from '../../types';

interface IIngredient {
  type?: string;
  text: string;
  price: number;
  thumbnail: string;
  ingredient: TProduct;
  handleDrop: Function;
  removeIngredient: Function;
}

const Ingredient: FC<IIngredient> = ({
  type,
  text,
  price,
  thumbnail,
  ingredient,
  handleDrop,
  removeIngredient
}) => {
  const bunTypeKeys: (string | undefined)[] = [TOP_KEY, BOTTOM_KEY];

  function handleClose(): void {
    removeIngredient(ingredient);
  }

  const [{ isClassMod }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor: DragSourceMonitor) => ({
      isClassMod: monitor.isDragging()
    })
  });

  const [{ isHover }, dropRef] = useDrop({
    accept: 'ingredient',
    collect: (monitor: DropTargetMonitor) => ({
      isHover: monitor.isOver()
    }),
    drop(item: TProduct) {
      if(item[ID_KEY] === ingredient[ID_KEY]) {
        return;
      } else {
        handleDrop({ draggedItem: item, targetItem: ingredient });
      }
    },
  });

  const ref = useRef<HTMLDivElement>(null);
  const ingredientRef: RefObject<HTMLDivElement> | null = !bunTypeKeys.includes(type) && type ? dragRef(dropRef(ref)) : null;

  return (
    <div className={styles.item} ref={ingredientRef}>
      {!bunTypeKeys.includes(type) && type && <DragIcon type="primary" />}
      <ConstructorElement
        type={type}
        isLocked={Boolean(bunTypeKeys.includes(type) && type)}
        text={bunTypeKeys.includes(type) && type ? `${text} (${[TOP_PRODUCT_CAPTION, BOTTOM_PRODUCT_CAPTION][bunTypeKeys.indexOf(type)]})` : text}
        price={price}
        thumbnail={thumbnail}
        handleClose={handleClose}
        extraClass={`${isClassMod && styles.active} ${isHover && styles.hover}`}
      />
    </div>
  );
}

export default memo(Ingredient);
