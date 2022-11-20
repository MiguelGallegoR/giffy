import {useContext} from "react";
import GiftsContexts from '../context/GiftsContexts';

export default function useGlobalGifs(){
    const {gifs} = useContext(GiftsContexts)
    return gifs
}