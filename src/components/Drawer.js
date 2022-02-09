import React from "react";

function Drawer() {
    return (
        <div style={{display: 'none'}} className='overlay'>
            <div className="drawer d-flex flex-column">
                <h2 className='mb-20 d-flex justify-between align-center '>Корзина
                    <img className='removeBtn cu-p'
                         width={18} height={18}
                         src="/img/remove.svg"
                         alt="remove"/></h2>

                <div className="items flex">
                    <div className="cartItem d-flex align-center mb-20">
                        <img width={70} height={70} src="/img/coffee/1.jpg" alt="coffee"/>
                        <div className='mr-20'>
                            <p className='mb-5 ml-5'>Кофе Колумбия Medelin Supremo</p>
                            <b className='ml-5'>33.3 $</b>
                        </div>
                        <img className='removeBtn' width={18} height={18} src="/img/remove.svg" alt="remove"/>
                    </div>
                    <div className="cartItem d-flex align-center mb-20">
                        <img width={70} height={70} src="/img/coffee/1.jpg" alt="coffee"/>
                        <div className='mr-20'>
                            <p className='mb-5 ml-5'>Кофе Колумбия Medelin Supremo</p>
                            <b className='ml-5'>33.3 $</b>
                        </div>
                        <img className='removeBtn' width={18} height={18} src="/img/remove.svg" alt="remove"/>
                    </div>
                </div>

                <div className='cartTotalBlock'>
                    <ul>
                        <li>
                            <span> Итого:</span>
                            <div></div>
                            <b>23 333 $</b>
                        </li>
                        <li>
                            <span>Налог 6%:</span>
                            <div></div>
                            <b>25 $</b>
                        </li>
                    </ul>
                    <button>
                        Оформить закаказ
                    </button>
                </div>
            </div>
        </div>


    )
}


export default Drawer;