import calculateSolutionFitness from "./calculateSolutionFitness";

function selectBestSolution(population, distanceMatrix){
    let selectedSolution = null;
    let bestFitnessSoFar = Number.MAX_SAFE_INTEGER;

    population.forEach((solution) => {
        let solutionFitness = calculateSolutionFitness(solution, distanceMatrix);
        if (solutionFitness < bestFitnessSoFar){ //
            bestFitnessSoFar = solutionFitness;
            selectedSolution = solution;
        }
    })

    return selectedSolution;
    }

export default selectBestSolution;