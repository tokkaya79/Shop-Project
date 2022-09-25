function GoodsItem(props) {
    const {
        id,
        name,
        price,
        description,
        images,
        addToBasket = Function.prototype,
    } = props;

    return (
        <div
            className="card"
        >
            <div className="card-image">
                <img
                    src={images.icon}
                    alt={name}
                />
                <span
                    className="card-title"
                    style={{ fontSize: '32px' }}
                >
                    {name}
                </span>
            </div>
            <div className="card-content">
                <p className="text">{description}</p>
            </div>
            <div className="card-action">
                <button
                    className="btn"
                    onClick={() =>
                        addToBasket({
                            id,
                            name,
                            price,
                        })
                    }
                >
                    Buy
                </button>
                {/* className="right" - прижимает цену к правой стороне */}
                <span className="right price">{price}$</span>
            </div>
        </div>
    );
}

export { GoodsItem };
