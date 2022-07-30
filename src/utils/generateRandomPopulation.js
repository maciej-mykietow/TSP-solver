import generateRandomSolution from "./generateRandomSolution";

function generateRandomPopulation(populationSize, tspProblemName) {
    let randomPopulation = [];

    for (let i = 0; i < populationSize; i++)
        randomPopulation.push(generateRandomSolution(tspProblemName))

    return randomPopulation;
}

export default generateRandomPopulation;