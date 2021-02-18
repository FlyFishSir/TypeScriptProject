/**
 * Created by Yes.Man on 2021/2/17 11:48 下午.
 */

/* ========================================== 枚举 ========================================== */

enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

const enum Enum {
  A = 1,
  B = A * 2
}

const e = [
  Enum.A,
  Enum.B
];

const enum Directions {
  Up,
  Down,
  Left,
  Right
}

const directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right
];

declare enum OuterEnum {
  A = 1,
  B,
  C = 2
}

const oe = [
  OuterEnum.A,
  OuterEnum.B,
  OuterEnum.C
];
