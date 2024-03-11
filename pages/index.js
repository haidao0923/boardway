import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import tilePosition from '../data/tilePosition';

import image_7_wonders from '../public/images/games/7_wonders.png'
import image_above_and_below from '../public/images/games/above_and_below.png';
import image_article_27 from '../public/images/games/article_27.png';
import image_avalon from '../public/images/games/avalon.png';
import image_bears_vs_babies from '../public/images/games/bears_vs_babies.png';
import image_betrayal from '../public/images/games/betrayal.png';
import image_blue_moon_city from '../public/images/games/blue_moon_city.png';
import image_brass_birmingham from '../public/images/games/brass_birmingham.png';
import image_carcassonne from '../public/images/games/carcassonne.png';
import image_cashflow from '../public/images/games/cashflow.png';
import image_catan from '../public/images/games/catan.png';
import image_clank from '../public/images/games/clank.png';
import image_codenames from '../public/images/games/codenames.png';
import image_codenames_pictures from '../public/images/games/codenames_pictures.png';
import image_concept from '../public/images/games/concept.png';
import image_cosmic_encounter from '../public/images/games/cosmic_encounter.png';
import image_coup from '../public/images/games/coup.png';
import image_dead_of_winter from '../public/images/games/dead_of_winter.png';
import image_dominion from '../public/images/games/dominion.png';
import image_fantasy_realms from '../public/images/games/fantasy_realms.png';
import image_formula_d from '../public/images/games/formula_d.png';
import image_harry_potter from '../public/images/games/harry_potter.png';
import image_head_trip from '../public/images/games/head_trip.png';
import image_jaipur from '../public/images/games/jaipur.png';
import image_just_one from '../public/images/games/just_one.png';
import image_kanagawa from '../public/images/games/kanagawa.png';
import image_kemet from '../public/images/games/kemet.png';
import image_king_of_tokyo from '../public/images/games/king_of_tokyo.png';
import image_kumo_hogosha from '../public/images/games/kumo_hogosha.png';
import image_mascarade from '../public/images/games/mascarade.png';
import image_modern_art from '../public/images/games/modern_art.png';
import image_monopoly from '../public/images/games/monopoly.png';
import image_munchkin from '../public/images/games/munchkin.png';
import image_pandemic from '../public/images/games/pandemic.png';
import image_power_grid from '../public/images/games/power_grid.png';
import image_puerto_rico from '../public/images/games/puerto_rico.png';
import image_race_for_the_galaxy from '../public/images/games/race_for_the_galaxy.png';

export default function Home() {

  const [currentTile, setCurrentTile] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [alertActive, setAlertActive] = useState(false);
  const [rolledNumber, setRolledNumber] = useState(1);
  const [rollCount, setRollCount] = useState(0);
  const [money, setMoney] = useState(200);
  const [moneyModifier, setMoneyModifier] = useState(0);
  const [alertText, setAlertText] = useState("Pick a new tile");
  const [infoPanelActive, setInfoPanelActive] = useState(false);
  const [infoPanelText, setInfoPanelText] = useState(<><p>This is a placeholder text</p><p>Test morefdsfsd</p></>);
  const [isNewTile, setIsNewTile] = useState(false);
  const [newGame, setNewGame] = useState(null);
  const [passedEvent, setPassedEvent] = useState(false);
  const [currentEvents, setCurrentEvents] = useState([])
  const [event1, setEvent1] = useState(null);
  const [event2, setEvent2] = useState(null);
  const [event3, setEvent3] = useState(null);

  const CATEGORY_TYPE = {
    LESS_THAN: "<",
    GREATER_THAN: ">",
    EQUAL: "="
  };

  const GAME_CATEGORY = { // TODO: Dynamically render array
    RELEASE_YEAR: {name: "RELEASE_YEAR", value: [1990, 1995, 2000, 2005, 2010, 2015]},
    MAX_PLAYER: {name: "MAX_PLAYER", value: [2,3,4,5,6,7,8,9,10]},
    GAME_DURATION: {name: "GAME_DURATION", value: [30, 45, 60, 90]},
    COMPLEXITY: {name: "COMPLEXITY", value: [1,1.5,2,2.5,3,3.5,4,4.5]},
    RATING: {name: "RATING", value: [3,4,5,6,7,8,9]}
  };

  class Event { // Upon passing the midpoint, user is presented one of three events
    multiplier; // How much to multiply the value
    additive; // How much to add to the value
    category; // Duration, Complexity, Rating, etc...
    category_amount; // what is the numerical value that is compared
    category_type; // LESS_THAN, GREATER_THAN, EQUAL
    duration; // Number of rolls

    constructor() {
      this.generateRandomEvent();
    }

    generateRandomEvent() {
      let random_number = Math.floor(Math.random() * 4);
      switch (random_number) {
      case 0: // x0.5 (halved)
        this.multiplier = 0.5;
        this.additive = 0;
        break;
      case 1: // x2 (doubled)
        this.multiplier = 2;
        this.additive = 0;
        break;
      case 2: // Lose $5-$50
        this.additive = -(Math.floor(Math.random() * 10) + 1 * 5);
        this.multiplier = 1;
        break;
      case 3: // Gain $5-$50
        this.additive = (Math.floor(Math.random() * 10) + 1 * 5);
        this.multiplier = 1;
        break;
      default:
        break;
      };

      random_number = Math.floor(Math.random() * Object.keys(GAME_CATEGORY).length);
      const categoryKey = Object.keys(GAME_CATEGORY)[random_number];
      this.category = GAME_CATEGORY[categoryKey];

      this.category_amount = this.category["value"][Math.floor(Math.random() * this.category["value"].length)];

      random_number = Math.floor(Math.random() * 3);
      switch (random_number) {
      case 0:
        this.category_type = CATEGORY_TYPE.LESS_THAN;
        break;
      case 1:
        this.category_type = CATEGORY_TYPE.GREATER_THAN;
        break;
      case 2:
        this.category_type = CATEGORY_TYPE.EQUAL;
        break;
      default:
        break;
      }

      this.duration = Math.floor(Math.random() * 5) + 3 // 3 to 7 rolls
    }

    getText() {
      const modifier = this.multiplier == 2 ? "doubled" : this.multiplier == 0.5 ? "halved" : this.additive > 0 ? `worth \$${this.additive} more` : this.additive < 0 ? `worth \$${-this.additive} less` : "undefined"
      return `Tiles with ${this.category["name"]} ${this.category_type} ${this.category_amount} are ${modifier} for ${this.duration} rolls`;
    }

    triggerEvent(tile, moneyToGain) {
      this.duration -= 1;
      if (this.duration == 0) {
        setCurrentEvents(currentEvents => currentEvents.filter(event => event !== this));
      }
      console.log("Triggered Event " + this.getText());
      console.log(tile);
      if (tile.game == null) {
        return 0;
      }

      switch (this.category) {
      case GAME_CATEGORY.RELEASE_YEAR:
        console.log("Trigger 1");
        if (this.triggerEventHelper(tile.game.releaseYear, this.category_type, this.category_amount)) {
          moneyToGain *= this.multiplier;
          moneyToGain += this.additive;
        }
        break;
      case GAME_CATEGORY.MAX_PLAYER:
        console.log("Trigger 2");
        if (this.triggerEventHelper(tile.game.maxPlayer, this.category_type, this.category_amount)) {
          moneyToGain *= this.multiplier;
          moneyToGain += this.additive;
        }
        break;
      case GAME_CATEGORY.GAME_DURATION:
        console.log("Trigger 3");
        if (this.triggerEventHelper(tile.game.gameDuration, this.category_type, this.category_amount)) {
          moneyToGain *= this.multiplier;
          moneyToGain += this.additive;
        }
        break;
      case GAME_CATEGORY.COMPLEXITY:
        console.log("Trigger 4");
        if (this.triggerEventHelper(tile.game.complexity, this.category_type, this.category_amount)) {
          moneyToGain *= this.multiplier;
          moneyToGain += this.additive;
        }
        break;
      case GAME_CATEGORY.RATING:
        console.log("Trigger 5");
        if (this.triggerEventHelper(tile.game.rating, this.category_type, this.category_amount)) {
          moneyToGain *= this.multiplier;
          moneyToGain += this.additive;
        }
        break;
      }
      console.log("Hi there!");
      return moneyToGain;
    }

    triggerEventHelper(tileCategory, eventCategoryType, eventCategoryAmount) {
      switch (eventCategoryType) {
      case CATEGORY_TYPE.LESS_THAN:
        console.log(`Trigger 6 ${tileCategory} : ${eventCategoryAmount}`);
        if (tileCategory < eventCategoryAmount) {
          console.log("True");
          return true;
        }
        return false;
      case CATEGORY_TYPE.GREATER_THAN:
        console.log(`Trigger 7 ${tileCategory} : ${eventCategoryAmount}`);
        if (tileCategory > eventCategoryAmount) {
          console.log("True");
          return true;
        }
        return false;
      case CATEGORY_TYPE.EQUAL:
        console.log(`Trigger 8 ${tileCategory} : ${eventCategoryAmount}`);
        if (tileCategory == eventCategoryAmount) {
          console.log("True");
          return true;
        }
        return false;
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
    new Game("Avalon", 2012, 10, 30, 1.74, 7.5, image_avalon),
    new Game("Bears vs Babies", 2017, 5, 20, 1.24, 5.4, image_bears_vs_babies),
    new Game("Betrayal", 2022, 6, 60, 2.32, 7.4, image_betrayal),
    new Game("Blue Moon City", 2006, 4, 40, 2.29, 7.0, image_blue_moon_city),
    new Game("Brass: Birmingham", 2018, 4, 90, 3.88, 8.6, image_brass_birmingham),
    new Game("Carcassonne", 2000, 5, 40, 1.89, 7.4, image_carcassonne),
    new Game("Cashflow", 1996, 6, 180, 2.13, 5.2, image_cashflow),
    new Game("Catan", 1995, 4, 90, 2.29, 7.1, image_catan),
    new Game("Clank", 2016, 4, 45, 2.23, 7.8, image_clank),
    new Game("Codenames", 2015, 8, 15, 1.26, 7.5, image_codenames),
    new Game("Codenames: Pictures", 2016, 8, 15, 1.24, 7.2, image_codenames_pictures),
    new Game("Concept", 2013, 12, 40, 1.37, 6.8, image_concept),
    new Game("Cosmic Encounter", 2008, 5, 90, 2.58, 7.5, image_cosmic_encounter),
    new Game("Coup", 2012, 6, 15, 1.41, 7.0, image_coup),
    new Game("Dead of Winter", 2014, 5, 90, 3.01, 7.5, image_dead_of_winter),
    new Game("Dominion", 2008, 4, 30, 2.35, 7.6, image_dominion),
    new Game("Fantasy Realms", 2017, 6, 20, 1.81, 7.5, image_fantasy_realms),
    new Game("Formula D", 2008, 10, 60, 1.98, 7.0, image_formula_d),
    new Game("Harry Potter: Hogwarts Battle", 2016, 4, 45, 2.07, 7.4, image_harry_potter),
    new Game("Head Trip", 2023, 10, 45, 1.50, 5.7, image_head_trip),
    new Game("Jaipur", 2009, 2, 30, 1.47, 7.5, image_jaipur),
    new Game("Just One", 2018, 7, 40, 1.04, 7.6, image_just_one),
    new Game("Kanagawa", 2016, 4, 45, 2.00, 7.0, image_kanagawa),
    new Game("Kemet", 2012, 5, 105, 3.00, 7.7, image_kemet),
    new Game("King of Tokyo", 2011, 6, 30, 1.49, 7.1, image_king_of_tokyo),
    new Game("KUMO Hogosha", 2015, 4, 30, 2.23, 6.6, image_kumo_hogosha),
    new Game("Mascarade", 2013, 13, 30, 1.53, 6.6, image_mascarade),
    new Game("Modern Art", 1992, 5, 45, 2.29, 7.5, image_modern_art),
    new Game("Monopoly", 1935, 8, 120, 1.62, 4.4, image_monopoly),
    new Game("Munchkin", 2001, 6, 90, 1.81, 5.9, image_munchkin),
    new Game("Pandemic", 2008, 4, 45, 2.40, 7.5, image_pandemic),
    new Game("Power Grid", 2004, 6, 120, 3.25, 7.8, image_power_grid),
    new Game("Puerto Rico", 2011, 5, 120, 3.26, 8.3, image_puerto_rico),
    new Game("Race for the Galaxy", 2007, 4, 45, 2.99, 7.7, image_race_for_the_galaxy),
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

    activateTile(currentEvents) {
      console.log(`Activated tile ${this.index}`);
      console.log(`Current Event: ${currentEvents}`);

      let moneyToGain = this.game != null ? this.game.value : 0;
      for (let i = 0; i < currentEvents.length; i++) {
        console.log(`Event duration before: ${currentEvents[i].duration}`);
        console.log(`Old money to gain: ${moneyToGain}`);
        moneyToGain = currentEvents[i].triggerEvent(this, moneyToGain);
        console.log(`New money to gain: ${moneyToGain}`);
        console.log(`Event duration after: ${currentEvents[i].duration}`);
      }
      setMoneyModifier(moneyModifier => moneyModifier + moneyToGain);
      setMoney(money => money += moneyToGain)
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

  function displayCurrentEvents() {
    setInfoPanelActive(true);
    console.log(currentEvents.length);
    let eventJSX = <p>You have no active events</p>;
    if (currentEvents.length > 0) {
      eventJSX = currentEvents.map((e, index) => (
        <p>{e.getText()}</p>
      ))
    }
    setInfoPanelText(
    <div>
      {eventJSX}
    </div>
    )
  }

  function displayTileInfo(game_input) {
    let game = game_input;
    if (typeof game == 'number') {
      game = tiles[game].game;
    }

    if (game == null) {
      setInfoPanelActive(false);
      return;
    }
    setInfoPanelActive(true);
    console.log(currentEvents.length);
    let tileJSX = (
    <>
    <p className={styles.game_name_display}>{game.name}</p>
    <div className={styles.game_info_display_group}>
      <div className={styles.column}>
        <p>{`Release Year: ${game.releaseYear}`}</p>
        <p>{`Max Player: ${game.maxPlayer}`}</p>
        <p>{`Game Length: ${game.gameDuration}`}</p>
      </div>
      <div className={styles.column}>
        <p>{`Complexity: ${game.complexity}`}</p>
        <p>{`Rating: ${game.rating}`}</p>
        <p>{`Base Value: ${game.gameDuration}`}</p>
      </div>
    </div>
    </>

    );
    setInfoPanelText(<>{tileJSX}</>)
  }

  // Function to handle the character movement
  function moveCharacter(increment=1) {
    setCurrentTile(prevIndex => (prevIndex + increment) % tilePosition.length);
  };

  useEffect(() => {
    if (moneyModifier !== 0) {
      const timer = setTimeout(() => {
        setMoneyModifier(0);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [moneyModifier]);

  useEffect(() => {
    setInfoPanelActive(false);
  }, [alertActive])

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
    if (destinationTile < currentTile) {
      setTimeout(() => {setMoneyModifier(moneyModifier => moneyModifier + 200); setMoney(money => money + 200); setAlertActive(true); setAlertText("You passed GO and earned $200!");}, timeToDestination);
    }
    if (currentTile < 11 && destinationTile >= 11) {
      setEvent1(new Event());
      setEvent2(new Event());
      setEvent3(new Event());
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

  const handleEventClick = (event) => {
    // Update the currentEvents array with the selected event
    setCurrentEvents(prevEvents => [...prevEvents, event]);
    // Reset any other states if needed
    setPassedEvent(false);
    setAlertActive(false);
  };

  function passedEventDisplay() {
    return (
      <div>
        <button className={styles.event_choice_1} onClick={() => {handleEventClick(event1);}}>{event1.getText()}</button>
        <button className={styles.event_choice_2} onClick={() => {handleEventClick(event2);}}>{event2.getText()}</button>
        <button className={styles.event_choice_3} onClick={() => {handleEventClick(event3);}}>{event3.getText()}</button>
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
                  onMouseEnter={() => displayTileInfo(index)}
                  onMouseLeave={() => setInfoPanelActive(false)}
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
                onMouseEnter={() => displayTileInfo(newGame)}
              />
            </div>
          </div> :
          <div className={styles.new_tile_group}>
            <p className={styles.new_tile_text}>Cost $50</p>
            <button disabled={isMoving || alertActive || isNewTile || money < 50} className={styles.new_tile_button} onClick={() => {setMoney(money => money - 50); setIsNewTile(true); setNewGame(getNewGame())}}>Buy new tile</button>
          </div>}
          <div className={styles.title_group}>
            <p className={styles.title_text}>{`BoardWay`}</p>
            <Link className={styles.about_link} href="/about">Learn how this game was made</Link>
          </div>
          <p className={styles.roll_count}>{`Roll #${rollCount + 1}`}</p>
          <p className={styles.money_text}>{`Money: \$${money}`}</p>
          <button className={styles.view_current_event_button} onMouseOver={() => displayCurrentEvents()} onClick={() => displayCurrentEvents()}>View Active Events</button>

          {
            moneyModifier > 0 ? <p className={styles.money_modifier_text}>{`+\$${moneyModifier}`}</p> : null
          }

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

          {infoPanelActive && <div className={styles.alert_container}>
            <div className={styles.info_panel}>
                <Image
                  src={`/images/info_panel.png`} // Route of the image file
                  fill
                  alt="info_panel"
                />
            </div>
            <p className={styles.alert_text}>{infoPanelText}</p>
          </div>}

        </div>
    </div>
  );
}
