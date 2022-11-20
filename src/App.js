import React from 'react';
import './App.css';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Detail from './pages/Detail'
import { Link, Route } from "wouter";


function App() {

  return (
    <div className="App">
      <section className="App-content">
        <Link to='/' >
          <img className='App-logo' alt='Giffy logo' src='/logo.png' />
        </Link>
           
          <Route path='/' component={Home} />
          
          <Route path='/search/:keyword' component={SearchResults} />
          <Route path='/gif/:id' component={Detail} />
                  
      </section>
    </div>
  );
}

export default App;
