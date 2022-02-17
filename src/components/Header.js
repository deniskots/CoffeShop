import React from "react";
import {Link} from "react-router-dom";
import AppContext from "./context";

function Header(props) {
    const {cartItems} = React.useContext(AppContext);
    //подсчитываем общую сумму
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    return (
        <header className='d-flex justify-between align-center p-40' >
            <Link to='/'>
                <div className='d-flex align-center'>
                    <img width={55} height={55} src="/img/logo.png" />
                    <div>
                        <h3 className='text-uppercase'>Coffee Shop</h3>
                        <p className='opacity-5'>Магазин кофе</p>
                    </div>
                </div>
            </Link>


            <ul className='d-flex'>
                <li onClick={props.onClickCart} className='mr-30 cu-p'>
                    <img width={18} height={18} src="/img/shopping cart.svg" alt='корзина' />
                    <span>{totalPrice} $</span>
                </li>
                <li>
                    <Link to='/favorites'>
                        <img  className='mr-30' width={18} height={18} src="/img/empty-heart.svg" alt='закладки' />
                    </Link>
                </li>
                <li>
                    <Link to='/orders'>
                        <img width={18} height={18} src="/img/user.svg" alt='пользователь' />
                    </Link>

                </li>
            </ul>
        </header>
    )
}

export default Header;