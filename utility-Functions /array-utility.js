getArraysDifference = async (firstArray, secondArray) => {
    let finalArray = [];
    for (let i = 0; i < firstArray.length; i++) {
      if (secondArray.indexOf(firstArray[i]) === -1) {
        finalArray.push(firstArray[i]);
      }
    }
    for (i = 0; i < secondArray.length; i++) {
      if (firstArray.indexOf(secondArray[i]) === -1) {
        finalArray.push(secondArray[i]);
      }
    }
    return finalArray;
};
module.exports = { getArraysDifference }
