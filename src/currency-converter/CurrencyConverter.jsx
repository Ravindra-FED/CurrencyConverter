import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BASE_URL } from "../apiData";
import { CURRENCY_FROM_ID, CURRENCY_TO_ID } from "../constants";
import "./CurrencyConverter.scss";
import { CurrencySelectAndInput } from "../CurrencySelectAndInput/currencySelectAndInputFields";

export const CurrencyConverter = () => {
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  const [countriesAndSymbols, setCountriesAndSymbols] = useState([]);

  const [exchangeRates, setExchangeRates] = useState({});
  const [exchangeRate, setExchangeRate] = useState(0);

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const onSelectCountry = (event) => {
    if (event.target.id.includes(CURRENCY_FROM_ID.COUNTRY)) {
      setFromCountry(event.target.value);
    }
    if (event.target.id.includes(CURRENCY_TO_ID.COUNTRY)) {
      setToCountry(event.target.value);
    }
  };

  const onChangeCurreny = (event) => {
    if (event.target.value.trim().length) {
      const valueInNumber = parseInt(event.target.value);
      if (event.target.id.includes(CURRENCY_FROM_ID.VALUE)) {
        setFromAmount(valueInNumber);
        setToAmount((valueInNumber * exchangeRate).toFixed(2));
      }
      if (event.target.id.includes(CURRENCY_TO_ID.VALUE)) {
        setToAmount(valueInNumber);
        setFromAmount((valueInNumber / exchangeRate).toFixed(2));
      }
    } else {
      setFromAmount(null);
      setToAmount(null);
    }
  };

  const calculateConvertionRate = () => {
    if (toCountry.length) {
      const fromCountryRate = exchangeRates[fromCountry];
      const toCountryRate = exchangeRates[toCountry];
      const xr = toCountryRate / fromCountryRate;
      setExchangeRate(xr);
    }
  };

  useEffect(() => {
    setLoader(true);
    const countriesApis = [
      fetch(`${BASE_URL}/symbols`),
      fetch(`${BASE_URL}/latest`),
    ];

    Promise.all(countriesApis)
      .then((values) => {
        return Promise.all(values.map((r) => r.json()));
      })
      .then(([countriesAndSymbols, exchangeRates]) => {
        // This is to check whether the required data is there in the api or not
        if (
          Object.keys(countriesAndSymbols?.symbols).length < 2 ||
          Object.keys(exchangeRates?.rates).length < 2
        ) {
          throw new Error("no data");
        }

        const symbolsData = countriesAndSymbols.symbols;
        const countryAbbr = Object.keys(symbolsData);
        const formattedData = countryAbbr.map((item) => ({
          country: symbolsData[item].description,
          abbr:symbolsData[item].code,
        }));
        setCountriesAndSymbols(formattedData);
        setFromCountry(formattedData[0].abbr);
        setToCountry(formattedData[1].abbr);
        setExchangeRates(exchangeRates.rates);
        setLoader(false);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        setError(true);
      });
  }, []);

  useEffect(() => {
    calculateConvertionRate();
    setFromAmount(0);
    setToAmount(0);
  }, [toCountry, fromCountry, exchangeRates]);

  return (
    <>
      {loader && (
        <div className="loader-overLay">
          <div className="loader"></div>
        </div>
      )}
      {error && (
        <div className="error-display">
          There is an Error, Please try after some time
        </div>
      )}
      {!error && !loader && (
        <>
          <CurrencySelectAndInput
            countriesAndSymbols={countriesAndSymbols}
            countryId={CURRENCY_FROM_ID.COUNTRY}
            onSelectClick={onSelectCountry}
            selectDefaultValue={fromCountry}
            onChangeInput={onChangeCurreny}
            currencyId={CURRENCY_FROM_ID.VALUE}
            toAmount={fromAmount}
          />
          <CurrencySelectAndInput
            countriesAndSymbols={countriesAndSymbols}
            countryId={CURRENCY_TO_ID.COUNTRY}
            onSelectClick={onSelectCountry}
            selectDefaultValue={toCountry}
            onChangeInput={onChangeCurreny}
            currencyId={CURRENCY_TO_ID.VALUE}
            toAmount={toAmount}
          />
        </>
      )}
    </>
  );
};
