import React from "react";

function Card() {
    return (
            <div className='card'>
                <div className='favorite'>
                    <img width={15} height={15} src="/img/heart.svg" alt="heart"/>
                </div>

                <img width={133} height={112} src="/img/coffee/1.jpg" alt="coffee"/>
                <h5> Кофе Колумбия Medelin Supremo</h5>
                <div className='d-flex justify-between align-center'>
                    <div className='d-flex flex-column'>
                        <span>Цена:</span>
                        <b>33.3 $.</b>
                    </div>
                    <button className='button'>
                        <img  width={11} height={11} src="/img/plus sign.svg" alt="plus"/>
                    </button>
                </div>
            </div>
        )


}

export default Card;