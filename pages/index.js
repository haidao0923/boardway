import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const tilePosition = [
    {top: '0', left: '0'},
    {top: '0', left: '12.5vw'},
    {top: '0', left: '25vw'},
    {top: '0', left: '37.5vw'},
    {top: '0', left: '50vw'},
    {top: '0', left: '62.5vw'},
    {top: '0', left: '75vw'},
    {top: '0', left: '87.5vw'},
    {top: '20vh', left: '87.5vw'},
    {top: '40vh', left: '87.5vw'},
    {top: '60vh', left: '87.5vw'},
    {top: '80vh', left: '87.5vw'},
    {top: '80vh', left: '75vw'},
    {top: '80vh', left: '62.5vw'},
    {top: '80vh', left: '50vw'},
    {top: '80vh', left: '37.5vw'},
    {top: '80vh', left: '25vw'},
    {top: '80vh', left: '12.5vw'},
    {top: '80vh', left: '0'},
    {top: '60vh', left: '0'},
    {top: '40vh', left: '0'},
    {top: '20vh', left: '0'}
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
      return {top: tilePosition[this.index].top,
              left: tilePosition[this.index].left}
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
  const [isMoving, setIsMoving] = useState(false);
  const money = 200;

  // Function to handle the character movement
  function moveCharacter(increment) {
    setCurrentTile(prevIndex => (prevIndex + increment) % tilePosition.length);
  };

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
          alt="Your Name"
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
        <div className={styles.character} style={tilePosition[currentTile]}>
          <Image
            src="/images/character.png" // Route of the image file
            fill
            sizes="8vw, auto"
            alt="Your Name"
          />
        </div>
        <button className={styles.roll_button} disabled={isMoving} onClick={() => {
          const increment = 3;
          setIsMoving(true);
          for (let i = 0; i < increment; i++) {
            setTimeout(() => moveCharacter(1), i * 1000);
          };
          setTimeout(() => setIsMoving(false), 3000);
          }}>Roll</button>
    </div>
  );
}
