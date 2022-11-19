import React from 'react';
import './App.css';
import ListOfGifs from './components/ListOfGifs';
import { Link, Route } from "wouter";


function App() {

  return (
    <div className="App">
      <section className="App-content">
        <h1>App</h1>

          <Link to='/gif/patos'>Gifs de patos</Link> 
          <Link to='/gif/pinguin'>Gifs de pinguinos</Link> 
          <Link to='/gif/tattoo'>Gifs de tattoos</Link> 
          <Route path='/gif/:keyword' component={ListOfGifs} />
                  
      </section>
    </div>
  );
}

export default App;
