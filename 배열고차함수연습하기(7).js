let bucketList = [
    {id: 3, text: '여행가기', done: false},
    {id: 2, text: '치킨 먹기', done: true},
    {id: 1, text: '코딩 하기', done: false},
];

function count(){
    const sum = bucketList.reduce((acc,cur)=>{
        if(cur.done==true)
            acc++
        return acc
    },0)

    console.log(sum)
}
console.log(count())