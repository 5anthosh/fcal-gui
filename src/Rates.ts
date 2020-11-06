import { ERUrl, localStorageKeyER } from "./constants";
import fetch from "node-fetch";

function getRates(): Promise<string> {
  return (async () => {
    const response = await fetch(ERUrl);
    try {
      const value = await response.json();
      localStorage.setItem(
        localStorageKeyER,
        JSON.stringify({ date: new Date(), ER: value })
      );
      return value;
    } catch (e) {
      throw e;
    }
  })();
}

function getERFromLocalStorage(): object | null {
  const ERValue = localStorage.getItem(localStorageKeyER);
  if (!ERValue) {
    return null;
  }
  return JSON.parse(ERValue);
}

export function getER(): object | Promise<string> {
  const ERValue = getERFromLocalStorage();
  if (!ERValue) {
    return getRates();
  } else {
    if (Date.now() > ERValue["date"].getTime * 1000 * 60 * 60 * 12) {
      return getRates();
    } else {
      return ERValue["ER"];
    }
  }
}
