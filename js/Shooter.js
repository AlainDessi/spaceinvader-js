
export class Shooter {
    constructor() {
        this.posX = 0;
        this.posY = 0;
        this.speedMove = 4;

        // create Element Shooter
        this.game = document.querySelector('#space-game')
        this.shooterElement           = document.createElement('img');
        this.shooterElement.src       = 'imgs/shooter.png';
        this.game.appendChild(this.shooterElement);
        this.shooterElement.className = 'shooter';
    }

    setStartPosition(posX, posY) {
        this.posX = posX
        this.posY = posY
        this.displayShooterPosition();
    }

    displayShooterPosition() {
        this.shooterElement.style.left = this.posX + 'px';
        this.shooterElement.style.top = this.posY + 'px';
    }

    move(direction, minX, maxX) {

        if(direction === 'left' && this.posX >= minX + 4) {
            this.posX = this.posX - this.speedMove;
        }

        if(direction === 'right' && this.posX < maxX - 20) {
            this.posX = this.posX + this.speedMove;
        }

        this.displayShooterPosition();
    }

    remove() {
         this.shooterElement.remove()
    }
}
