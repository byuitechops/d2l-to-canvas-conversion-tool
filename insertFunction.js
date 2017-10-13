module.exports = (arr, func) => {
    return arr.reduce((newArr, item, index) => {
        if (index < 1) {return [...newArr, item]}
        return [...newArr, item, func];
    }, []);
};
