import { useState, useEffect } from 'react';
import { API_KEY, API_URL } from '../config';

import { Preloader } from './Preloader';
import { GoodsList } from './GoodsList';
import { Cart } from './Cart';
import { BasketList } from './BasketList';
import { Alert } from './Alert';

function Shop() {
    const [goods, setGoods] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');

    const addToBasket = (item) => {
        // сравниваем полученный id заказа с id товарами в массиве order, и если id найдется, то мы получим только индекс этого массива, если не найдем, то мы получим в ответе -1 (так работает findIndex)
        const itemIndex = order.findIndex(
            (orderItem) => orderItem.id === item.id
        );
        if (itemIndex < 0) {
            const newItem = {
                ...item, //передаем все что содержит обьект item (id, name, price и т.д.)
                quantity: 1,
            };
            setOrder([...order, newItem]); // возвращает список который уже там есть и добавляет новый обьект
        } else {
            const newOrder = order.map((orderItem, index) => {
                //мы обходим весь массив и для каждого элемента мы получаем orderItem и его index
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    };
                } else {
                    return orderItem;
                }
            });
            setOrder(newOrder);
        }
        setAlertName(item.name)
    };
    const removeFromBasket = (itemId) => {
        const newOrder = order.filter((el) => el.id !== itemId);
        setOrder(newOrder);
    };
    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    };
    const closeAlert = () => {
        setAlertName('');
    };
    const incQuantity = (itemId) => {
        const newOrder = order.map((el) => {
            if (el.id === itemId) {
                const newQuantity = el.quantity + 1;
                return {
                    ...el,
                    quantity: newQuantity,
                };
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    };
    const decQuantity = (itemId) => {
        const newOrder = order.map((el) => {
            if (el.id === itemId) {
                const newQuantity = el.quantity - 1;
                return {
                    ...el,
                    quantity: newQuantity >= 0 ? newQuantity : 0,
                };
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    };

    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                data.items && setGoods(data.items); //проверяем пришел список или нет
                setLoading(false);
            });
    }, []);

    return (
        <main className="container content">
             {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
            <Cart
                quantity={order.length}
                handleBasketShow={handleBasketShow}
            />
            {loading ? (
                <Preloader />
            ) : (
                <GoodsList
                    goods={goods}
                    addToBasket={addToBasket}
                />
            )}
            {isBasketShow && (
                <BasketList
                    order={order}
                    handleBasketShow={handleBasketShow}
                    removeFromBasket={removeFromBasket}
                    incQuantity={incQuantity}
                    decQuantity={decQuantity}
                />
            )}
           
        </main>
    );
}

export { Shop };
