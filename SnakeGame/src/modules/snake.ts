/**
 * Created by Yes.Man on 2021/3/13 6:08 下午.
 * desc: Snake
 */
export default class Snake {
  private Snake = document.getElementById('snake')!;
  private Head = document.getElementById('head')!;
  Bodies = this.Snake.getElementsByTagName('i')!;

  get x () {
    return this.Head.offsetLeft;
  }

  set x (value) {
    this.set('x', 'left', value);
  }

  get y () {
    return this.Head.offsetTop;
  }

  set y (value) {
    this.set('y', 'top', value);
  }

  set (axis: string, pos: string, value: number) {
    if (this[axis] === value) return;

    if (value < 0 || value > 500 - 20) {
      throw Error('snake against wall!');
    }

    // 上下方向不能掉头
    if (this.Bodies[1] && Number.parseInt(this.Bodies[1].style[pos]) === value) {
      if (value > this[axis]) {
        value = this[axis] - 20;
      } else {
        value = this[axis] + 20;
      }
    }

    this.moveBodies();
    this.Head.style[pos] = value + 'px';
    this.checkHeadAndBody();
  }

  /**
   * 添加snake身体
   */
  addBodies () {
    this.Snake.insertAdjacentHTML('beforeend', '<i></i>');
  }

  /**
   * 移动snake身体
   */
  moveBodies () {
    for (let i = this.Bodies.length - 1; i > 0; i--) {
      this.Bodies[i].style.left = this.Bodies[i - 1].style.left;
      this.Bodies[i].style.top = this.Bodies[i - 1].style.top;
    }
  }

  /**
   * 检测头是否与身体发生碰撞
   */
  checkHeadAndBody () {
    for (let i = 1; i < this.Bodies.length; i++) {
      const { left, top } = this.Bodies[i].style;
      if (Number.parseInt(left) === this.x && Number.parseInt(top) === this.y) throw Error('头碰到自己身体！');
    }
  }
}
