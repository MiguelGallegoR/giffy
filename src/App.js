import React from 'react';
import './App.css';
import Home from './pages/Home';
import Header from './components/Header/index';
import Login from './pages/Login';
import SearchResults from './pages/SearchResults';
import Detail from './pages/Detail'
import { Link, Route } from "wouter";

import { GifsContextProvider } from './context/GiftsContexts';
import { UserContextProvider } from './context/UserContext';

function App() {

  return (
    <UserContextProvider>
      <div className="App">
        <section className="App-content">
        <Header></Header>
          <Link to='/' >
            <img className='App-logo' alt='Giffy logo' src='/logo.png' />
          </Link>

          <GifsContextProvider>
            <Route path='/' component={Home} />
            <Route path='/search/:keyword/:rating?' component={SearchResults} />
            <Route path='/gif/:id' component={Detail} />
            <Route path='/login' component={Login} />
            <Route path='/404' component={()=> <h1> 404 ERROR :( </h1>}/>
          </GifsContextProvider> 
        </section>
      </div>
    </UserContextProvider>
  );
}

export default App;
