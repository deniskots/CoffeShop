import React from 'react';
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";


function App() {
    return (
        <div className="wrapper clear">
            <Drawer/>
            <Header/>
            <div className="content p-40">
                <div className='d-flex align-center mb-40 justify-between'>
                    <h1>Все кофе</h1>
                    <div className='search-block'>
                        <img width={12} height={12} src="/img/search.svg" alt="search"/>
                        <input placeholder="Поиск..."/>
                        <span></span>
                    </div>
                </div>

                <div className='d-flex'>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </div>
        </div>
    )
}

export default App;