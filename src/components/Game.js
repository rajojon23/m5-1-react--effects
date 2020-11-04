import React, { useEffect, useState}  from "react";
import useInterval from "../hooks/use-interval.hook";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from "./Item";
import {useDocTitle} from "./useDocTitle";
import {useKeyDown} from "./useKeyDown";


import cookieSrc from "../cookie.svg";



const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
  
];





let number = 99;
const Game = () => {
  // TODO: Replace this with React state!
  let [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });
  let [numCookies, setNumCookies] = useState(number);
  


  useEffect(() => {
    increaseCookies();
    console.log("cookie increase");

  }, [setNumCookies ]);

  useEffect(() => {
    console.log("item increase");


  }, [setPurchasedItems ]);



  const increaseCookies = () =>{
    setNumCookies(numCookies++);
  };

  //custom Hooks
  useDocTitle(`${numCookies} cookies`, increaseCookies );
  // useKeyDown(32, increaseCookies);

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    console.log("cookies should increase");
    setNumCookies(numCookies+numOfGeneratedCookies);
  }, 1000);




    const handleClick = (itemName, owned) => {

      // let itemUpdate = {...purchasedItems, itemName: owned }; this was suggested but won't work, the state setter will literally take the name of the variable and not its value 
      let itemUpdate = purchasedItems;

      console.log("numCookies", numCookies);

      let itemFound = items.find(item => item.id === itemName);


      if(itemFound.cost <= numCookies){
        setNumCookies(numCookies-itemFound.cost);
        itemUpdate[itemName]++;
        setPurchasedItems({...itemUpdate});
      }
      else{
        alert("not enough cookies!");
      }

      
      
      
      
    }

    const calculateCookiesPerTick = (purchasedItems) =>{
      let total = 0;
      items.forEach((item)=>{
        total += purchasedItems[item.id]*item.value;
      });

      return total;
    }

    let cookiesPerSec = calculateCookiesPerTick(purchasedItems);//

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: 
            This ONLY works because useInterval is called each 1 second
          */}
          <strong>{cookiesPerSec}</strong> cookies per second
        </Indicator>
        <Button onClick={increaseCookies}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {/* TODO: Add <Item> instances here, 1 for each item type. */}
        {Object.entries(purchasedItems).map((item, index) => (
            
              /*<Item key={item.id} numOwned={item.value} itemID={item.id}  handleClick={handleClick}></Item>*/
              <Item key={item}  numOwned={item[1]} itemID={item[0]}  handleClick={handleClick} itemIndex={index} items={items}  ></Item>
          ))}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
