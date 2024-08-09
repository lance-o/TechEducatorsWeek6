import Building from "./Building";

// Handles the purchasing of buildings. 
export default function BuildingShop(props) {
    // Hey, this is ugly.
    // Basically, writes new building in whenever one is bought.
    // Includes prices, etc.
  function getBuildingData(newBuilding, buildingId) {
    const newBuildings = props.buildings;
    newBuildings[buildingId - 1] = newBuilding;
    props.getBuildings(props.buildings);
  }
  return (
    <>
        {props.buildings.map((building) => (
          <Building
            key={building.id}
            id={building.id}
            name={building.name}
            baseCps={building.baseCps}
            baseCost={building.baseCost}
            costHike={building.costHike}
            count={building.count}
            cookies={props.cookies}
            removeCookies={props.removeCookies}
            upgrades={props.upgrades}
            getBuildingData={getBuildingData}
          />
        ))}
    </>
  );
}
