import "./ShopItem.css";
import { useState, useEffect } from "react";
import UpgradeShop from "./UpgradeShop";

export default function Building(props) {
  const [count, setMyCounterState] = useState(0);

  function getCost() {
    return (
      props.baseCost +
      Math.floor(
        (props.baseCost / (10 - props.costHike)) *
          props.count *
          ((props.baseCost / (10 - props.costHike)) *
            props.count *
            props.costHike)
      )
    );
  }

  function incrementCounter() {
    if (props.cookies < getCost()) {
      return;
    }
    props.removeCookies(getCost());
    setMyCounterState(count + 1);
    const newBuilding = {
      id: props.id,
      name: props.name,
      baseCps: props.baseCps,
      baseCost: props.baseCost,
      costHike: props.costHike,
      count: count + 1,
    };
    props.getBuildingData(newBuilding, props.id);
  }

  function getUpgrade(id) {
    for (let i = 0; i < props.upgrades.length; i++) {
      let upgradeCount = props.upgrades[i].count;
      for (let j = 0; j < props.upgrades[i].targetIds.length; j++) {
        if (id == props.upgrades[i].targetIds[j]) {
          return upgradeCount;
        }
      }
    }
    return null;
  }

  function getUpgradeCps(id, cps) {
    let specialMul = 1;
    let specialAdd = 0;
    for (let i = 0; i < props.upgrades.length; i++) {
      let upgradeCount = props.upgrades[i].count;
      for (let j = 0; j < props.upgrades[i].targetIds.length; j++) {
        if (id == props.upgrades[i].targetIds[j]) {
          specialMul = upgradeCount * (props.upgrades[i].cpsMultiplier - 1);
          specialAdd = props.upgrades[i].cpsIncrease * upgradeCount;
        }
      }
    }
    return cps * (specialMul + 1) + specialAdd;
  }

  useEffect(() => {
    setMyCounterState((e) => props.count);
    props.getBuildingData(props, props.id);
  }, []);

  return (
    <div className="ShopItem" onClick={incrementCounter}>
      <h2 className="Count">{count}</h2>
      <div className="Title">
        <h2>{props.name}</h2>
      </div>
      <div className="CostUpg">
        <h4>Required</h4>
        <img className="ImgCookie" src="/src/assets/cookie.png" />
        <h3>: {getCost()}</h3>
      </div>
      <div className="Description">
        <p>Base CPS: {props.baseCps}</p>
        {getUpgrade(props.id) ? (
          <p>Effective CPS per: {getUpgradeCps(props.id, props.baseCps)}</p>
        ) : null}
      </div>
    </div>
  );
}
