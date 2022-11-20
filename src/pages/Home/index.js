import React from "react";
import { Link } from "wouter";


const POPULAR_GIFS = ['Pinguin', 'Pato' , 'Andalucia' , '2pac'];

export default function Home(){
    return(
        <>
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