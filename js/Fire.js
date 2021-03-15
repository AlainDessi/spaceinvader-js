/**
 * Fire of ship (Shooter on Invaders)
 *
 * @category    javascript
 * @package     spaceinvaders
 * @author      DESSI Alain <contact@alain-dessi.com>
 * @copyright   2021 Dessi Alain
 * @link        http://www.alain-dessi.com
 */
import { Sound } from "./Sound.js";

export class Fire {
    constructor(posX, posY, type) {
        this.posX = posX
        this.posY = posY
        this.type = type
        this.speed = 8
        this.speedAlien = 2
        this.soundBoom = new Sound('sounds/shoot.wav')
        this.game = document.querySelector('#space-game')

        if(type === 'shooter') {
            this.posX = this.posX + 9
            this.fireElement = document.createElement('div')
            this.game.appendChild(this.fireElement)
            this.fireElement.className = 'fire-shooter'
            this.displayFire()
            this.soundBoom.play()
        }
        if(type === 'alien') {
            this.posX = this.posX + 9
            this.posY = this.posY + 20
            this.fireElement = document.createElement('div')
            this.game.appendChild(this.fireElement)
            this.fireElement.className = 'fire-alien'
            this.displayFire()
        }
    }

    displayFire() {
        this.fireElement.style.left = this.posX + 'px'
        this.fireElement.style.top = this.posY + 'px'
    }

    move(maxTop, maxBottom) {
        if(this.type === 'shooter') {
            if(this.posY - this.speed < maxTop) {
                return true
            }
            this.posY = this.posY - this.speed
            this.displayFire()
            return false
        }

        if(this.type === 'alien') {
            if((this.posY + this.speedAlien) > maxBottom) {
                this.remove()
                return true
            }
            this.posY = this.posY + this.speedAlien
            this.displayFire()
            return false
        }
    }

    remove() {
        this.fireElement.remove();
    }
}
