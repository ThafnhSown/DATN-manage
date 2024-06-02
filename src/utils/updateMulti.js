export const renderDate = (start, end) => {
    console.log("first", start)
    console.log("ddd", end)
    const arr = []
    for(let i = 0; i < 15; i++) {
        if(start + 86400000 * i <= end) {
            let tmp = start + 86400000 * i;
            arr.push(tmp);
        }
    }
    return arr
}