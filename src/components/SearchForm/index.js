import React, {useState, useReducer} from "react";
import { useLocation } from "wouter";
import css from './SearchForm.module.css'

const RATINGS = ['g', 'pg', 'pg-13', 'r'];

const reducer = (state, action) =>{
    if(action.type === 'update_keyword'){
        return{
            ...state,
            keyword:action.payload,
            times:state.times+1
        }
    }else if(action.type === 'update_rating'){
        return {
            ...state,
            rating: action.payload
        }
    }

    return state
}

function SearchForm({ intialKeyword = '', initialRating = 'g'}) {
    
    const [state, dispatch] = useReducer(reducer, {
        keyword: decodeURIComponent(intialKeyword),
        rating: initialRating,
        times: 0
    })

    const {keyword, rating ,times} = state

    const [ , pushLocation] = useLocation();
    
    

    const handleChange = (event) =>{
        dispatch({type: 'update_keyword', payload: event.target.value});
    }

    const handleSubmit = event =>{
        event.preventDefault();
        //navegar a otra ruta
        pushLocation(`/search/${keyword}/${rating}`)
        
    }

    const handleChangeRating = (event) =>{
        dispatch({type: 'update_rating', payload: event.target.value});
    }

    return (
        <form onSubmit={handleSubmit} className={css["c-search"]}>
            <button className={css["c-search-btn"]}>Buscar</button>
            <input className={css["c-search-input"]} placeholder="Search a gif here..."
                onChange={handleChange} type='text' value={keyword}/>
            <select onChange={handleChangeRating} value={rating}>
                <option disabled>Rating type</option>
                {RATINGS.map(rating=> <option key={rating}>{rating}</option>)}
            </select>
            <small>{times}</small>
        </form> 
    )
}

export default React.memo(SearchForm)