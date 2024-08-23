import './App.css';
import {SmartyPayButton, SmartyPayDonation, SmartyPayRechargePayment} from 'smartypay-client-react';

function App() {

  return (
    <div className="App">

      <h3>Buttons Demo</h3>

      <SmartyPayDonation
        donationId="1ffc6cff-3ba9-4b93-9fe2-632517056e8e"
        theme="light"
        lang="en"
      />

      <br/><br/>

      <SmartyPayButton
        amount="1.99"
        token="btUSDTv2"
        theme="dark"
        lang="en"
        apiKey="QQRg8Kp65YzP1X5YHATPS3KpMia3xBJL"
      />

      <br/><br/>

      <SmartyPayRechargePayment
        address="0x344ca092b72c8f746ef8761bc572336968d3b108"
        theme="light"
        lang="en"
      />
    </div>
  );
}

export default App;
