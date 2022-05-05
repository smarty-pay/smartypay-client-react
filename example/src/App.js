import './App.css';
import {SmartyPayButton} from 'smartypay-client-react';

function App() {

  return (
    <div className="App">

      <h3>Button Demo</h3>

      <SmartyPayButton
        amount="1.99"
        token="btMNXe"
        theme="dark"
        lang="en"
        apiKey="QQRg8Kp65YzP1X5YHATPS3KpMia3xBJL"
      />
    </div>
  );
}

export default App;
