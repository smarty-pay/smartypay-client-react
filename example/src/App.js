import './App.css';
import {SmartyPayButton, SmartyPayDonation, SmartyPayPushPayment} from 'smartypay-client-react';

function App() {

  return (
    <div className="App">

      <h3>Buttons Demo</h3>

      <SmartyPayDonation
        donationId="some"
        theme="light"
        lang="en"
      />

      <br/><br/>

      <SmartyPayButton
        amount="1.99"
        token="btMNXe"
        theme="dark"
        lang="en"
        apiKey="QQRg8Kp65YzP1X5YHATPS3KpMia3xBJL"
      />

      <br/><br/>

      <SmartyPayPushPayment
        address="some"
        theme="light"
        lang="en"
      />
    </div>
  );
}

export default App;
