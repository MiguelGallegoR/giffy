import React from "react";
import ListOfGifs from "../../components/ListOfGifs";
import Spinner from "../../components/Spinner";
import { useGifs } from "../../hooks/useGifs";
export default function SearchResults({params}){
    const {keyword} = params;
    const {loading, gifs} = useGifs({keyword});
   
    return <>
        {loading

            ? <Spinner />
            : <> 
                <h3 className="App-title">{decodeURI(keyword)}</h3>
                <ListOfGifs gifs={gifs} />
              </>
        }
    </>



}

