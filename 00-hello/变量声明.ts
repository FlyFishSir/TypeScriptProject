/**
 * Created by Yes.Man on 2021/2/16 8:48 上午.
 */

function sumMatrix (matrix: number[][]) {
  var sum = 0;

  for (var i = 0; i < matrix.length; i++) {
    var currentRow = matrix[i];

    for (var i = 0; i < currentRow.length; i++) {
      console.log(i, sum);
      sum += currentRow[i];
    }
  }

  return sum;
}

console.log(sumMatrix([ [ 1, 2, 3 ], [ 3, 4, 5 ] ]));
