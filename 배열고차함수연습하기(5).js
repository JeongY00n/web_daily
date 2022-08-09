let bucketList = [
    {id: 3, text: '여행가기', done: false},
    {id: 2, text: '치킨 먹기', done: true},
    {id: 1, text: '코딩 하기', done: false},
];

function toggle(id){
    bucketList.map(e =>{
        if(e.id==id){

            if(e.done == true)
                e.done = false;
            else
                e.done = true;
        }

        return e
    } 
    )
}

toggle(2);

console.log(bucketList)