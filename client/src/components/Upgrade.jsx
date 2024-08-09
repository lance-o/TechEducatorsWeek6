import "./ShopItem.css";
import { useState, useEffect } from 'react'

export default function Upgrade(props){
    const [count, setMyCounterState] = useState(0);

    function getCost(){
        return props.baseCost + Math.floor((props.baseCost / (10 - props.costHike)) * props.count * ((props.baseCost /  (10 - props.costHike)) * props.count * props.costHike));
    }

    function incrementCounter() {
        if(props.cookies < getCost()){
            return;
        }
        props.removeCookies(getCost());
        setMyCounterState(count + 1);
        const newUpgrade= {id: props.id, name: props.name, targetIds: props.targetIds, cpsIncrease: props.cpsIncrease, cpsMultiplier: props.cpsMultiplier, baseCost: props.baseCost, costHike: props.costHike, description:props.description, count:count + 1};
        props.getUpgradeData(newUpgrade, props.id);
    }

    useEffect(() => {
        setMyCounterState((e) => props.count);
            props.getUpgradeData(props, props.id);
        }, []);
    
    return(
        <div className="ShopItem" onClick={incrementCounter}>
            <h2 className="Count">{count}</h2>
            <div className="Title">
                <h2>{props.name}</h2>
            </div>
            <div className="CostUpg">
                <h4>Required</h4>
                <img className="ImgCookie" src="/src/assets/cookie.png"/>
                <h3>: {getCost()}</h3>
            </div>
            <div className="Description">
                <p>{props.description}</p>
            </div>
        </div>
    )
}