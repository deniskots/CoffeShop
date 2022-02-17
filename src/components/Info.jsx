import React from "react";
import AppContext from "./context";

const Info = ({title,image, description}) => {
    const {setCartOpened} = React.useContext(AppContext);

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width='120px' height='120px' src={image} alt='empty'/>
            <h3>{title}</h3>
            <p className='opacity-6'>{description}</p>
            <button onClick={() => setCartOpened(false)} className='orangeButton'>
                Вернуться назад
            </button>
        </div>
    )

};


export default Info;