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
      console.log(`Activated tile ${this.index}`)
      return 1;
    }

  }

  let tiles = [
    new Tile(0, "A"),
    new Tile(1, "B"),
    new Tile(2, "C"),
    new Tile(3, "D"),
    new Tile(4, "A"),
    new Tile(5, "B"),
    new Tile(6, "C"),
    new Tile(7, "D"),
    new Tile(8, "A"),
    new Tile(9, "B"),
    new Tile(10, "C"),
    new Tile(11, "D"),
    new Tile(12, "D"),
    new Tile(13, "D"),
    new Tile(14, "D"),
    new Tile(15, "D"),
    new Tile(16, "D"),
    new Tile(17, "D"),
    new Tile(18, "D"),
    new Tile(19, "D"),
    new Tile(20, "D"),
    new Tile(21, "D"),

  ]

  const [currentTile, setCurrentTile] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [rolledNumber, setRolledNumber] = useState(1);
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
    for (let i = 0; i < increment; i++) {
      setTimeout(() => moveCharacter(), i * 1000);
    };
    const timeToDestination = increment * 1000
    setTimeout(() => tiles[destinationTile].activateTile(), timeToDestination);
    setTimeout(() => setIsRolling(false), 500);
    setTimeout(() => setIsMoving(false), timeToDestination);
  }

  return (
    <div>
       <Head>
          <title>Boardway</title>
          <link rel="icon" href="/images/background.png" />
        </Head>
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
                <p className={styles.tile_text}>Dead of Winter</p>
                <p className={styles.tile_text}>Value: $200</p>
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
          <button disabled={isMoving} onClick={() => {roll(); console.log("Clicked")}}>Roll</button>
        </div>
        <p className={styles.money_text}>{`Money: \$${money}`}</p>
    </div>
  );
}
