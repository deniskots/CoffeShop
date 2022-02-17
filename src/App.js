import React from 'react';
import {Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import axios from "axios";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./components/context";
import Orders from "./pages/Orders";


function App() {
    const [items, setItems] = React.useState([]);
    //для харанения товара в корзине
    const [cartItems, setCartItems] = React.useState([]);
    //для поиска
    const [searchValue, setSearchValue] = React.useState('');
    const [cartOpened, setCartOpened] = React.useState(false);
    //хранения избранного
    const [favorites, setFavorites] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);


    React.useEffect(() => {
        // запрос через библиотеку axios(плюс в том что аксиос знает в каком формате достать ответ с сервака)
        //вытаскиваем ассинхронно данные корзины закладок и товаров в любом порядке ,
        // но сохраняем информацию стэйт в том порядке как нам необходимо

        async function fetchData() {
            const itemsResponse = await axios.get('https://6205902d161670001741bc4c.mockapi.io/items');
            const cartResponse = await axios.get('https://6205902d161670001741bc4c.mockapi.io/cart');
            const favoriteResponse = await axios.get('https://6205902d161670001741bc4c.mockapi.io/favorite');

            //когда все запросы выполнились отключить загрузку ожидания
            setIsLoading(false);

            setCartItems(cartResponse.data);
            setFavorites(favoriteResponse.data);
            setItems(itemsResponse.data);
        }

        fetchData();
    }, []);

    const onAddToCart = async (obj) => {
        const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id))
        if (findItem) {
            setCartItems((prev) => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
            await axios.delete(`https://6205902d161670001741bc4c.mockapi.io/cart/${findItem.id}`);
        } else {
            setCartItems((prev) => [...prev, obj]);
            //пост создаем
            //передаем обьект по этой ссылке и создаем массив на сервере
            const {data} = await axios.post('https://6205902d161670001741bc4c.mockapi.io/cart', obj);
            //если обьект из массива равен тому обьекту что из бэкэнда(по айди)
            //возьми его все данные и замени айди на тот айди который пришел из бэкенда
            setCartItems((prev) => prev.map(item => {
                if (item.parentId === data.parentId) {
                    return {
                        ...item,
                        id:data.id
                    };
                }
                return item;
            }));
        }
    };

    const onRemoveItem = (id) => {
        axios.delete(`https://6205902d161670001741bc4c.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter(item => item.id !== id));
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    //если в закладках мы найдем обьект с таким же айди,
    // тогда удаляем по адресу сервера
    // и из стэйта с помощью фильтрации удали этот айди,ну а если такого не будет,
    // тогда создай закладку
    //когда изсрлдьзуешь асинк и эвейт нужно добовлдять try catch
    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => favObj.id === obj.id)) {
                axios.delete(`https://6205902d161670001741bc4c.mockapi.io/favorite/${obj.id}`);
                setFavorites((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
            } else {
                const {data} = await axios.post('https://6205902d161670001741bc4c.mockapi.io/favorite', obj);
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            alert('Ошибка')
        }
    };

    //если есть хотя бы один айди совпадает с тем что в корзине тогда тру
    //парент айди в корзине сравнить с обычным айди обьекта
    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id))
    }


    return (
        <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems, onAddToCart}}>
            <div className="wrapper clear">
                {cartOpened && <Drawer items={cartItems} onRemove={onRemoveItem} onClose={() => {
                    setCartOpened(false)
                }}/>}
                <Header onClickCart={() => {
                    setCartOpened(true)
                }}/>
                <Routes>
                    <Route path="/"
                           element={
                               <Home
                                   items={items}
                                   cartItems={cartItems}
                                   searchValue={searchValue}
                                   setSearchValue={setSearchValue}
                                   onChangeSearchInput={onChangeSearchInput}
                                   onAddToFavorite={onAddToFavorite}
                                   onAddToCart={onAddToCart}
                                   isLoading={isLoading}
                               />} exact/>
                    <Route path="/favorites"
                           element={<Favorites
                               onAddToFavorite={onAddToFavorite}
                           />}/>
                    <Route path="/orders"
                           element={<Orders/>}/>
                </Routes>

            </div>
        </ AppContext.Provider>
    )
}

export default App;
