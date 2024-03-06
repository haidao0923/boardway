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
  class Event { // Upon passing the midpoint, user is presented one of three events
    multiplier; // How much to multiply the value
    additive; // How much to add to the value
    category; // Duration, Complexity, Rating, etc...
    category_amount; // what is the numerical value that is compared
    category_type; // LESS_THAN, GREATER_THAN, EQUAL
    duration; // Number of rolls

    static generateRandomEvent() {
      if (Math.floor(Math.random()) * 2 == 0) {
        this.multiplier = Math.random() / 2
      }
    }
  }

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

      this.value = gameDuration;
    }
  }

  let games = [
    new Game("7 Wonders", 2010, 7, 30, 2.32, 7.7, image_7_wonders),
    new Game("Above and Below", 2015, 4, 90, 2.53, 7.7, image_above_and_below),
    new Game("Article 27", 2012, 6, 30, 2.11, 6.4, image_article_27),
    new Game("Catan", 1995, 4, 90, 2.29, 7.1, image_catan),
  ];

  class Tile {

    constructor(index, game) {
      this.index = index;
      this.game = game;
    }

    getStyle() {
      return {top: tilePosition[this.index].top + 'vh',
              left: tilePosition[this.index].left + 'vw'}
    }

    activateTile() {
      console.log(`Activated tile ${this.index}`);
      //setAlertActive(true);
      if (this.game != null) {
        setMoney(money => money += this.game.value)
      }
      return 1;
    }

  }

  const [tiles, setTiles] = useState([
    new Tile(0, null),
    new Tile(1, null),
    new Tile(2, games[0]),
    new Tile(3, null),
    new Tile(4, null),
    new Tile(5, games[1]),
    new Tile(6, null),
    new Tile(7, null),
    new Tile(8, null),
    new Tile(9, null),
    new Tile(10, null),
    new Tile(11, null),
    new Tile(12, null),
    new Tile(13, null),
    new Tile(14, null),
    new Tile(15, null),
    new Tile(16, null),
    new Tile(17, null),
    new Tile(18, null),
    new Tile(19, null),
    new Tile(20, null),
    new Tile(21, null),
  ]);

  const [currentTile, setCurrentTile] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [alertActive, setAlertActive] = useState(false);
  const [rolledNumber, setRolledNumber] = useState(1);
  const [rollCount, setRollCount] = useState(0);
  const [money, setMoney] = useState(200);
  const [alertText, setAlertText] = useState("Pick a new tile");
  const [isNewTile, setIsNewTile] = useState(false);
  const [newGame, setNewGame] = useState(null);
  const [passedEvent, setPassedEvent] = useState(false);
  const [currentEvents, setCurrentEvents] = useState([])

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
      setTimeout(() => {setMoney(money => money + 200); setAlertActive(true); setAlertText("You passed GO and earned $200!");}, timeToDestination);
    }
    if (currentTile < 11 && destinationTile >= 11) {
      setTimeout(() => {setPassedEvent(true); setAlertActive(true); setAlertText("Pick an event")}, timeToDestination);
    }
  }

  function getNewGame() {
    return games[Math.floor(Math.random() * games.length)]
  }

  function placeTile(index) {
    setIsNewTile(false);
    let newTiles = [...tiles];
    newTiles[index].game = newGame;
    setTiles(newTiles);
    setNewGame(null);
  }

  function passedEventDisplay() {
    return (
      <div>
        <button className={styles.event_choice_1} onClick={() => {setPassedEvent(false); setAlertActive(false);}}>Close</button>
        <button className={styles.event_choice_2} onClick={() => {setPassedEvent(false); setAlertActive(false);}}>Close</button>
        <button className={styles.event_choice_3} onClick={() => {setPassedEvent(false); setAlertActive(false);}}>Close</button>
      </div>
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
                  className={index == 0 ? styles.start_tile : index == 11 ? styles.event_tile : tile.game == null ? styles.empty_tile : styles.tile}
                  style={tile.getStyle()}
                  // Make tile index 0, 7, 11, 18 not clickable
                  onClick={index == 0 || index == 11 ? null : () => {console.log("Clicked on tile: " + tile.index); placeTile(tile.index); console.log(tiles); console.log(newGame)}}
                >
                  {index == 0 && <p className={styles.tile_text}>{"Go --------->"}<br></br><br></br>Pass Go Earn $200</p>}
                  {index == 11 && <p className={styles.tile_text}>{"<--------- Event"}<br></br><br></br>Pass Event to choose a new event</p>}
                  {tile.game != null ? <p className={styles.tile_text}>{tile.game.name}</p> : index != 0 && index != 11 ? <p className={styles.tile_text}>Empty</p> : null}
                  {tile.game != null ? <p className={styles.tile_text}>{`Value: \$${tile.game.value}`}</p> : <></>}
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
            <button className={styles.roll_button} disabled={isMoving || alertActive || isNewTile} onClick={() => {roll(); console.log("Clicked")}}>Roll</button>
          </div>
          {isNewTile ?
          <div className={styles.new_tile_group}>
            <p className={styles.new_tile_text}>Click on a tile to place this game</p>
            <div className={styles.new_tile_image}>
              <Image
                src={newGame.image} // Route of the image file
                fill
                alt="game_promo"
              />
            </div>
          </div> :
          <div className={styles.new_tile_group}>
            <p className={styles.new_tile_text}>Cost $50</p>
            <button disabled={isMoving || alertActive || isNewTile || money < 50} className={styles.new_tile_button} onClick={() => {setMoney(money => money - 50); setIsNewTile(true); setNewGame(getNewGame())}}>Buy new tile</button>
          </div>}
          <p className={styles.title_text}>{`BoardWay`}</p>
          <p className={styles.roll_count}>{`Roll #${rollCount + 1}`}</p>
          <p className={styles.money_text}>{`Money: \$${money}`}</p>
          {alertActive && <div className={styles.alert_container}>
            <div className={styles.alert}>
                <Image
                  src={`/images/alert.png`} // Route of the image file
                  fill
                  alt="alert_box"
                />
            </div>
            <p className={styles.alert_text}>{alertText}</p>
            {passedEvent ? passedEventDisplay() :
            <button className={styles.alert_close} onClick={() => {setAlertActive(false);}}>Close</button>}

          </div>}
        </div>
    </div>
  );
}
