function calculateSolutionFitness(tspSolution, distanceMatrix) {
  //for int array (indexes), add corresponding distances from matrix
  let fitness = 0.0;
  for (let i = 0; i < tspSolution.length - 1; i++) {
    fitness += distanceMatrix[tspSolution[i]][tspSolution[i + 1]]
  }

  fitness += distanceMatrix[tspSolution[0]][tspSolution[tspSolution.length - 1]]

  return fitness;
}

export default calculateSolutionFitness;