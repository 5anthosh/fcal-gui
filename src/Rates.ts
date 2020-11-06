import { ERUrl, localStorageKeyER } from "./constants";
import fetch from "node-fetch";

function getRates(): any {
  let value: any = "";
  (async () => {
    const response = await fetch(ERUrl);
    try {
      value = await response.json();
      localStorage.setItem(
        localStorageKeyER,
        JSON.stringify({ date: new Date(), ER: value })
      );
    } catch (e) {
      console.log(e);
      value = null;
    }
  })();
  return value;
}

export function getER(): Object | null {
  const ERValue = localStorage.getItem(localStorageKeyER);
  if (!ERValue) {
    return getRates();
  } else {
    const value = JSON.parse(ERValue);
    if (Date.now() > value.date.getTime * 1000 * 60 * 60 * 12) {
      return getRates();
    } else {
      return value.ER;
    }
  }
}
