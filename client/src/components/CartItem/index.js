import { existedOperationTypeMessage } from "graphql/validation/rules/UniqueOperationTypes";
import React from "react";

const CartItem = ({ item }) => {
  return (
    <div className="flex-row">
      <div>
        <img src={`/images/${item.image}`} alt=""></img>
      </div>
      <div>
        {item.name}, ${item.price}
      </div>
      <div>
        <span>Qty:</span>
        <input
          type="number"
          placeholder="1"
          value={item.purchaseQuantity}
        ></input>
        <span role="img" aria-label="trash">
          🗑️
        </span>
      </div>
    </div>
  );
};

export default CartItem;
