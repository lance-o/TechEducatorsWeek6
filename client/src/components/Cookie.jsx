import "./ShopItem.css";

export default function Cookie(props){

    return(
        <>
            <img src='/src/assets/cookie.png' onClick={props.clickCookie} className="Cookie"></img>
        </>
    )
}