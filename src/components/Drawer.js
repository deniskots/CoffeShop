import React from "react";
import Info from "./Info";
import AppContext from "./context";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//если в айтемс ничего не передаеться тогда он будет хранить пустуой массив в корзине,так как мы не передаем айтамс в апп.джс
function Drawer({onClose, items = [], onRemove}) {
    const {cartItems, setCartItems} = React.useContext(AppContext);
    const[isCompleted, setIsCompleted] = React.useState(false);
    const[orderId, setOrderId] = React.useState(null);


    const onClickOrder = async () => {
            const {data} = await axios.post('https://6205902d161670001741bc4c.mockapi.io/orders', {items: cartItems});
            setOrderId(data.id);
            setIsCompleted(true);
            setCartItems([]);
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://6205902d161670001741bc4c.mockapi.io/cart/' + item.id);
                await delay(1000)
            }
        ;
    };

    //подсчитываем общую сумму в корзине
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);


    return (
        <div className='overlay'>
            <div className="drawer d-flex flex-column">
                <h2 className='mb-20 d-flex justify-between align-center'>Корзина
                    <img onClick={onClose} className='removeBtn cu-p'
                         width={18} height={18}
                         src="/img/remove.svg"
                         alt="remove"/></h2>
                {/*если в корзине есть чтото то мфы редерим наш список иначе пустая карзина и если хотим вернуть два элемента- нужно обернуть в родительский див*/}
                {
                    items.length > 0 ? (
                            <div className='d-flex flex-column flex'>
                                <div className="items flex">
                                    {items.map((obj) => (
                                        <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                            <div
                                                style={{backgroundImage: `url(${obj.imageUrl})`}}
                                                className="cartItemImg">
                                            </div>
                                            <div className='mr-20 flex'>
                                                <p className='mb-5 ml-5'>{obj.title}</p>
                                                <b className='ml-5'>{obj.price} $</b>
                                            </div>
                                            <img onClick={() => onRemove(obj.id)} className='removeBtn' width={18}
                                                 height={18}
                                                 src="/img/remove.svg" alt="remove"/>
                                        </div>
                                    ))}
                                </div>
                                <div className='cartTotalBlock'>
                                    <ul>
                                        <li>
                                            <span> Итого:</span>
                                            <b>{totalPrice} $</b>
                                        </li>
                                    </ul>
                                    <button onClick={onClickOrder}>
                                        Оформить закаказ
                                    </button>
                                </div>
                            </div>
                        )
                        : (
                            <Info title={isCompleted ? 'Вы оформили заказ' : 'Корзина пуста'}
                                  image={isCompleted ? '/img/completed.jpg' :'/img/empty-cart.png'}
                                  description={isCompleted ? `Вы оформили заказ #${orderId}` : 'Добавьте хотя бы одно кофе...'}/>
                        )
                }
            </div>
        </div>
    )
}


export default Drawer;