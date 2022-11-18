import React, {useState} from 'react';
import './App.css';


const GIFS = ['https://media0.giphy.com/media/Cmr1OMJ2FN0B2/200w.webp?cid=ecf05e47ijs527saakosms6xop6nxk3a0bhd6compgnw95bm&rid=200w.webp&ct=g',
'https://media2.giphy.com/media/Pt5PnJVtHuy2s/200.webp?cid=ecf05e47ih2em68e3g6wzxgwigdtphvfyjs7benoz21ix473&rid=200.webp&ct=g'
]

const DIFF_GIFS = ['https://media1.giphy.com/media/Zap6W7a0uSBGHmzdNA/giphy.gif?cid=ecf05e47ll5grwpw6os4jefw8pnsgr6q9y12yxuo0axnlvcp&rid=giphy.gif&ct=g']


function App() {
  const [gifs, setGifs] = useState(GIFS);
  return (
    <div className="App">
      <section className="App-content">
          {
            gifs.map((singleGif) => {
             return <img src={singleGif}></img>
            })
          }


          <button onClick={()=>setGifs(DIFF_GIFS)}>Cambiar gifs</button>
      </section>
    </div>
  );
}

export default App;
