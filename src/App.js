import React from 'react';
import './App.css';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Detail from './pages/Detail'
import { Link, Route } from "wouter";
import  StaticContext from './context/StaticContext';
import { GifsContextProvider } from './context/GiftsContexts';

function App() {

  return (
    <StaticContext.Provider value={{name:'Miguel' ,
    frase: 'Voy a conseguirlo'}}>
      <div className="App">
        <section className="App-content">
          <Link to='/' >
            <img className='App-logo' alt='Giffy logo' src='/logo.png' />
          </Link>

          <GifsContextProvider>
            <Route path='/' component={Home} />
            <Route path='/search/:keyword' component={SearchResults} />
            <Route path='/gif/:id' component={Detail} />
            <Route path='/404' component={()=> <h1> 404 ERROR :( </h1>}/>
          </GifsContextProvider> 
        </section>
      </div>
    </StaticContext.Provider>
  );
}

export default App;
