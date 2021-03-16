/**
 * Created by Yes.Man on 2021/3/13 6:09 下午.
 * desc: Info
 */
export default class Info {
  score: number = 0;
  level: number = 1;
  private Score: HTMLElement = document.getElementById('score')!;
  private Level: HTMLElement = document.getElementById('level')!;

  constructor (private maxLever = 10) {}

  /**
   * 加分
   */
  addScore () {
    this.Score.innerHTML = ++this.score + '';

    if (this.score % 10 === 0) {
      this.addLevel();
    }
  }

  /**
   * 提升等级
   */
  addLevel () {
    if (this.level >= this.maxLever) return;
    this.Level.innerHTML = ++this.level + '';
  }
}
