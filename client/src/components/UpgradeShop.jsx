import Upgrade from './Upgrade'

// Just like building shop, but with upgrades. Structurally identical
export default function UpgradeShop(props){
    function getUpgradeData(newUpgrade, upgradeId) {
        const newUpgrades = props.upgrades;
        newUpgrades[upgradeId - 1] = newUpgrade;
        props.getUpgrades(props.upgrades);
      }
    return(
        <>
            {props.upgrades.map((upgrade) => (
                <Upgrade 
                key={upgrade.id}
                id={upgrade.id}
                name={upgrade.name}
                targetIds={upgrade.targetIds}
                cpsIncrease={upgrade.cpsIncrease}
                cpsMultiplier={upgrade.cpsMultiplier}
                baseCost={upgrade.baseCost}
                costHike={upgrade.costHike}
                description={upgrade.description}
                count={upgrade.count}
                cookies={props.cookies}
                removeCookies={props.removeCookies}
                getUpgradeData={getUpgradeData}
                />
            ))}
        </>
    )
}