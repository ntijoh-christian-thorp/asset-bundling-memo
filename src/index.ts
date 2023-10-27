import Board from './board'

import pig from "./img/1_pig.png";
import squirrel from "./img/2_squirrel.png";
import rabbit from "./img/3_rabbit.png";
import frog from "./img/4_frog.png";
import fox from "./img/5_fox.png";
import bear from "./img/6_bear.png";
import monkey from "./img/7_monkey.png";
import panda from "./img/8_panda.png";
import chick from "./img/9_chick.png";
import tiger from "./img/10_tiger.png";
import penguin from "./img/11_penguin.png";
import racoon from "./img/12_racoon.png";

import back from "./img/back.png";


const animals: string[] = [
  pig,
  squirrel,
  rabbit,
  frog,
  fox,
  bear,
  monkey,
  panda,
  chick,
  tiger,
  penguin,
  racoon,
];


document.querySelector('main')!.appendChild(new Board(animals, back));