import resolveProblemFileByName from './tspInstanceResolver'

function sortCoordsDataBySolution(tspSolution, tspProblem){
  let tspProblemCoordsData = resolveProblemFileByName(tspProblem)

  let tspProblemCoordsDataCopy = [...tspProblemCoordsData]; //deep copy
  tspProblemCoordsDataCopy.sort((a, b) => {
   let newA = tspProblemCoordsDataCopy.indexOf(a)
    let newB = tspProblemCoordsDataCopy.indexOf(b)

    return tspSolution.indexOf(newA) - tspSolution.indexOf(newB)});

  return tspProblemCoordsDataCopy;
}

export default sortCoordsDataBySolution;