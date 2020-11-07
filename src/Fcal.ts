import { Decimal, Fcal, Unit } from "fcal";
import { getER } from "./Rates";

function setUnitsInFcal(ratesObj: Object) {
  console.info("Setting currency units to fcal");
  const rates = ratesObj["rates"];
  const ID = "CURRENCY";
  const ONE = new Decimal(1);
  Fcal.UseUnit(new Unit(ID, 1, "USD", ["USD", "$"]));
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["CAD"])), "CAD", ["CAD"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["HKD"])), "HKD", ["HKD"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["ISK"])), "ISK", ["ISK"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["PHP"])), "PHP", ["PHP", "₱"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["DKK"])), "DKK", ["DKK"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["HUF"])), "HUF", ["HUF"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["CZK"])), "CZK", ["CZK"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["GBP"])), "GBP", ["GBP", "£"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["RON"])), "RON", ["RON"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["SEK"])), "SEK", ["SEK"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["IDR"])), "IDR", ["IDR"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["INR"])), "INR", ["INR", "₹"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["BRL"])), "BRL", ["BRL"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["RUB"])), "RUB", ["RUB"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["HRK"])), "HRK", ["HRK"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["JPY"])), "JPY", ["JPY"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["THB"])), "THB", ["THB"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["CHF"])), "CHF", ["CHF"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["EUR"])), "EUR", ["EUR", "€"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["MYR"])), "MYR", ["MYR", "RM"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["BGN"])), "BGN", ["BGN", "лв"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["TRY"])), "TRY", ["TRY"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["CNY"])), "CNY", ["CNY", "¥"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["NOK"])), "NOK", ["NOK"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["NZD"])), "NZD", ["NZD"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["ZAR"])), "ZAR", ["ZAR"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["MXN"])), "MXN", ["MXN"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["SGD"])), "SGD", ["SGD"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["AUD"])), "AUD", ["AUD"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["ILS"])), "ILS", ["ILS"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["KRW"])), "KRW", ["KRW"])
  );
  Fcal.UseUnit(
    new Unit(ID, ONE.div(new Decimal(rates["PLN"])), "PLN", ["PLN"])
  );
}
function setERUnits() {
  const value = getER();
  if (value instanceof Promise) {
    value.then(
      (value: Object) => {
        console.log(value);
        setUnitsInFcal(value);
      },
      (e: Error) => {
        console.log(e);
      }
    );
  } else {
    setUnitsInFcal(value);
  }
}

setERUnits();
export default Fcal;
