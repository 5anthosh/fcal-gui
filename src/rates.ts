import { ERUrl, localStorageKeyER, noOfHrToExpireER } from "./util";

export interface Rates {
  CAD: number;
  HKD: number;
  ISK: number;
  PHP: number;
  DKK: number;
  HUF: number;
  CZK: number;
  GBP: number;
  RON: number;
  SEK: number;
  IDR: number;
  INR: number;
  BRL: number;
  RUB: number;
  HRK: number;
  JPY: number;
  THB: number;
  CHF: number;
  EUR: number;
  MYR: number;
  BGN: number;
  TRY: number;
  CNY: number;
  NOK: number;
  NZD: number;
  ZAR: number;
  USD: number;
  MXN: number;
  SGD: number;
  AUD: number;
  ILS: number;
  KRW: number;
  PLN: number;
}

export interface ER {
  base: string;
  date: Date;
  rates: Rates;
}

interface ERData {
  timestamp: number;
  ER: ER;
}

export function getRates(): Promise<ER> {
  return new Promise(function (
    resolve: (value: ER) => void,
    reject: (reason: Error) => void
  ) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", ERUrl);
    xhttp.onload = () => {
      if (xhttp.status == 200) {
        localStorage.setItem(
          localStorageKeyER,
          JSON.stringify({
            date: Date.now(),
            ER: JSON.parse(xhttp.response),
          })
        );
        resolve(JSON.parse(xhttp.response) as ER);
      } else {
        reject(new Error(xhttp.statusText));
      }
    };
    xhttp.onerror = () => reject(new Error(xhttp.statusText));
    xhttp.send();
  });
}

function getERFromLocalStorage(): ERData | null {
  const ERValue = localStorage.getItem(localStorageKeyER);
  if (!ERValue) {
    return null;
  }

  return JSON.parse(ERValue);
}

export function getER(): ER | Promise<ER> {
  const ERValue = getERFromLocalStorage();
  if (!ERValue) {
    return getRates();
  }

  if (Date.now() > ERValue.timestamp * 1000 * 60 * 60 * noOfHrToExpireER) {
    console.info(`Rates got expired: ${new Date(ERValue.timestamp)}`);
    return getRates();
  }

  return ERValue.ER;
}
