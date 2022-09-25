import { GoodsItem } from './GoodsItem';

function GoodsList(props) {
    const { goods = [], addToBasket = Function.prototype } = props;

    if (!goods.length) {
        return <h3>Nothing here</h3>; // надпись в результате ошибки, если ничего не найдем
    }
    return (
        <div className="goods">
            {goods.slice(0, 12).map((item) => (
                <GoodsItem
                    key={item.id}
                    {...item}
                    addToBasket={addToBasket}
                />
            ))}
        </div>
    );
}

export { GoodsList };
