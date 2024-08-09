import "./App.css";
import { useState, useEffect } from "react";
import BuildingShop from "./components/BuildingShop";
import UpgradeShop from "./components/UpgradeShop";
import Cookie from "./components/Cookie";

const api = "https://techeducatorsweek6server.onrender.com";
const apiBuildings = `${api}/buildings`;
const apiUpgrades = `${api}/upgrades`;

const repo = "https://api.github.com/repos/lance-o/TechEducatorsWeek6";

let defaultCookies = 0;
let defaultUpgrades = [];
let defaultBuildings = [];

const data = {
  cookies: defaultCookies,
  buildings: defaultBuildings,
  upgrades: defaultUpgrades,
};

export default function App(props) {
  // I really do not appreciate these things right now, but as I learn React I will probably come around.
  // I was the same with OOP, then I used it for something and now I love it.
  const [buildings, setBuildings] = useState([]);

  const [upgrades, setUpgrades] = useState([]);

  const [stars, setStars] = useState(0);

  const [cps, setCps] = useState(0);

  const [cookies, setCookies] = useState(0);

  // Timer shamelessly copies from the demo.
  useEffect(() => {
    const interval = setInterval(() => {
      setCookies((currentCount) => currentCount + cps);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [cps]);

  // What's this? I wonder what it does... :)
  function addStarCookies() {
    setCookies(cookies + stars * 1000000);
  }

  // This is passed to buildings and upgrades so that they may remove cookies
  function removeCookies(cost) {
    setCookies(cookies - cost);
  }

  // Add 1 + however many click upgrades to the cookie count
  function clickCookie() {
    let clickAdd = 1 * (upgrades[0].count + 1);
    setCookies(cookies + clickAdd);
  }

  // UGLY UGLY function used for getting the current CPS.
  function calcCps() {
    let newCps = 0;
    let specialMul = 1;
    let specialAdd = 0;

    // Forgive me for doing this lol I decided I wanted upgrades to be able to target multiple types of building
    // First loop: for every building...
    for (let i = 0; i < buildings.length; i++) {
      // For every kind of upgrade, do...
      for (let y = 0; y < upgrades.length; y++) {
        // For every building this upgrade targets, do...
        for (let z = 0; z < upgrades[y].targetIds.length; z++) {
          // If this upgrade matches up with the current building type, apply upgrade
          if (upgrades[y].targetIds[z] == buildings[i].id) {
            specialMul = upgrades[y].count * (upgrades[y].cpsMultiplier - 1);
            specialAdd = upgrades[y].cpsIncrease * upgrades[y].count;
          }
        }
      }

      // Formula is ((Building Cps * Upgrade Multiplier) + Upgrade Adder) * Number owned
      newCps +=
        (buildings[i].baseCps * (specialMul + 1) + specialAdd) *
        buildings[i].count;
    }
    setCps(newCps);
  }

  // Gets new upgrades object whenever it's updated
  function getUpgrades(newUpgrades) {
    setUpgrades(newUpgrades);
    calcCps();
  }

  // Gets new buildings object whenever it's updated
  function getBuildings(newBuildings) {
    setBuildings(newBuildings);
    calcCps();
  }

  // Loads data; if none, make new data.
  useEffect(() => {
    function importLocalData() {
      console.log("Importing local data...");
      let saveData = JSON.parse(localStorage.getItem("saveData"));
      if (!saveData) {
        console.log("No data found. Creating new local data...");
        localStorage.setItem("saveData", JSON.stringify(data));
        console.log("Saving local data...");
      } else {
        console.log("Save data found.");
        data.cookies = saveData.cookies;
        data.buildings = saveData.buildings;
        data.upgrades = saveData.upgrades;
        setCookies(data.cookies);
      }
    }
    importLocalData();
  }, []);

  // Get buildings from api, sets save data if exists
  useEffect(() => {
    async function fetchBuildings() {
      const response = await fetch(apiBuildings);
      const buildings = await response.json();
      if (data.buildings[0]) {
        for (let i = 0; i < buildings.length; i++) {
          buildings[i].count = data.buildings[i].count;
        }
      }
      setBuildings(buildings);
    }
    fetchBuildings();
  }, []);

  // Get upgrades from api, sets save data if exists
  useEffect(() => {
    async function fetchUpgrades() {
      const response = await fetch(apiUpgrades);
      const upgrades = await response.json();
      if (data.upgrades[0]) {
        for (let i = 0; i < upgrades.length; i++) {
          upgrades[i].count = data.upgrades[i].count;
        }
      }
      setUpgrades(upgrades);
    }
    fetchUpgrades();
  }, []);

  // Both of the following functions are plagiarized from myself, from Week 3.
  // Myself from Week 3 has been in contact and said that it's okay.

  // Called on a timer once every 10 secs.
  function saveCookies() {
    console.log(buildings[1]);
    console.log(upgrades[1]);
    if (buildings[1] && upgrades[1]) {
      data.cookies = cookies;
      data.buildings = buildings;
      data.upgrades = upgrades;
      localStorage.setItem("saveData", JSON.stringify(data));
      console.log("Saving local data...");
      return;
    }
    console.log("Save aborted. Reason: Api not loaded.");
  }

  // Save every 10 seconds
  useEffect(() => {
    const saveInterval = setInterval(() => {
      saveCookies();
    }, 1000);
    return () => {
      clearInterval(saveInterval);
    };
  }, [cookies, buildings, upgrades]);

  // Get stars from my repo. You don't have to star the repo :)
  useEffect(() => {
    async function fetchStars() {
      const response = await fetch(repo);
      const data = await response.json();
      setStars(data.stargazers_count);
    }
    fetchStars();
  }, []);

  return (
    <>
      <header></header>
      <section className="Main">
        <h1 className="RepoStars" onClick={addStarCookies}>
          This repo has {stars} stars! Yay!
        </h1>

        <section className="CookieContainer">
          <div className="CookieInfo">
            <h2 className="CookieCount">You have {cookies} Cookie(s)</h2>
            <h2 className="CPSDisplay">CPS: {cps}</h2>
          </div>
          <Cookie clickCookie={clickCookie} />
        </section>

        <section className="Shops">
          <div>
            <div className="ShopTitle">
              <h1>Upgrades</h1>
            </div>
            <div className="ShopUpgrades">
              <UpgradeShop
                upgrades={upgrades}
                cookies={cookies}
                removeCookies={removeCookies}
                getUpgrades={getUpgrades}
              />
            </div>
          </div>

          <div>
            <div className="ShopTitle">
              <h1>Buildings</h1>
            </div>
            <div className="ShopBuildings">
              <BuildingShop
                buildings={buildings}
                upgrades={upgrades}
                cookies={cookies}
                removeCookies={removeCookies}
                getBuildings={getBuildings}
              />
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
