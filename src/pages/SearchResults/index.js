import React from "react";
import ListOfGifs from "../../components/ListOfGifs";
import Spinner from "../../components/Spinner";
import { useGifs } from "../../hooks/useGifs";

export default function SearchResults({params}){
    const {keyword} = params;
    const {loading, gifs, setPage} = useGifs({keyword});
   
    const handleNextPage = () => setPage(prevPage => prevPage + 1)
    return <>
        {loading

            ? <Spinner />
            : <> 
                <h3 className="App-title">{decodeURI(keyword)}</h3>
                <ListOfGifs gifs={gifs} />
              </>
        }
        <br/>
        <button onClick={handleNextPage}>Get next page</button>
    </>



}

