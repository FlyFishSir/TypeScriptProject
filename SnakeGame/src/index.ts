/**
 * Created by Yes.Man on 2021/3/13 4:16 下午.
 */
import './index.scss';
import Food from './modules/food';
import Info from './modules/info';

const food = new Food();
console.log(food);

const score = new Info();
for (let i = 0; i < 100; i++) {
  score.addScore();
}
