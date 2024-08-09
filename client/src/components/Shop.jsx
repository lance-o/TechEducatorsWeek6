import { useState, useEffect } from "react";
import BuildingShop from "./BuildingShop";
import UpgradeShop from "./UpgradeShop";
import Cookie from "./components/Cookie";

const api = "http://localhost:3000";
const apiBuildings = `${api}/buildings`;
const apiUpgrades = `${api}/upgrades`;

export default function Shop(props) {
  const [buildings, setBuildings] = useState([]);

  const [upgrades, setUpgrades] = useState([]);

  function getUpgrades(newUpgrades) {
    setUpgrades(newUpgrades);
  }

  function getBuildings(newBuildings) {
    setUpgrades(newBuildings);
  }

  

  function setData() {
    props.retrieveState({buildings, upgrades});
  }

  useEffect(() => {
    async function fetchBuildings() {
      const response = await fetch(apiBuildings);
      const data = await response.json();
      setBuildings(data);
    }
    fetchBuildings();
  }, []);

  useEffect(() => {
    async function fetchUpgrades() {
      const response = await fetch(apiUpgrades);
      const data = await response.json();
      setUpgrades(data);
    }
    fetchUpgrades();
  }, []);

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
      <h1>NutriGenius has {stars} stars! Yay!</h1>
      <UpgradeShop upgrades={upgrades} getUpgrades={getUpgrades} />
      <BuildingShop buildings={buildings} getBuildings={getBuildings} />
      <Cookie />
    </>
  );
}
