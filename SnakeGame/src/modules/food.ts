/**
 * Created by Yes.Man on 2021/3/13 4:42 下午.
 * desc: 食物
 */
import Snake from './snake';

export default class Food {
  x: number;
  y: number;
  private food= document.getElementById('food')!;
  private snake = new Snake();

  constructor () {
    this.genRandomFood();
  }

  /**
   * 生成随机食物坐标
   */
  genRandomFood () {
    // 游戏容器500 * 500，食物大小20 * 20
    const total = 500 / 20 - 1;
    const x = Math.round(Math.random() * total) * 20;
    const y = Math.round(Math.random() * total) * 20;

    // 不能在snake区域生成食物
    let isInSnake = false;

    for (let i = 0; i < this.snake.Bodies.length; i++) {
      const { left, top } = this.snake.Bodies[i].style;
      if (Number.parseInt(left) === x && Number.parseInt(top) === y) {
        isInSnake = true;
        break;
      }
    }

    if (isInSnake) {
      this.genRandomFood();
      return;
    }

    this.x = x;
    this.y = y;
    this.food.style.left = x + 'px';
    this.food.style.top = y + 'px';
  }
}
