import React from "react";
import styles from './Card.module.scss'
import axios from "axios";
import ContentLoader from "react-content-loader";
import AppContext from "../context";

function Card({
                  id,
                  onFavorite,
                  onPlus,
                  price,
                  title,
                  imageUrl,
                  favorited = false,
                  added = false,
                  loading = false
              }) {

//сразу через контекст мы передаем с эппа
    const {isItemAdded} = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const obj = {id, parentId: id, title, price, imageUrl};


    // added={isItemAdded(item && item.id)}

    //получаем обьект с помощью пропс и и добавляем в корзину
    const onClickPlus = () => {
        onPlus(obj);
    }
    const onClickFavorite = () => {
        onFavorite(obj)
        setIsFavorite(!isFavorite)
    }
    return (
        <div className={styles.card}>
            {
                loading ?
                    <ContentLoader
                        speed={2}
                        width={155}
                        height={265}
                        viewBox="0 0 155 265"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="1" y="0" rx="10" ry="10" width="155" height="155"/>
                        <rect x="0" y="167" rx="5" ry="5" width="155" height="15"/>
                        <rect x="0" y="187" rx="5" ry="5" width="100" height="15"/>
                        <rect x="1" y="234" rx="5" ry="5" width="80" height="25"/>
                        <rect x="124" y="230" rx="10" ry="10" width="32" height="32"/>
                    </ContentLoader> :
                    <>
                        {onFavorite && (
                            <div className={styles.favorite} onClick={onClickFavorite}>
                                <img
                                    width={15} height={15}
                                    src={isFavorite ? "/img/heart.svg" : "/img/empty-heart.svg"}
                                    alt="heart"/>
                            </div>
                        )}
                        <img width='100%' height={135} src={imageUrl} alt="coffee"/>
                        <h5> {title}</h5>
                        <div className='d-flex justify-between align-center'>
                            <div className='d-flex flex-column'>
                                <span>Цена:</span>
                                <b>{price} $.</b>
                            </div>
                            {onPlus && (
                                <img
                                    className={styles.plus}
                                    onClick={onClickPlus} width={11} height={11}
                                    src={isItemAdded(id) ? "/img/check.svg" : "/img/plus sign.svg"}
                                    alt="plus"
                                />
                            )}

                        </div>
                    </>
            }
        </div>
    )


}

export default Card;