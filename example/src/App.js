import './App.css';
import {SmartyPayButton} from "smartypay-client-react";

function App() {

  return (
    <div className="App">

      <h3>
        SMARTy Pay React Button Demo
      </h3>

      <SmartyPayButton
        apiKey=""
        token=""
        amount=""
        theme="dark"
      />
    </div>
  );
}

export default App;
