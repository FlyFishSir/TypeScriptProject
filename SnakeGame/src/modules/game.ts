/**
 * Created by Yes.Man on 2021/3/13 10:22 下午.
 * desc: Game
 */
import Snake from './snake';
import Food from './food';
import Info from './info';

export default class Game {
  private snake = new Snake();
  private food = new Food();
  private info = new Info();
  private direction = 39;
  private isLive = true;

  constructor () {
    this.init();
  }

  /**
   * 游戏初始化
   */
  init () {
    document.addEventListener('keydown', e => {
      this.direction = e.keyCode;
    });

    this.run();
  }

  /**
   * 控制snake移动
   */
  run () {
    let x = this.snake.x;
    let y = this.snake.y;

    switch (this.direction) {
      case 37: // 左
        x -= 20;
        break;

      case 38: // 上
        y -= 20;
        break;

      case 39: // 右
        x += 20;
        break;

      case 40: // 下
        y += 20;
        break;

      default:
    }

    this.checkEatFood(x, y);

    try {
      this.snake.x = x;
      this.snake.y = y;
    } catch (e) {
      console.log(e.message);
      alert('Game Over!');
      this.isLive = false;
    }

    this.isLive && setTimeout(this.run.bind(this), 300 - (this.info.level - 1) * 30);
  }

  /**
   * 检测吃到食物
   * @param x
   * @param y
   */
  checkEatFood (x: number, y: number) {
    if (this.food.x === x && this.food.y === y) {
      this.info.addScore();
      this.snake.addBodies();
      this.food.genRandomFood();
    }
  }
}
