import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

import tilePosition from '../data/tilePosition';

import image_7_wonders from '../public/images/games/7_wonders.png'
import image_above_and_below from '../public/images/games/above_and_below.png';
import image_article_27 from '../public/images/games/article_27.png';
import image_catan from '../public/images/games/catan.png';

export default function Home() {


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
      setMoney(money => money += this.value)
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
  ];

  class Game {
    constructor(name, releaseYear, maxPlayer, gameDuration, complexity, rating, image, category="", mechanism="") {
      this.name = name;
      this.releaseYear = releaseYear;
      this.maxPlayer = maxPlayer;
      this.gameDuration = gameDuration;
      this.complexity = complexity;
      this.rating = rating;
      this.image = image;
      //this.category = category;
      //this.mechanism = mechanism;
    }
  }

  let games = [
    new Game("7 Wonders", 2010, 7, 30, 2.32, 7.7, image_7_wonders),
    new Game("Above and Below", 2015, 4, 90, 2.53, 7.7, image_above_and_below),
    new Game("Article 27", 2012, 6, 30, 2.11, 6.4, image_article_27),
    new Game("Catan", 1995, 4, 90, 2.29, 7.1, image_catan),
  ];

  const [currentTile, setCurrentTile] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [alertActive, setAlertActive] = useState(false);
  const [rolledNumber, setRolledNumber] = useState(1);
  const [rollCount, setRollCount] = useState(0);
  const [money, setMoney] = useState(200);
  const [alertText, setAlertText] = useState("Pick a new tile");
  const [isNewTile, setIsNewTile] = useState(false);


  // Function to handle the character movement
  function moveCharacter(increment=1) {
    setCurrentTile(prevIndex => (prevIndex + increment) % tilePosition.length);
  };

  function roll() {
    const increment = Math.floor(Math.random() * 6) + 1;
    setRolledNumber(increment);
    const destinationTile = (currentTile + increment) % tilePosition.length
    setRollCount(rollCount => rollCount + 1);
    setIsMoving(true);
    setIsRolling(true);
    setTimeout(() => setIsRolling(false), 500);
    for (let i = 0; i < increment; i++) {
      setTimeout(() => moveCharacter(), i * 1000);
    };
    const timeToDestination = increment * 1000
    setTimeout(() => {tiles[destinationTile].activateTile(); setIsMoving(false);}, timeToDestination);
    if (destinationTile < currentTile) {
      //setAlertActive(true);
      setTimeout(() => setMoney(money => money + 200), timeToDestination);
    }
  }

  function pickNewTilePrompt() {
    return (
      <p className={styles.pick_new_game_title}>Pick a new tile</p>
    )
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
                  onClick={() => console.log("Clicked on tile: " + tile.index)}
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
            <button className={styles.roll_button} disabled={isMoving || alertActive} onClick={() => {roll(); console.log("Clicked")}}>Roll</button>
          </div>
          {isNewTile ?
          <div className={styles.new_tile_group}>
            <p className={styles.new_tile_text}>Click on a tile to place this game</p>
            <div className={styles.new_tile_image}>
              <Image
                src={`/images/games/7_wonders.png`} // Route of the image file
                fill
                alt="game_promo"
              />
            </div>
          </div> :
          <div className={styles.new_tile_group}>
            <p className={styles.new_tile_text}>Cost $50</p>
            <button disabled={money < 50} className={styles.new_tile_button} onClick={() => {setMoney(money => money - 50); setIsNewTile(true);}}>Buy new tile</button>
          </div>}
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
            {currentTile < 10 ? pickNewTilePrompt() : ""}
            <button className={styles.alert_close} onClick={() => {setAlertActive(false);}}>Close</button>
          </div>}
        </div>
    </div>
  );
}
