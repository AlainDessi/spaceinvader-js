/**
 * Class du jeu SpaceInvaders
 *
 * @category    javascript
 * @package     SpaceInvaders
 * @author      DESSI Alain <contact@alain-dessi.com>
 * @copyright   2021 Dessi Alain
 * @link        http://www.alain-dessi.com
 */

import { Alien } from "./Alien.js";
import { Shooter } from "./Shooter.js";
import { Fire } from "./Fire.js";
import { Sound } from "./Sound.js";

export class Game {
    constructor() {
        this.spaceGame = document.querySelector('#space-game')
        this.width    = this.spaceGame.offsetWidth
        this.height   = this.spaceGame.offsetHeight
        this.top = this.spaceGame.offsetTop
        this.left = this.spaceGame.offsetLeft

        this.shooterBoomSound = new Sound('sounds/explosion.wav')
        // this.width    = 480
        // this.height   = 410
        // this.top = 96
        this.left = this.spaceGame.offsetLeft

        this.keyCode  = {
            'Space'     : false,
            'ArrowLeft' : false,
            'ArrowRight': false,
            'KeyP'      : false
        }
        this.aliens = [];
        this.alienDirection = 'right';
        this.fires = [];
        this.shooterHasFire = false;

        this.scoreFirst = document.querySelector('.score-first span');
        this.score = 0;

        this.startPage = document.querySelector('.start-page')
        this.pausePage = document.querySelector('.pause-page')
        this.niveauPage = document.querySelector('.niveau-page')
        this.levelNumber = document.querySelector('.niveau-page span #level')
        this.isGameStart = false
        this.isGamePaused = false
        this.level = 1
        this.speedGame = 42
        this.fireAlienChances = 4000

    }

    start() {
        this.startPage.style.display = 'block'
        document.addEventListener('keydown', (e) => {
            if(!this.isGameStart) {
                this.startPage.style.display = 'none'
                this.startGame(false)
            }
        })
    }

    startGame(newLevel = false) {

        this.isGameStart = true

        if(!newLevel) {
            document.addEventListener('keydown', (e) => {
                if(this.keyCode.hasOwnProperty(e.code)) {
                    this.keyCode[e.code] = true;
                }
            });

            document.addEventListener('keyup', (e) => {
                if(e.code in this.keyCode) {
                    this.keyCode[e.code] = false;
                }
            });

            setInterval(() => { this.update() }, 20);

            // create shooter
            this.shooter  = new Shooter();
        } else {

        }

        this.shooter.setStartPosition((this.width / 2), this.height - 56)
        this.aliens = []
        this.fires = []

        // create aliens
        var type = 1;
        for (var row = 1; row < 6; row++) {
            for (var line = 0; line < 11; line++) {
                if(row === 1) { type = 1}
                if(row > 1) { type = 2}
                if(row > 3) { type = 3}
                this.aliens.push(new Alien(type, (line * 32), row * 32 + 60, this.speedGame - this.level * 2 ))
            }
        }

        this.isGamePaused = false
    }

    update() {

        if(this.keyCode['KeyP']) {
            // console.log()
            if(this.isGamePaused) {
                this.pausePage.style.display = 'none'
                this.isGamePaused = false
            } else {
                this.pausePage.style.display = 'block'
                this.isGamePaused = true
            }
        }

        if(this.isGamePaused) { return true }

        if(this.keyCode['ArrowLeft']) {
            this.shooter.move('left', 0, this.width)
        }

        if(this.keyCode['ArrowRight']) {
            this.shooter.move('right', 0, this.width)
        }

        if(this.keyCode['Space']) {
            if(!this.shooterHasFire) {
                this.shooterHasFire = true
                this.fires.push(new Fire(
                    this.shooter.posX,
                    this.shooter.posY,
                    'shooter'
                ))
            }
        }

        var endline = false;

        this.aliens.forEach((alien, i) => {
            var changeDirection = false
            var newDirection = alien.checkDirection(0, this.width, this.alienDirection)
            if(newDirection != this.alienDirection) {
                this.aliens.forEach((alien, i) => {
                    endline = alien.moveDown(this.height + (this.top - 32))
                })
                this.alienDirection = newDirection
            }

            alien.move(this.alienDirection, 40);

            // fin de partie
            if(
                alien.posX >= this.shooter.posX &&
                alien.posX <= (this.shooter.posX + 20) &&
                alien.posY >= this.shooter.posY &&
                alien.posY <= (this.shooter.posY + 20)
            ) {
                this.shooter.shooterElement.src = 'imgs/boom.png'
                this.shooterBoomSound.play()
                this.isGamePaused = true
                this.aliens.forEach((alien, x) => {
                    alien.remove()
                });
                this.fires.forEach((fire, x) => {
                    fire.remove()
                });
                this.shooter.remove()
                this.isGameStart = false
                this.start()
            }

            if(Math.floor(Math.random() * Math.floor(this.fireAlienChances)) === 1) {
                this.fires.push(new Fire(
                    alien.posX,
                    alien.posY,
                    'alien'
                ))
            }
        });

        this.checkFire();
    }

    checkFire() {
        this.fires.forEach((fire, i) => {
            var endFire = fire.move(0, this.height - 38);
            if(fire.type === 'shooter') {
                if(endFire) {
                    this.shooterHasFire = false
                    fire.remove()
                    this.fires.splice(i, 1)
                } else {
                    for (var x = 0; x < this.aliens.length; x++) {
                        if(
                            fire.posX > this.aliens[x].posX &&
                            fire.posX < this.aliens[x].posX + 20 &&
                            fire.posY > this.aliens[x].posY &&
                            fire.posY < this.aliens[x].posY + 20 &&
                            this.shooterHasFire
                        ) {
                            fire.remove()
                            this.fires.splice(i, 1)

                            this.score = this.score + this.aliens[x].points[this.aliens[x].type - 1]
                            this.updateScore()

                            this.aliens[x].remove()
                            this.aliens.splice(x, 1)
                            this.shooterHasFire = false
                        }
                    }
                }
            } else if (fire.type === 'alien') {
                if(endFire) {
                    this.fires.splice(i, 1)
                } else {
                    if(
                        fire.posX > this.shooter.posX &&
                        fire.posX < (this.shooter.posX + 20) &&
                        fire.posY > this.shooter.posY &&
                        fire.posY < (this.shooter.posY + 20)
                    ) {
                        fire.remove()
                        this.shooter.shooterElement.src = 'imgs/boom.png'
                        this.shooterBoomSound.play()
                        this.isGamePaused = true;
                        setTimeout(() => {
                            this.fires.splice(i, 1)
                            this.shooter.shooterElement.src = 'imgs/shooter.png'
                            this.isGamePaused = false;
                        }, 150)
                    }
                }
            }
        });
        if(this.aliens.length === 0) {
            this.isGamePaused = true
            this.levelUp()
        }
    }

    levelUp() {
        this.level++
        this.niveauPage.style.display = 'block'
        this.levelNumber.innerHTML = this.level
        setTimeout(() => {
            this.niveauPage.style.display = 'none'
            this.startGame(true)
        }, 1500)
    }

    updateScore() {
        this.scoreFirst.innerHTML = this.score;
    }
}
