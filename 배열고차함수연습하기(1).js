let bucketLists = [
    { id:3, text:'여행가기', done: false },
    { id:2, text:'치킨 먹기', done: true },
    { id:1, text:'코딩 하기', done: false },
];

function render(){

    let html = bucketLists.reduce((acc,cur) =>{
        let html = "<li id=\"" + cur.id + "\"><label>\n<input type=\"checkbox\">" + cur.text + "</input></label></li>\n"
        acc+=html

        return acc
    },"")
    console.log(html)
}

render();

