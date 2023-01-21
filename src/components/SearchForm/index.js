import React from "react";
import { useLocation } from "wouter";
import css from './SearchForm.module.css'
import useForm from "./hook";


const RATINGS = ['g', 'pg', 'pg-13', 'r'];


function SearchForm({ intialKeyword = '', initialRating = 'g'}) {
    
    const {keyword, rating ,times, updateKeyword, updateRating} = useForm({intialKeyword, initialRating})

    const [ , pushLocation] = useLocation();
    
    
    const handleChange = (event) =>{
        updateKeyword(event.target.value)
        
    }

    const handleSubmit = event =>{
        event.preventDefault();
        //navegar a otra ruta
        pushLocation(`/search/${keyword}/${rating}`)
        
    }

    const handleChangeRating = (event) =>{
        updateRating(event.target.value)
        
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