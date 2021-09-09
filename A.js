function solve(input) {
    const set = new Set();
    let arrayStr = input.split(',');
    let arrayNum = arrayStr.map(Number);
    arrayNum.forEach(item => {
        set.add(item);
    });

    let array = [...set];

    function sortFun() {
        for (let i = 0; i < array.length; i++) {
            let indexMin = i;

            for (let j = i + 1; j < array.length; j++) {

                if (array[j] < array[indexMin]) {
                    indexMin = j;
                }
            }
            let tmp = array[i];
            array[i] = array[indexMin];
            array[indexMin] = tmp;
        }
        return array;
    }

    array = sortFun();

    function placingOfSignsme() {
        for (let i = 0; i < array.length; i++) {
            if (array[i] + 1 === array[i + 1]) {
                array.splice(i + 1, 0, '-');
            }
        }
        for (let i = 0; i < array.length; i++) {
            if (typeof array[i] === 'number' && typeof array[i + 1] === 'number') {
                array.splice(i + 1, 0, ',');
            }
        }

        return array.join('').split(',');
    }

    array = placingOfSignsme();

    function correctArray() {
        let minSubarray;
        let maxSubarray;
        let subarray = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i].split('-').length === 2) {
                subarray = array[i].split('')
                for (let j = 0; j < subarray.length; j++) {
                    if (subarray[j] === '-') {
                        subarray[j] = ',';
                        array[i] = subarray.join('')
                    }
                }
            } else if (array[i].split('-').length > 2) {
                subarray = array[i].split('-');
                minSubarray = subarray[0];
                maxSubarray = subarray[subarray.length - 1];
                array[i] = (minSubarray + '-' + maxSubarray);
            }
        }

        return array.join(',');
    }

    return correctArray();

}


//! default
const fs = require('fs')
const input = fs.readFileSync(0, 'utf-8')
console.log(solve(input))