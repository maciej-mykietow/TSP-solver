import React, { useState, useEffect } from "react";
import PathMap from "../PathMap/PathMap"
import calculateDistanceMatrix from "../../utils/distanceMatrixCalculate"
import sortCoordsDataBySolution from "../../utils/sortCoordsDataBySolution"
import generateRandomPopulation from "../../utils/generateRandomPopulation"
import generateOptimalSolution from "../../utils/generateOptimalSolutionPopulationForUS_lower48"
import workerFunction from "../Worker/GenerateNextPopulationWorker"
import { Card, Container, Row, Col } from "react-bootstrap";
import selectBestSolution from "utils/selectBestSolution";
import calculateSolutionFitness from "utils/calculateSolutionFitness";
import VisualizationModal from '../VisualizationModalPages/VisualizationModal/VisualizationModal.js'
import ParamsSetupPanel from "../ParamsSetupPanel/ParamsSetupPanel";
import ResultsPanel from "../ResultsPanel/ResultsPanel";
import OptimalFitnessPanel from "../OptimalFitnessPanel/OptimalFitnessPanel";

const loadWebWorker = (workerFunction) => {
  const code = workerFunction.toString();
  const blob = new Blob([`(${code})()`]);

  return new Worker(URL.createObjectURL(blob));
}

const Dashboard = () => {
  const [tspProblem] = useState('US_lower48');
  const [tspInstanceDistanceMatrix] = useState(calculateDistanceMatrix(tspProblem));
  const [initialRandomPopulation] = useState(generateRandomPopulation(100, tspProblem))
  const [currentGeneration, setCurrentGeneration] = useState(initialRandomPopulation)
  const [currentSolution] = useState(selectBestSolution(currentGeneration, tspInstanceDistanceMatrix));
  const [coordsSortedBySolution, setCoordsSortedBySolution] = useState(sortCoordsDataBySolution(currentSolution, tspProblem));
  const [webWorker] = useState(() => loadWebWorker(workerFunction))

  const [generationNumber, setGenerationNumber] = useState(0);
  const [currentFitness, setCurrentFitness] = useState(Math.round(calculateSolutionFitness(currentSolution, tspInstanceDistanceMatrix)));
  const [bestFitness, setBestFitness] = useState(currentFitness);
  const [populationSize, setPopulationSize] = useState(100);
  const [generationCount, setGenerationCount] = useState(100);
  const [tournamentSize, setTournamentSize] = useState(5);
  const [crossingChance, setCrossingChance] = useState(50);
  const [mutationChance, setMutationChance] = useState(50);
  const [isRunning, setIsRunning] = useState(false);

  const optimalFitness = calculateSolutionFitness(generateOptimalSolution(), tspInstanceDistanceMatrix)

  const startWorker = () => {
    setIsRunning(true)

    webWorker
      .postMessage({
        currentGeneration: generateRandomPopulation(populationSize, tspProblem),
        generationNumber: 1,
        generationCount: generationCount,
        tspInstanceDistanceMatrix: tspInstanceDistanceMatrix,
        tournamentSize: tournamentSize,
        crossingChance: crossingChance * 0.01,  //convert from 0-100 to 0-1 range
        mutationChance: mutationChance * 0.01,
        bestFitness: bestFitness
      });
  }

  useEffect(() => {
    if (webWorker) webWorker.onmessage = ($event) => {
      if ($event && $event.data) {
        setCoordsSortedBySolution(sortCoordsDataBySolution($event.data.newBestSolution, tspProblem))
        setCurrentGeneration($event.data.newGeneration)
        setGenerationNumber($event.data.generationNumber)
        setCurrentFitness($event.data.currentFitness)
        setBestFitness($event.data.bestFitness)

        if ($event.data.generationNumber < $event.data.generationCount) {
          webWorker
            .postMessage({
              generationNumber: $event.data.generationNumber + 1,
              generationCount: $event.data.generationCount,
              currentGeneration: $event.data.newGeneration,
              bestFitness: $event.data.bestFitness,
              tspInstanceDistanceMatrix: tspInstanceDistanceMatrix,
              tournamentSize: $event.data.tournamentSize,
              crossingChance: $event.data.crossingChance,
              mutationChance: $event.data.mutationChance,
            })
        } else setIsRunning(false);
      } else console.warn("worker failure");
    };
  }, [webWorker]);

  return (
    <>
      <VisualizationModal />
      <Container fluid>
        <ParamsSetupPanel
          populationSize={populationSize}
          setPopulationSize={setPopulationSize}
          generationCount={generationCount}
          setGenerationCount={setGenerationCount}
          tournamentSize={tournamentSize}
          setTournamentSize={setTournamentSize}
          crossingChance={crossingChance}
          setCrossingChance={setCrossingChance}
          mutationChance={mutationChance}
          setMutationChance={setMutationChance}
          startWorker={startWorker}
          isRunning={isRunning}>
        </ParamsSetupPanel>

        <Row>
          <Col md="8">
            <Card>
              <Card.Body>
                <PathMap
                  tspProblem={tspProblem}
                  solutionToDisplay={coordsSortedBySolution}
                  initialRandomPopulation={currentGeneration} />
              </Card.Body>
              <Card.Footer style={{ height: '25px' }}>
              </Card.Footer>
            </Card>
          </Col>

          <Col md="4">
            <ResultsPanel
              generationNumber={generationNumber}
              currentFitness={currentFitness}
              bestFitness={bestFitness} />

            <OptimalFitnessPanel
              optimalFitness={optimalFitness} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
