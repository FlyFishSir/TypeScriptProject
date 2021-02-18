/**
 * Created by Yes.Man on 2021/2/17 6:02 下午.
 */

/* ========================================== 函数 ========================================== */

const add1: (a: number, b: number) => number = (x: number, y: number): number => x + y;
// 推断类型 按上下文归类
const add2: (a: number, b: number) => number = (x, y) => x + y;
const add3 = (x: number, y: number) => x + y;

function buildName (firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName;
  } else {
    return firstName;
  }
}

const result1 = buildName('Bob', 'Adams');
const result2 = buildName('Bob');

// .........................
interface Card {
  suit: string;
  card: number;
}

interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker (this: Deck): () => Card;
}

const deck: Deck = {
  suits: [ 'hearts', 'spades', 'clubs', 'diamonds' ],
  cards: Array(52),
  // NOTE: The function now explicitly specifies that its callee must be of type Deck
  createCardPicker: function (this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  }
};

const cardPicker = deck.createCardPicker();
const pickedCard = cardPicker();

console.log('card: ' + pickedCard.card + ' of ' + pickedCard.suit);
