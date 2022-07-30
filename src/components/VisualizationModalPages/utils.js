import shuffle from 'lodash/shuffle';

// object like: { id: '1', value: '1' },
export const generateArrayOfAllLocations = (length) => {
    let resArray = [];
    Array.from(Array(length).keys()).forEach(number => {
      resArray.push({ id: number, value: number + 1 })
    });
  
    return resArray;
  }

  export const generateShuffledArrayOfAllLocations = (length) => {
    let resArray = [];
    Array.from(Array(length).keys()).forEach(number => {
      resArray.push({ id: number, value: number + 1 })
    });
  
    return shuffle(resArray);
  }

  // object like: { id: '1', value: '31243'  },
export const generateArrayOfRandomSolutionsWithFitnessInRange = (length, min, max) => {
    let resArray = [];
    Array.from(Array(length).keys()).forEach(number => {
      resArray.push({ id: number, value: Math.trunc(Math.random() * (max - min) + min) })
    });
  
    return resArray;
  }

export const generateArrayOfRandomNumbersInRange = (length, range) => {
    //generate random N numbers in range
    let numberInRange = Array.from(Array(range).keys());
    numberInRange = shuffle(numberInRange);
    let resArray = numberInRange.slice(0, length);
  
    return resArray;
  }