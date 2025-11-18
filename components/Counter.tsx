'use client';
import { useState } from "react";

function Counter(props:any) {
    const [clickedTimes, setClickedTimes] = useState(0);

    function add() {
        setClickedTimes(clickedTimes + 1);
        //console.log("Counter " + clickedTimes);
        props.updateTotal();
    }

    function substract() {
        setClickedTimes(clickedTimes - 1);
        props.updateTotal();
    }

    return(
        <div>
            <h1>I have been clicked {clickedTimes} times by {props.name} </h1>
            <button onClick={add}>Add</button> <button onClick={substract}>Substract</button>
        </div>
    )
}

export default Counter;