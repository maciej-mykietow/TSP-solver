const generateNextPopulationWorker = () => {
    performTournamentSelection = (population, tournamentSize, distanceMatrix) => {
        let selectedForTournament;
        let populationAfterSelection = [];
        let selectedSolution;

        do {
            selectedForTournament = [];
            selectedSolution = null;

            for (let i = 0; i < tournamentSize; i++)
                selectedForTournament.push(population[Math.floor(Math.random() * population.length)])

            selectedSolution = selectBestSolution(selectedForTournament, distanceMatrix);
            populationAfterSelection.push(selectedSolution);
        } while (populationAfterSelection.length != population.length)

        return populationAfterSelection;
    }

    selectBestSolution = (population, distanceMatrix) => {
        let selectedSolution = null;
        let bestFitnessSoFar = Number.MAX_SAFE_INTEGER;

        population.forEach((solution) => {
            let solutionFitness = calculateSolutionFitness(solution, distanceMatrix);
            if (solutionFitness < bestFitnessSoFar) { //
                bestFitnessSoFar = solutionFitness;
                selectedSolution = solution;
            }
        })

        return selectedSolution;
    }

    calculateSolutionFitness = (tspSolution, distanceMatrix) => {
        let fitness = 0.0;
        for (let i = 0; i < tspSolution.length - 1; i++) {
            fitness += distanceMatrix[tspSolution[i]][tspSolution[i + 1]]
        }
        fitness += distanceMatrix[tspSolution[0]][tspSolution[tspSolution.length - 1]]

        return fitness;
    }

    performOnePointCrossover = (populationAfterSelection, crossingChance) => {
        let populationAfterCrossover = [];
        let counter = 0;

        do {
            let firstParent = populationAfterSelection[counter++];
            let secondParent = populationAfterSelection[counter++];
            let firstChild = [...firstParent];
            let secondChild = [...secondParent];

            //if no crossing then children = parents
            if (Math.random() < crossingChance) {
                let crossingPoint = (Math.floor(Math.random() * (firstParent.length))); //choose [0-N] crossing point
                firstChild = firstParent.slice(0, crossingPoint).concat(secondParent.slice(crossingPoint));
                secondChild = secondParent.slice(0, crossingPoint).concat(firstParent.slice(crossingPoint));
                if (!checkIfSolutionIsCorrect(firstChild))
                    firstChild = correctSolution(firstChild)
                if (!checkIfSolutionIsCorrect(secondChild))
                    secondChild = correctSolution(secondChild)
            }

            populationAfterCrossover.push(firstChild);
            populationAfterCrossover.push(secondChild);  //second child possibly redundant
        }
        while (populationAfterCrossover.length < populationAfterSelection.length)

        return populationAfterCrossover.length > populationAfterSelection.length ?
            populationAfterCrossover.slice(0, -1) : populationAfterCrossover;
    }

    correctSolution = (incorrectSolution) => {
        let solutionSize = incorrectSolution.length;
        let allPointsSequence = Array.from(Array(solutionSize).keys());
        let solutionWithNoDuplicates = [...new Set(incorrectSolution)];
        let missingPoints = allPointsSequence.filter(point => !solutionWithNoDuplicates.includes(point));
        return [...solutionWithNoDuplicates, ...missingPoints];
    }

    checkIfSolutionIsCorrect = (solution) => {
        let solutionWithNoDuplicates = [...new Set(solution)];
        return solution.length == solutionWithNoDuplicates.length ?
            true : false
    }

    performInverseMutation = (populationAfterCrossover, mutationChance) => {
        let mutatedPopulation = [...populationAfterCrossover];

        for (let i = 0; i < mutatedPopulation.length; i++) {
            let solution = mutatedPopulation[i];
            if (Math.random() < mutationChance) {
                let indexFrom = Math.floor(Math.random() * solution.length);
                let indexTo = Math.floor(Math.random() * solution.length);
                if (indexFrom > indexTo) {
                    let temp = indexFrom;
                    indexFrom = indexTo;
                    indexTo = temp;
                }

                let solutionPartBeforeInversion = solution.slice(0, indexFrom);
                let invertedSolutionPart = solution.slice(indexFrom, indexTo).reverse();
                let solutionPartAfterInversion = solution.slice(indexTo, solution.length);
                mutatedPopulation[i] = [...solutionPartBeforeInversion, ...invertedSolutionPart, ...solutionPartAfterInversion];
            }
        }

        return mutatedPopulation;
    }

    // eslint-disable-next-line no-restricted-globals
    self.onmessage = async ($event) => {
        let currentGeneration = $event.data.currentGeneration;
        let tournamentSize = $event.data.tournamentSize;
        let crossingChance = $event.data.crossingChance;
        let mutationChance = $event.data.mutationChance;
        let tspInstanceDistanceMatrix = $event.data.tspInstanceDistanceMatrix;

        let populationAfterSelection = performTournamentSelection(currentGeneration, tournamentSize, tspInstanceDistanceMatrix)
        let populationAfterCrossover = performOnePointCrossover(populationAfterSelection, crossingChance)
        let populationAfterMutation = performInverseMutation(populationAfterCrossover, mutationChance)
        let newBestSolution = selectBestSolution(populationAfterMutation, tspInstanceDistanceMatrix)
        let currentFitness = Math.round(calculateSolutionFitness(newBestSolution, tspInstanceDistanceMatrix))

        let result = {
            generationNumber: $event.data.generationNumber, //number of generation generated
            generationCount: $event.data.generationCount,
            newBestSolution: newBestSolution,
            currentFitness: currentFitness,
            bestFitness: currentFitness < $event.data.bestFitness ? currentFitness : $event.data.bestFitness,
            newGeneration: populationAfterMutation,
            tournamentSize: tournamentSize,
            crossingChance: crossingChance,
            mutationChance: mutationChance,
        }

        self.postMessage(result);
    };
};

export default generateNextPopulationWorker;