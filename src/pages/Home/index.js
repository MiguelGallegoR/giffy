import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import ListOfGifs from "../../components/ListOfGifs";
import { useGifs } from "../../hooks/useGifs";
import Category from "../../components/Category";

const POPULAR_GIFS = ['Pinguin', 'Pato' , 'Andalucia' , '2pac'];

export default function Home(){
    const [keyword, setKeyword] = useState('');
    const [path, pushLocation] = useLocation();
    
    const {loading, gifs} = useGifs()


    const handleSubmit = event =>{
        event.preventDefault();
        //navegar a otra ruta
        pushLocation(`/search/${keyword}`)
        
        
    }
    const handleChange = (event) =>{
        setKeyword(event.target.value);
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <button>Buscar</button>
                <input placeholder="Search a gif here..." onChange={handleChange} type='text' value={keyword}/>
            </form> 

            <div className="App-main">
                <div className="App-results">
                    <h3 className="App-title">Última búsqueda</h3>
                    <ListOfGifs gifs={gifs}/>
                </div>
                
                <div className="App-category">
                  <Category name="Categorías populares" options={POPULAR_GIFS} />
                  <Category name="Mascotas" options={['Perros', 'Gatos', 'Hamsters']} />
                </div>
            </div>
        </>
    )
}