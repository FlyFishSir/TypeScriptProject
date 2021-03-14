/**
 * Created by Yes.Man on 2021/3/13 6:08 下午.
 * desc: Snake
 */
export default class Snake {
  private x = 0;
  private y = 0;
  private Snake = document.getElementById('snake')!;
  private Head = document.getElementById('head')!;
  private Bodies = this.Snake.getElementsByTagName('i');

  get X () {
    return this.Head.offsetLeft;
  }

  set X (value) {
    this.Head.style.left = value + 'px';
  }

  get Y () {
    return this.Head.offsetTop;
  }

  set Y (value) {
    this.Head.style.top = value + 'px';
  }
}
