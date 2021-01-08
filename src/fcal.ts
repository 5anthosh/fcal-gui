import { Decimal, Fcal, Unit } from "fcal";
import { getER, ER, Rates } from "./rates";
import { reRun } from "./renderer";

const ONE = new Decimal(1);
const ID = "CURRENCY";

function getUnitFromRates(rates: Rates, unit: string): Decimal {
  return ONE.div(new Decimal(rates[unit]));
}

function createUnit(
  rates: Rates,
  currencyType: string,
  phrases: string[]
): Unit {
  return new Unit(
    ID,
    getUnitFromRates(rates, currencyType),
    currencyType,
    phrases
  );
}

function setUnitsInFcal(ratesObject: ER) {
  console.info("Setting currency units to fcal");
  const r = ratesObject.rates;
  Fcal.UseUnit(createUnit(r, "USD", ["USD", "$"]));
  Fcal.UseUnit(createUnit(r, "CAD", ["CAD"]));
  Fcal.UseUnit(createUnit(r, "HKD", ["HKD"]));
  Fcal.UseUnit(createUnit(r, "ISK", ["ISK"]));
  Fcal.UseUnit(createUnit(r, "PHP", ["PHP", "₱"]));
  Fcal.UseUnit(createUnit(r, "DKK", ["DKK"]));
  Fcal.UseUnit(createUnit(r, "HUF", ["HUF"]));
  Fcal.UseUnit(createUnit(r, "CZK", ["CZK"]));
  Fcal.UseUnit(createUnit(r, "GBP", ["GBP", "£"]));
  Fcal.UseUnit(createUnit(r, "RON", ["RON"]));
  Fcal.UseUnit(createUnit(r, "SEK", ["SEK"]));
  Fcal.UseUnit(createUnit(r, "IDR", ["IDR"]));
  Fcal.UseUnit(createUnit(r, "INR", ["INR", "₹"]));
  Fcal.UseUnit(createUnit(r, "BRL", ["BRL"]));
  Fcal.UseUnit(createUnit(r, "RUB", ["RUB"]));
  Fcal.UseUnit(createUnit(r, "HRK", ["HRK"]));
  Fcal.UseUnit(createUnit(r, "JPY", ["JPY"]));
  Fcal.UseUnit(createUnit(r, "THB", ["THB"]));
  Fcal.UseUnit(createUnit(r, "CHF", ["CHF"]));
  Fcal.UseUnit(createUnit(r, "EUR", ["EUR", "€"]));
  Fcal.UseUnit(createUnit(r, "MYR", ["MYR", "RM"]));
  Fcal.UseUnit(createUnit(r, "BGN", ["BGN", "лв"]));
  Fcal.UseUnit(createUnit(r, "TRY", ["TRY"]));
  Fcal.UseUnit(createUnit(r, "CNY", ["CNY", "¥"]));
  Fcal.UseUnit(createUnit(r, "NOK", ["NOK"]));
  Fcal.UseUnit(createUnit(r, "NZD", ["NZD"]));
  Fcal.UseUnit(createUnit(r, "ZAR", ["ZAR"]));
  Fcal.UseUnit(createUnit(r, "MXN", ["MXN"]));
  Fcal.UseUnit(createUnit(r, "SGD", ["SGD"]));
  Fcal.UseUnit(createUnit(r, "AUD", ["AUD"]));
  Fcal.UseUnit(createUnit(r, "ILS", ["ILS"]));
  Fcal.UseUnit(createUnit(r, "KRW", ["KRW"]));
  Fcal.UseUnit(createUnit(r, "PLN", ["PLN"]));
}

function setERUnits() {
  const value = getER();
  if (value instanceof Promise) {
    value.then(
      (value: ER) => {
        console.log(value);
        setUnitsInFcal(value);
        console.info("Re-running the fcal eval");
        reRun();
      },
      (error: Error) => {
        alert(
          `Could not get currency rates, so currency conversion is disabled.
Check your internet connection`
        );
        console.error(error);
      }
    );
  } else {
    setUnitsInFcal(value);
  }
}

setERUnits();
export default Fcal;
