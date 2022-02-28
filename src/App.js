import './App.css';
import React, { useState, useEffect } from 'react';


function App() {  
  const [myMethod, setMethod] = useState("");
  const [myPrice, setPrice] = useState(0);
  const [txamount, setAmount] = useState(0);
  const [XRP, setXRP] = useState (0);
  const [BTC, setBTC] = useState (0);
  const [ETH, setETH] = useState (0);
  const [coin, setCoin] = useState ('');
  const [balance, setBalance] = useState(0);

  let usdBalance = 0;
  let futureMoney = 0;
  let futureCoins = 0;
  let txOption = '___';
  let outcome = '';
  let worth = 0;
   
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd')

      .then(results => results.json())
      .then(data => {
        const {usd} = data.ripple;
        setXRP(usd);
      });
  }, []);
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')

      .then(results => results.json())
      .then(data => {
        const {usd} = data.bitcoin;
        setBTC(usd);
      });
  }, []);
  
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')

      .then(results => results.json())
      .then(data => {
        const {usd} = data.ethereum;
        setETH(usd);
      });
  }, []);

  const changeType = (e) => {
    setMethod(e.target.value);
  };

  const changeAmount = (e) => {
    setAmount(e.target.value);
  };
  const changePrice = (e) => {
    setPrice(e.target.value);
  };

  const changeCoin = (e) => {
    setCoin(e.target.value);
  }

  const changeBalance = (e) => {
    setBalance(e.target.value);
  }

  let formFull = false;

  if (myMethod !== '' && myPrice !== 0 && myPrice !== '' && txamount !== '' && txamount !== 0) {
    formFull = true;
  }else{
    formFull = false;
  };


  if (myMethod === 'sell' && myPrice !== 0 && txamount !== 0) {
    txOption = <a className ='sell'> sell</a>;
    futureCoins = balance - txamount;
    futureMoney = (myPrice * futureCoins).toFixed(2);
  }else if (myMethod === 'buy'&& myPrice !== 0 && txamount !== 0) { 
    txOption = <a className ='buy'>buy</a>;
    futureCoins = +balance + +txamount;
    futureMoney = (myPrice * futureCoins).toFixed(2) ;
    }


  let potentialBal = balance * myPrice;

  if (futureMoney < potentialBal && myMethod == 'sell') {
    outcome = <a className = 'sell'>lose out on</a>
  }else if (futureMoney > potentialBal && myMethod == 'buy') {
    outcome = <a className = 'buy'>profit</a>
  };

  let coinPrice= '';

  switch(coin) {
    case 'XRP':
      worth = XRP
      usdBalance = (XRP * balance).toFixed(2)
      coinPrice = 
      <div>
        <h3>The price of XRP is ${XRP}</h3>
      </div>
      break;
    case 'BTC':
      worth = BTC
      usdBalance = (BTC * balance).toFixed(2)
      coinPrice = 
      <div>
        <h3>The price of BTC is ${BTC}</h3>
      </div>
      break;
    case 'ETH':
      worth = ETH
      usdBalance = (ETH * balance).toFixed(2)
      coinPrice =
      <div>
        <h3>The price of ETH is ${ETH}</h3>
      </div>
      break;
    default:
      coinPrice = ''
      
  }

  let summary = 
  <div className = 'summary'>
  <h3>Your current balance is: ${usdBalance}</h3>
  <h3 className = 'flex'>Future Balance:</h3>
  <div>
    <h3><a className= 'number'>{futureCoins}</a> {coin}/<a className= 'number'>${futureMoney}</a></h3>
  </div>
    </div>


  let change = (Math.abs(futureMoney - potentialBal-(txamount*worth))).toFixed(2);
  let difference = 
  <div>
    <h3 className ='flex'>You would<a className='number'>{outcome}</a> ${change} </h3>
  </div>

  if (formFull === false) {
    summary = '';
    difference = '';
  }
  
  return (
    <div className="App">
      <header><h1 className = 'header'>Crypto Calculator</h1></header>

      <div className="Container">

      <div className = 'form'>
      <form>
      <label for="coins">Choose Cryptocurrency:</label>
      <select onChange={changeCoin}name="coins" id="coins">
          <option value="blank"> </option>
          <option value="XRP">XRP</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
        </select>
      <br></br>
      {coinPrice}
      <label for="start-balance">Current # Coins</label><br></br>
      <input placeholder='Number of Coins' size='10' onChange={changeBalance} type="number" min='0' id="start-balance" name='inputcrrnt' /><br></br>
      <label for="coin price">Target Price</label><br></br>
      <input placeholder='$' size='10' onChange={changePrice} type="number" min = {worth} id="coin price" name='inputprice' /><br>
      </br>
      <label for="txamount">Buy/Sell Amount</label><br></br>
      <input placeholder={coin} size='10'onChange={changeAmount} type="number" id="txamount" name='inputamnt'/><br>
      </br>
        </form>
        </div>

        <div className = 'buttons'>
        <button className = 'sell-button' onClick={changeType} value="sell" name="method" > Sell(-) </button>
        <button className = 'buy-button' onClick={changeType}  value="buy" name="method" > Buy(+) </button>
       </div>
        <div className='text-out' id='output'>
          <h2>Future Balance Summary</h2>
          {summary}
          {difference}

          
          
          </div>
          <br></br>
          
       </div> 
          
    </div>
  );
}

export default App;