// 1번
const nums = [1,2,3,4,5,6,7,8]

for (let i = 0; i < nums.length; i++) {
  console.log(nums[i])
}

// for (const i = 0; i < nums.length; i++) {
//                                     ^

// TypeError: Assignment to constant variable.

//설명)
//1번 에러의 경우 const를 let으로 바꾸어서 해결하면 된다
//이유는 const는 재할당이 불가능하므로 i값을 바꿀 수 없기 때문에 재할당이 가능한 let을 사용하면 된다


// 2번
for (num in nums) {
  const number = Number(num)
  console.log(number, typeof number)
}

// 0 string
// 1 string
// 2 string
// 3 string
// 4 string
// 5 string
// 6 string
// 7 string

//설명)
//배열에 저장된 값은 string형태로 저장되기 때문에 Number()를 통해 number형태로 바꿔주고 출력하면 된다