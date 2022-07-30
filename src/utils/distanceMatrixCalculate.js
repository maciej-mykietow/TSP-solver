import resolveProblemFileByName from './tspInstanceResolver'

function calculateDistanceMatrix(tspProblemName) {
    let tspProblemCoordsData = resolveProblemFileByName(tspProblemName)
    let matrixSize = tspProblemCoordsData.length;
    let distanceMatrix = Array.from(Array(matrixSize), () => new Array(matrixSize))

    for (let i = 0; i < matrixSize; i++) {
        distanceMatrix[i][i] = 0;
    }

    var haversine = require("haversine-distance");

    for (let i = 0; i < matrixSize; i++) {
        for (let j = i + 1; j < matrixSize; j++) {
            distanceMatrix[i][j] = haversine(tspProblemCoordsData[i], tspProblemCoordsData[j]) / 1000; //convert haversine output (metres) to kms
            distanceMatrix[j][i] = distanceMatrix[i][j]; //symmetric matrix
        }
    }

    return distanceMatrix;
}

export default calculateDistanceMatrix;