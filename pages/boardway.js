import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import about_styles from '../styles/About.module.css';

import { useState } from 'react';
import tilePosition from '../data/tilePosition';


export default function BoardWay() {
  const [currentTile, setCurrentTile] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [alertActive, setAlertActive] = useState(false);
  const [rolledNumber, setRolledNumber] = useState(1);
  const [rollCount, setRollCount] = useState(0);
  const [alertText, setAlertText] = useState("Pick a new tile");
  const [description, setDescription] = useState("This is a test");

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
      return;
    }

  }

  const [tiles, setTiles] = useState([
    new Tile(0, null),
    new Tile(1, null),
    new Tile(2, null),
    new Tile(3, null),
    new Tile(4, null),
    new Tile(5, null),
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
    setTimeout(() => {tiles[destinationTile].activateTile(currentEvents); setIsMoving(false);}, timeToDestination);
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
            <button className={styles.roll_button} disabled={isMoving || alertActive} onClick={() => {roll(); console.log("Clicked")}}>Roll</button>
          </div>
          <p className={styles.title_text}>{`My Workflow`}</p>
          <div className={about_styles.description_group}>
            <p className={about_styles.description_text}>{description}</p>
            <div className={about_styles.description_image}>
                <Image
                  src={"/images/games/7_wonders.png"} // Route of the image file
                  fill
                  alt="game_promo"
                />
            </div>
          </div>
          <Link className={styles.about_link} href="/">Return to game</Link>
          <p className={styles.roll_count}>{`Roll #${rollCount + 1}`}</p>
        </div>
    </div>
  );
}
