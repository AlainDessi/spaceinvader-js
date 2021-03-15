/**
 * Space Invaders Javascript
 *
 * @category    javascript
 * @package     space Invaders
 * @author      DESSI Alain <contact@alain-dessi.com>
 * @copyright   2021 Dessi Alain
 * @link        http://www.alain-dessi.com
 * @version     0.1
 */

import { Sound } from "./Sound.js";
import { Shooter } from "./Shooter.js";
import { Alien } from "./Alien.js";
import { Game } from "./Game.js";

var game = new Game();
console.log(game);
game.start();
// game.startGame(true);
