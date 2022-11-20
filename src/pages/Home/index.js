import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import ListOfGifs from "../../components/ListOfGifs";
import { useGifs } from "../../hooks/useGifs";

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
                <input placeholder="Search a gif here..." onChange={handleChange} type='text' value={keyword}/>
                <button>Buscar</button>
            </form> 
            <h3 className="App-title">Última búsqueda</h3>
            <ListOfGifs gifs={gifs}/>

            <h3 className="App-title">Los gifs mas populares</h3>
            <ul>
                {POPULAR_GIFS.map((popularGif)=>(
                    <li key={popularGif}>
                        <Link to={`/search/${popularGif}`}>Gifs de {popularGif}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}