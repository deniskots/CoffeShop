import React from "react";

function Header() {
    return (
        <header className='d-flex justify-between align-center p-40' >
            <div className='d-flex align-center'>
                <img width={55} height={55} src="/img/logo.png" />
                <div>
                    <h3 className='text-uppercase'>Coffee Shop</h3>
                    <p className='opacity-5'>Магазин кофе</p>
                </div>
            </div>

            <ul className='d-flex'>
                <li className='mr-30'>
                    <img width={18} height={18} src="/img/shopping cart.svg" />
                    <span>200$</span>
                </li>
                <li>
                    <img width={18} height={18} src="/img/user.svg" />
                </li>
            </ul>
        </header>
    )
}

export default Header;