import React, { useEffect, useState, useRef }  from "react";
import styled from "styled-components";

const Item = ({numOwned,itemID, handleClick, itemIndex, items}) =>{

    const itemButton = useRef(null);
    // console.log("numOwned,", numOwned );
    let itemFound = items.find(item => item.id === itemID);

    let frequency = "cookies/second";
    let value = itemFound.value;
    if(itemFound.id === "megacursor"){
        frequency = "cookies/click";
        value = itemFound.clickAdd;
    }

    // console.log("itemFound received",itemFound);

    useEffect(() => {
        if(itemIndex === 0){
            itemButton.current.focus();
            
        }
    }, []);



    return <Wrapper onClick={() => handleClick(itemID, numOwned)}  ref={itemButton}>
        <ItemData>
            <Name>{itemFound.name}</Name>
            <Details>Cost: {itemFound.cost} cookie(s). Produces {value} {frequency}</Details>
            {/* <Details>Cost: 10 cookie(s).Produces 1 cookies/second</Details> */}
        </ItemData>
        <ItemCount>
            {numOwned}
        </ItemCount>
    </Wrapper>

}


const Wrapper = styled.button`
    text-decoration: none;
    background: none;
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid gray;
    color: #fff;
`;

const Name = styled.div`
    font-weight: bold;
    text-align: left;
`;

const Details = styled.div`
    font-size: 12px;
`;
const ItemData = styled.div`
    margin-right: 20px;
`;
const ItemCount = styled.div`
    font-size: 30px;
    font-weight: bold;
`;

export default Item;