let bucketLists = [
    { id:3, text:'여행가기', done: false },
    { id:2, text:'치킨 먹기', done: true },
    { id:1, text:'코딩 하기', done: false },
];


function getValues(key){
    console.log(key)
    const arr = bucketLists.map(e => {
        if(key==="id") return e.id
        
        if(key==="text")return e.text
       
        if(key==="done")return e.done
        
    })
    console.log(arr)
}

console.log(getValues('id'))
console.log(getValues('text'))
console.log(getValues('done'))