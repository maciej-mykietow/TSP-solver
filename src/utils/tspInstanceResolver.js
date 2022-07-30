import tspCoordsUS_lower48 from "../const/tspCoordsUS_lower48"

function resolveProblemFileByName(tspProblem){
    let tspProblemCoordsData =  
    tspProblem === 'US_lower48' ? tspCoordsUS_lower48 :
    console.warn('No such problem instance file');

    return tspProblemCoordsData;
}

export default resolveProblemFileByName;
