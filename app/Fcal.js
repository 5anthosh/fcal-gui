"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fcal_1 = require("fcal");
const Rates_1 = require("./Rates");
function setUnitsInFcal(ratesObj) {
    const rates = ratesObj["rates"];
    const ID = "CURRENCY";
    const ONE = new fcal_1.Decimal(1);
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, 1, "USD", ["USD", "$"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["CAD"])), "CAD", ["CAD"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["HKD"])), "HKD", ["HKD"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["ISK"])), "ISK", ["ISK"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["PHP"])), "PHP", ["PHP", "₱"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["DKK"])), "DKK", ["DKK"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["HUF"])), "HUF", ["HUF"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["CZK"])), "CZK", ["CZK"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["GBP"])), "GBP", ["GBP", "£"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["RON"])), "RON", ["RON"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["SEK"])), "SEK", ["SEK"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["IDR"])), "IDR", ["IDR"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["INR"])), "INR", ["INR", "₹"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["BRL"])), "BRL", ["BRL"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["RUB"])), "RUB", ["RUB"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["HRK"])), "HRK", ["HRK"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["JPY"])), "JPY", ["JPY"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["THB"])), "THB", ["THB"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["CHF"])), "CHF", ["CHF"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["EUR"])), "EUR", ["EUR", "€"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["MYR"])), "MYR", ["MYR", "RM"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["BGN"])), "BGN", ["BGN", "лв"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["TRY"])), "TRY", ["TRY"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["CNY"])), "CNY", ["CNY", "¥"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["NOK"])), "NOK", ["NOK"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["NZD"])), "NZD", ["NZD"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["ZAR"])), "ZAR", ["ZAR"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["MXN"])), "MXN", ["MXN"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["SGD"])), "SGD", ["SGD"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["AUD"])), "AUD", ["AUD"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["ILS"])), "ILS", ["ILS"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["KRW"])), "KRW", ["KRW"]));
    fcal_1.Fcal.UseUnit(new fcal_1.Unit(ID, ONE.div(new fcal_1.Decimal(rates["PLN"])), "PLN", ["PLN"]));
}
function setERUnits() {
    const value = Rates_1.getER();
    if (value instanceof Promise) {
        value.then((value) => {
            console.log(value);
            setUnitsInFcal(value);
        }, (e) => {
            console.log(e);
        });
    }
    else {
        setUnitsInFcal(value);
    }
}
setERUnits();
exports.default = fcal_1.Fcal;
