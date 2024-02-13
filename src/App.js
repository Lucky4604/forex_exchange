import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.forexrateapi.com/v1/latest?api_key=4d6109727aaaaf60ad2eb5ce34c9c1ca&base=USD');
        setRates(response.data.rates);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching forex rates:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-col min-h-[100vh]">
    <header className="flex items-center justify-center h-14 bg-white text-black dark:bg-gray-900 dark:text-gray-50">
      <div className="flex items-center gap-2 text-2xl font-semibold">
        <TrendingUpIcon className="h-6 w-6" />
        <span>Forex Rates</span>
      </div>
    </header>
    <main className="flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-6 bg-gray-100 dark:bg-gray-900">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mx-auto w-full max-w-6xl space-y-4">
          {Object.entries(rates).map(([currency, rate]) => (
            <div key={currency} className="grid items-center gap-8 bg-white text-white rounded-lg dark:bg-gray-800">
              <div className="flex items-center gap-2">
                <FlagIcon className="h-4 w-4 ml-10 mt-8 " />
                <span className="font-semibold mt-8 ">{currency}</span>
                <span className="text-sm opacity-70">{}</span>
              </div>
              <div className="ml-[1020px]  relative mt-[-70px] flex items-center justify-center  font-semibold">{rate}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  </div>
  )
}

export default App


function FlagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function TrendingUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}