/**
 * Class des invaders
 *
 * @category    javascript
 * @package     SpaceInvaders
 * @author      DESSI Alain <contact@alain-dessi.com>
 * @copyright   2021 Dessi Alain
 * @link        http://www.alain-dessi.com
 */
import { Sound } from "./Sound.js";

export class Alien {
    constructor(type, posX, posY, speedGame) {
        this.posX = posX;
        this.posY = posY;
        this.type = type
        this.direction = 'right';
        this.anim = 1;
        this.speedMove = speedGame;

        this.game = document.querySelector('#space-game')
        this.alienElement = document.createElement('img')
        this.alienElement.src = 'imgs/aliens_' + this.type + '-1.png';

        this.game.appendChild(this.alienElement);
        this.alienElement.className = 'alien';

        this.alienElement.style.left = this.posX + 'px';
        this.alienElement.style.top = this.posY + 'px';

        this.points = [30, 20, 10]

        this.moveSound = 0
        this.sounds = [
            new Sound('sounds/fastinvader1.wav'),
            new Sound('sounds/fastinvader2.wav'),
            new Sound('sounds/fastinvader3.wav'),
            new Sound('sounds/fastinvader4.wav')
        ]

    }

    checkDirection(minWidth, maxWidth, direction) {
        if(this.posX + 24 > maxWidth) {
            direction = 'left'
        }

        if(this.posX - 4 < minWidth) {
            direction = 'right'
        }

        return direction
    }

    moveDown(maxBottom) {
        this.posY = this.posY + 32
        if(this.posY > maxBottom) {
            return true
        } else {
            return false
        }
    }

    move(direction) {

        // this.speedMove = speedMove
        this.anim = this.anim + 1;

        if(this.anim === this.speedMove / 2 || this.anim === this.speedMove) {

            if(this.anim === this.speedMove / 2) {
                this.alienElement.src = 'imgs/aliens_' + this.type + '-1.png';
                // this.sounds[this.moveSound].play()
                 this.moveSound++
                if(this.moveSound > 3) {
                    this.moveSound = 0
                }
            } else {
                this.alienElement.src = 'imgs/aliens_' + this.type + '-2.png';
                this.anim = 1
            }

            if(direction === 'right') {
                this.posX = this.posX + 5
            }

            if(direction === 'left') {
                this.posX = this.posX - 5
            }

            this.alienElement.style.left = this.posX + 'px'
            this.alienElement.style.top = this.posY + 'px'



        }
    }

    remove() {
        this.alienElement.src = 'imgs/boom.png'
        var boom = new Sound('sounds/invaderkilled.wav')
        boom.play()
        setInterval(() => { this.alienElement.remove() }, 50)

    }
}
