let bucketLists = [
    { id:3, content: '여행가기', completed: false},
    { id:2, content: '치킨먹기', completed: true},
    { id:1, content: '코딩하기', completed: false}
];

function addList(List){
    const newArr = bucketLists.reduce((acc, cur)=>
        {
            if(!acc[0])
                acc.push(List)
            acc.push(cur)
            
            return acc
        },[])
    console.log(newArr)
}

addList({ id:4, content: '요리하기', completed: true})

