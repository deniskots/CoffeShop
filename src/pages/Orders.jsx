import React from "react";
import Card from "../components/Card/Card";
import axios from "axios";
import AppContext from "../components/context";


function Orders() {
    const  [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const {onAddToFavorite, onAddToCart } = React.useContext(AppContext);

    //самовызывающая функия,анологична фетчдате в эпп
    React.useEffect((data) => {
        (async () => {
                const {data} = await axios.get('https://6205902d161670001741bc4c.mockapi.io/orders');

                //достаем обьекты и делаем массив массивов и через флет обьеденяем в один массив,
                //либо можем черз рэдьюс сделать
                //console.log(data.map((obj) => obj.items).flat());
                //console.log(data.reduce((prev, obj) => [...prev, ...obj.items],[]));
                setOrders(data.map((obj) => obj.items).flat());
                setIsLoading(false);
        })();

    }, []);

    return (
        <div className='content p-40'>
            <div className='d-flex align-center justify-between mb-40'>
                <h1>Мои Заказы</h1>
            </div>
            <div className='d-flex flex-wrap'>
                {(isLoading ? [...Array(9)] : orders).map((item, index) => (
                    <Card
                        key={index}
                        loading={isLoading}
                        {...item}
                    />
                ))}
            </div>
        </div>
    )
};

export default Orders;