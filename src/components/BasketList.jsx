import { BasketItem } from './BasketItem';

function BasketList(props) {
    const {
        order = [],
        handleBasketShow = Function.prototype,
        removeFromBasket = Function.prototype,
        incQuantity,
        decQuantity,
    } = props;
    const totalPrice = order.reduce((sum, el) => {
        return sum + el.price * el.quantity;
    }, 0);
    return (
        <ul className="collection basket-list">
            <i
                class="material-icons basket-close"
                onClick={handleBasketShow}
            >
                close
            </i>
            <li className="collection-item active">Cart</li>
            {order.length ? (
                order.map((item) => (
                    <BasketItem
                        key={item.id}
                        removeFromBasket={removeFromBasket}
                        incQuantity={incQuantity}
                        decQuantity={decQuantity}
                        {...item}
                    />
                ))
            ) : (
                <li className="collection-item">Cart is empty</li>
            )}
            <li className="collection-item active">
                Total COST: {totalPrice}$
            </li>
            <li >
                <button className="secondary-content btn teal lighten-1">Checkout</button>
            </li>
        </ul>
    );
}
export { BasketList };
