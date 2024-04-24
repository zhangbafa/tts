const blockList = [
    {
        voice:'1',
        style:'',
        role:'',
        rate:'',
        pitch:'',
        volume:'',
        content:['insert']
    },
    {
        voice:'2',
        style:'',
        role:'',
        rate:'',
        pitch:'',
        volume:'',
        content:['insert']
    }
];

// 找到要移动的元素的索引
const indexToMove = blockList.findIndex(item => item.voice === '2');
console.log(indexToMove)
// 如果找到了要移动的元素
if (indexToMove !== -1) {
    // 将其从原来的位置删除并插入到数组的开头
    const movedItem = blockList.splice(indexToMove, 1);
    console.log(movedItem)
    // blockList.unshift(movedItem);
}

// console.log(blockList);
