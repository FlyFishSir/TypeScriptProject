/**
 * Created by Yes.Man on 2021/3/13 4:42 下午.
 * desc: 食物
 */
export default class Food {
  private x: number;
  private y: number;
  private food: HTMLElement;

  constructor () {
    this.food = document.getElementById('food');
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
    this.x = x;
    this.y = y;
    this.food.style.left = x + 'px';
    this.food.style.top = y + 'px';
  }
}
