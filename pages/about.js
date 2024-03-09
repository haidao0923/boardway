import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import about_styles from '../styles/About.module.css';

import { useState } from 'react';
import tilePosition from '../data/tilePosition';


export default function About() {
  const [currentTile, setCurrentTile] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [alertActive, setAlertActive] = useState(false);
  const [rolledNumber, setRolledNumber] = useState(1);
  const [rollCount, setRollCount] = useState(0);
  const [alertText, setAlertText] = useState("Pick a new tile");
  const [description, setDescription] = useState("This is a test");

  class Tile {
    constructor(index, name) {
      this.index = index;
      this.name = name;
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
    new Tile(0, "Motivation"),
    new Tile(1, "Brainstorm"),
    new Tile(2, "Iteration 1"),
    new Tile(3, "Draft 1"),
    new Tile(4, "Draft 2"),
    new Tile(5, "Tool"),
    new Tile(6, "Process 1"),
    new Tile(7, "Process 2"),
    new Tile(8, "Process 3"),
    new Tile(9, "Process 4"),
    new Tile(10, "Process 5"),
    new Tile(11, "Process 5.1"),
    new Tile(12, "Iteration 2"),
    new Tile(13, "Inspiration 2"),
    new Tile(14, "Iteration 3"),
    new Tile(15, "Inspiration 3"),
    new Tile(16, "Process 6"),
    new Tile(17, "Process 6.1"),
    new Tile(18, "Data Collection"),
    new Tile(19, "Alternative Draft"),
    new Tile(20, "Rubric"),
    new Tile(21, "Conclusion"),
  ]);

  // Function to handle the character movement
  function moveCharacter(increment=1) {
    setCurrentTile(prevIndex => (prevIndex + increment) % tilePosition.length);
  };

  function roll() {
    const increment = 1;
    setRolledNumber(increment);
    setRollCount(rollCount => rollCount + 1);
    setIsMoving(true);
    setIsRolling(true);
    setTimeout(() => setIsRolling(false), 500);
    for (let i = 0; i < increment; i++) {
      setTimeout(() => moveCharacter(), i * 1000);
    };
    const timeToDestination = increment * 1000
    setTimeout(() => setIsMoving(false), timeToDestination);
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
                  className={styles.about_tile}
                  style={tile.getStyle()}
                >
                  {index == 0 && <p className={styles.tile_text}>{"Go --------->"}<br></br><br></br>{tile.name}</p>}
                  {index == 11 && <p className={styles.tile_text}>{"<--------- Keep Going"}<br></br><br></br>{tile.name}</p>}
                  {index != 0 && index != 11 ? <p className={styles.tile_text}>{tile.name}</p> : null}
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
          <div className={styles.title_group}>
            <p className={styles.title_text}>{`My Workflow`}</p>
            <Link className={styles.about_link} href="/">Return to game</Link>
          </div>
          <div className={about_styles.description_group} style={{width: isRolling ? "0" : "max(14vw, 30vh)", height: isRolling ? "0" : "max(14vw, 30vh)"}}>
            <div className={about_styles.description_image}>
                <Image
                  src={`/images/about/${currentTile}.png`} // Route of the image file
                  fill
                  alt="game_promo"
                />
            </div>
          </div>
          <p className={styles.roll_count}>{`Roll #${rollCount + 1}`}</p>
        </div>
    </div>
  );
}
