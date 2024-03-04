import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const tilePosition = [
    {top: 0, left: 0},
    {top: 0, left: 12.5},
    {top: 0, left: 25},
    {top: 0, left: 37.5},
    {top: 0, left: 50},
    {top: 0, left: 62.5},
    {top: 0, left: 75},
    {top: 0, left: 87.5},
    {top: 20, left: 87.5},
    {top: 40, left: 87.5},
    {top: 60, left: 87.5},
    {top: 80, left: 87.5},
    {top: 80, left: 75},
    {top: 80, left: 62.5},
    {top: 80, left: 50},
    {top: 80, left: 37.5},
    {top: 80, left: 25},
    {top: 80, left: 12.5},
    {top: 80, left: 0},
    {top: 60, left: 0},
    {top: 40, left: 0},
    {top: 20, left: 0}
  ]

  class Tile {
    index;
    name;
    value;

    constructor(index, name, value=0) {
      this.index = index;
      this.name = name;
      this.value = value;
    }

    getStyle() {
      return {top: tilePosition[this.index].top + 'vh',
              left: tilePosition[this.index].left + 'vw'}
    }

    activateTile() {
      console.log(`Activated tile ${this.index}`);
      setAlertActive(true);
      return 1;
    }

  }

  let tiles = [
    new Tile(0, "Go ---->"),
    new Tile(1, "Empty"),
    new Tile(2, "C", 3),
    new Tile(3, "Empty"),
    new Tile(4, "Empty"),
    new Tile(5, "Empty"),
    new Tile(6, "Empty"),
    new Tile(7, "Empty"),
    new Tile(8, "Empty"),
    new Tile(9, "Empty"),
    new Tile(10, "Empty"),
    new Tile(11, "Empty"),
    new Tile(12, "Empty"),
    new Tile(13, "Empty"),
    new Tile(14, "Empty"),
    new Tile(15, "Empty"),
    new Tile(16, "Empty"),
    new Tile(17, "Empty"),
    new Tile(18, "Empty"),
    new Tile(19, "Empty"),
    new Tile(20, "Empty"),
    new Tile(21, "Empty"),

  ]

  const [currentTile, setCurrentTile] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [alertActive, setAlertActive] = useState(false);
  const [rolledNumber, setRolledNumber] = useState(1);
  const [rollCount, setRollCount] = useState(0);
  const [money, setMoney] = useState(200);

  // Function to handle the character movement
  function moveCharacter(increment=1) {
    setCurrentTile(prevIndex => (prevIndex + increment) % tilePosition.length);
  };

  function roll() {
    const increment = Math.floor(Math.random() * 6) + 1;
    setRolledNumber(increment);
    const destinationTile = (currentTile + increment) % tilePosition.length
    setIsMoving(true);
    setIsRolling(true);
    setTimeout(() => setIsRolling(false), 500);
    for (let i = 0; i < increment; i++) {
      setTimeout(() => moveCharacter(), i * 1000);
    };
    const timeToDestination = increment * 1000
    setTimeout(() => tiles[destinationTile].activateTile(), timeToDestination);
    if (destinationTile < currentTile) {
      setTimeout(() => setMoney(money + 200), timeToDestination);
    }
  }

  return (
    <div>
       <Head>
          <title>Boardway</title>
          <link rel="icon" href="/images/background.png" />
        </Head>
        <div className={styles.body}>
          <Image
            className={styles.background}
            src="/images/background.png" // Route of the image file
            fill
            alt="background"
          />
          <div className={styles.board}>
            {tiles.map((tile, index) => (
                <div
                  key={index}
                  className={styles.tile}
                  style={tile.getStyle()}
                >
                  <p className={styles.tile_text}>{tile.name}</p>
                  {tile.value != 0 ? <p className={styles.tile_text}>{`Value: \$${tile.value}`}</p> : <></>}
                </div>
              ))}
          </div>
          <div className={styles.character} style={{top: tilePosition[currentTile].top + 2 + 'vh', left: tilePosition[currentTile].left + 2.25 + 'vw'}}>
            <Image
              src={currentTile > 10 ? "/images/character_reversed.png" : "/images/character.png"} // Route of the image file
              fill
              alt="character"
            />
          </div>

          <div className={styles.roll_group}>
            <div className={`${styles.dice_image} ${isRolling ? styles.rotateAnimation : ''}`}>
              <Image
                src={`/images/dice/${rolledNumber}.png`} // Route of the image file
                fill
                alt="dice"
              />
            </div>
            <button className={styles.roll_button} disabled={isMoving} onClick={() => {roll(); console.log("Clicked")}}>Roll</button>
          </div>
          <p className={styles.title_text}>{`BoardWay`}</p>
          <p className={styles.roll_count}>{`Roll #${rollCount + 1}`}</p>
          <p className={styles.money_text}>{`Money: \$${money}`}</p>
          {alertActive && <div className={styles.alert_container}>
            <div className={styles.alert}>
                <Image
                  src={`/images/alert.png`} // Route of the image file
                  fill
                  alt="dice"
                />
            </div>
            <p className={styles.alert_text}>You completed a loop and earned $200</p>
            <button className={styles.alert_close} onClick={() => {setAlertActive(false); setIsMoving(false); setRollCount(rollCount => rollCount + 1);}}>Close</button>
          </div>}
        </div>
    </div>
  );
}
