import {ERUrl, localStorageKeyER, noOfHrToExpireER} from './constants';
import fetch from 'node-fetch';

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

function getRates(): Promise<ER> {
	return (async () => {
		const response = await fetch(ERUrl);
		try {
			const value = await response.json();
			localStorage.setItem(
				localStorageKeyER,
				JSON.stringify({date: Date.now(), ER: value})
			);
			console.info(`Getting rates data from ${ERUrl}`);
			return value as ER;
		} catch (error) {
			throw error;
		}
	})();
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
