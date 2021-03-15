/**
 * play a sound
 *
 * @category    javascript
 * @author      DESSI Alain <contact@alain-dessi.com>
 * @copyright   2021 Dessi Alain
 * @link        http://www.alain-dessi.com
 */

export function Sound(filename) {

  this.sound = document.createElement("audio");
  this.sound.src = filename;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);

  this.play = function(){
    this.sound.play();
  }

  this.stop = function(){
    this.sound.pause();
  }

}
