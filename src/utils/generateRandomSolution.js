import resolveProblemFileByName from './tspInstanceResolver'
import shuffle from 'lodash/shuffle';

function generateRandomSolution(tspProblemName){
    let tspProblemCoordsData = resolveProblemFileByName(tspProblemName)
    let tspProblemSize = tspProblemCoordsData.length;
    let sequence = Array.from(Array(tspProblemSize).keys());

      return shuffle(sequence);
}

export default generateRandomSolution;