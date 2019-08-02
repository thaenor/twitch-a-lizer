import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import TwitchALizer from './TwitchALizer';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <TwitchALizer />
      </div>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
