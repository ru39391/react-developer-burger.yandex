import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '../card/Card';
import Modal from '../modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';

function ConstructorSection({ arr }) {
  const [cardDetails, setCardDetails] = useState({});
  const [isCardDetailsVisible, setCardDetailsVisibility] = useState(false);

  function showCardDetails(data) {
    setCardDetails(data);
    setCardDetailsVisibility(true);
  }

  function closeModal() {
    setCardDetailsVisibility(false);
  }

  return (
    <>
      <div className="burger-ingredients__list">
        {arr.map(({
          _id,
          name,
          price,
          image,
          image_large,
          calories,
          proteins,
          fat,
          carbohydrates
        }) => (
          <Card
            key={_id}
            name={name}
            price={price.toString()}
            thumbnail={image}
            image={image_large}
            nutritional={[
              calories,
              proteins,
              fat,
              carbohydrates
            ]}
            showCardDetails={showCardDetails}
          />
        ))}
      </div>
      {isCardDetailsVisible && <Modal isModalOpen={isCardDetailsVisible} closeModal={closeModal}><IngredientDetails {...cardDetails} /></Modal>}
    </>
  );
}

ConstructorSection.propTypes = {
  arr: PropTypes.array.isRequired
};

export default ConstructorSection;
