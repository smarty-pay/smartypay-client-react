import './App.css';
import {SmartyPayButton} from './test/index';
import {useEffect, useRef} from "react";

function App() {

  useEffect(()=>{

    console.log('!! test')

    setTimeout(()=>{

      console.log('!! init button')

      new SmartyPayButton({
        target: 'test',
        apiKey: 'YOUR_API_KEY',
        amount: '1.99',
        token: 'bUSDT',
        lang: 'en',
        theme: 'dark',
      })
    }, 1000);

  }, []);

  return (
    <div id="test" className="App">

    </div>
  );
}

export default App;
