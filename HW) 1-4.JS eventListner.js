//map: 배열 요소를 하나씩 탐색하며, callback함수의 return값으로 새로운 배열을 만든다.
//filter: 조건에 맞는 요소들로 새로운 배열이 생성된다.
//find: 해당 조건을 만족하는 첫번째 요소의 값을 반환한다.
//every: 배열의 원소에서 하나라도 조건을 충족시키지 못하면 false를 반환한다.
//some: 배열의 원소에서 하나라도 조건을 충족하면 true를 반환한다.
//reduce: acc에 결과값을 담아서 return하고, cur에 현재 값을 담는다. reduce를 통해 map, filter, find..등 거의 모든 메서드를 구현할 수 있다.

const nums = [1, 2, 3, 4]

const newArr = nums.map(e => e*e*e)