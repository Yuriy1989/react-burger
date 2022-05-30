import React, {useState} from 'react';
import AppHeader from '../appHeader/AppHeader';

import './App.css';

function App() {
  const [current, setCurrent] = useState('one');
  return (
    <>
      <main className="App">
        <AppHeader />
      </main>
    </>
  );
}

export default App;
