import { useEffect, useState } from "react";
import InputBox from "./components/InputBox"
import useCurrencyInfo from "./hooks/useCurrencyInfo"
import { ArrowSwapVertical } from 'iconsax-react';

function App() {
  const [amount, setAmount]=useState(0)
  const [calculatedAmaount,setCalculatedAmount]=useState(0)
  const [from , setFrom]=useState("usd")
  const [to , setTo]=useState("inr")

  const currencyInfo=useCurrencyInfo(from)
  const option=Object.keys(currencyInfo)
  useEffect(()=>{
    setCalculatedAmount(Number(amount) * currencyInfo[to])
  },[amount,from,to,currencyInfo])

  const swap=()=>{
    setFrom(to)
    setTo(from)
  }

    

  return (
    <div
    className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
    style={{
      backgroundImage: `url('https://images.pond5.com/black-seamless-animated-background-loop-footage-072060044_prevstill.jpeg')`,
    }}
    >
          <div className="w-full">
    <h1 className="text-white text-center mb-14 text-3xl font-medium">Currency Convertor</h1>
              <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                  <form
                      onSubmit={(e) => {
                          e.preventDefault();
                         
                      }}
                  >
                      <div className="w-full mb-6">
                          <InputBox
                              label="From"
                              amount={amount}
                              onAmountChange={(amount)=>setAmount(amount)}
                              selectCurrency={from}
                              onCurrencyChange={(currency)=>{
                                setFrom(currency)
                              }}
                              currencyOptions={option}
   
                          />
                      </div>
                      <div className="relative w-full h-0.5">
                          <button
                              type="button"
                              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 "
                              onClick={swap}
                          >
                            <ArrowSwapVertical size="40" color="#fff" variant="Bulk"/>
                          </button>
                          
                      </div>
                      <div className="w-full mt-5 mb-4">
                          <InputBox
                              label="To"
                              amount={calculatedAmaount}
                              selectCurrency={to}
                              onCurrencyChange={(currency)=>{
                                setTo(currency)
                              }}
                              currencyOptions={option}
                              amountDisable= {true}
                              
                          />
                      </div>
                      
                  </form>
              </div>
          </div>
      </div>
  );
}

export default App;