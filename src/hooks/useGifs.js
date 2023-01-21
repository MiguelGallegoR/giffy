import {useContext ,useEffect, useState} from 'react';
import getGifs from '../services/getGifs';
import GifsContexts from '../context/GiftsContexts'

const INITIAL_PAGE = 0
export function useGifs ({keyword, rating} = {keyword: null}) {
    const [loading, setLoading] = useState(false);
    const [loadingNextPage, setLoadingNextPage] = useState(false);
    const [page, setPage] = useState(INITIAL_PAGE)
    const {gifs, setGifs} = useContext(GifsContexts)
    //const [gifs, setGifs] = useState([]);
   
    //recuperamos la keyword del localStorage
    const keywordToUse = keyword || localStorage.getItem('lastKeyword') || 'random' ;
    useEffect(function (){
        setLoading(true)
     
        getGifs({keyword: keywordToUse, rating})
        .then(gifs=> {
            setGifs(gifs)
            setLoading(false)
            //guardamos la keyword en el localStorage
            localStorage.setItem('lastKeyword', keyword)
        })
    }, [keyword, keywordToUse ,setGifs]);


    useEffect(function (){
        if(page === INITIAL_PAGE) return
        setLoadingNextPage(true)
        getGifs({keyword: keywordToUse, rating ,page})
            .then(nextGifs => {
                setGifs( prevGifs => prevGifs.concat(nextGifs))
                setLoadingNextPage(false)
            })
    }, [page])

    return {loading, loadingNextPage ,gifs, setPage}
}
