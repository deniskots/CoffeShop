import React from "react";
import Card from "../components/Card/Card";


function Home({
                  items, searchValue, setSearchValue,
                  onAddToCart, onChangeSearchInput,
                  onAddToFavorite, isLoading
              }) {

    /*пробигаемся по массиву и ренедерим список карточек,в каждую карточку мы пердаем то что пришло в обьекте
        но сперва перед тем как пробегаться по массиву отфильтруй то что есть и достань от туда название и сравни его с поиском
        что бы не было пролбемы с поиском заглавных букв,добавил метод  что бы переводил обьекты в нижний реестр*/
    const renderItems = () => {
        const filteredItems = items.filter(item =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()));

        return (isLoading ? [...Array(9)] : filteredItems).map((item, index) => (
                <Card
                    key={index}
                    onFavorite={onAddToFavorite}
                    onPlus={onAddToCart}
                    loading={isLoading}
                    {...item}
                />
            ));
    };
    return (
        <div className="content p-40">
            <div className='d-flex align-center mb-40 justify-between'>
                <h1>{searchValue ? `поиск пор запросу: ${searchValue}` : 'Все кофе'}</h1>
                <div className='search-block'>
                    <img width={12} height={12} src="/img/search.svg" alt="search"/>
                    {/*если преременная searchValue true тогда отображать кнопку очистки*/}
                    {searchValue && (
                        <img
                            className='clear removeBtn cu-p'
                            onClick={() => setSearchValue('')}
                            src="/img/remove.svg"
                            alt="remove"
                        />
                    )}
                    {/*создаем контралируемый инпут*/}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
                    <span></span>
                </div>
            </div>

            <div className='d-flex flex-wrap'>
                {renderItems()}
            </div>
        </div>
    )
};


export default Home;
