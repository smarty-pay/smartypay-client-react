
# SMARTy Pay Client React
React library for show a payment button

## Installation
```shell
npm i smartypay-client-react
```

## Usage
```jsx
import {SmartyPayButton} from 'smartypay-client-react';

<SmartyPayButton
  amount="1.99" 
  token="bUSDT"
  lang="en"
  theme="dark"
  apiKey="YOUR_API_KEY"
/>
```
- **amount** - amount for invoice (example 0.99)
- **token** - see valid tokens here: https://docs.smartypay.io/general/supported-tokens
- **lang** - `en` by default (also has `es`, `ru`)
- **theme** - `light` (default) or `dark`
- **apiKey** - you can get it here: https://dashboard.smartypay.io/


## Example React Project
[See files](https://github.com/smarty-pay/smartypay-client-react/tree/main/example)



## Build steps
### Clone repository into your dir
```shell
cd your_dir
git clone https://github.com/smarty-pay/smartypay-client-react
```

### Build
```shell
npm install
npm run build
```
