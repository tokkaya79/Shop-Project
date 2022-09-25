function BasketItem(props) {
    const {
        id,
        name,
        price,
        quantity,
        removeFromBasket = Function.prototype,
        incQuantity = Function.prototype,
        decQuantity = Function.prototype,
    } = props;

    return (
        <li className="collection-item">
            {name} x <i className="material-icons basket-count" onClick={() => decQuantity(id)}>remove</i>
            {quantity}
            <i className="material-icons basket-count" onClick={() => incQuantity(id)}>add</i> = {price * quantity}$
            <span
                class="secondary-content"
                onClick={() => removeFromBasket(id)}
            >
                <i class="material-icons basket-delete">close</i>
            </span>
        </li>
    );
}
export { BasketItem };
