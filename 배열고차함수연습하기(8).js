let bucketList = [
    {id: 3, text: '여행가기', done: false},
    {id: 2, text: '치킨 먹기', done: true},
    {id: 1, text: '코딩 하기', done: false},
];


function getMaxId(){
    const maxid = bucketList.reduce((acc,cur)=>{
        if(acc<cur.id)
            acc = cur.id

        return acc
    },0)

    console.log(maxid)
}

console.log(getMaxId())