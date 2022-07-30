import React, { useState } from 'react';

import { Modal } from 'react-bootstrap';
import { Button, Row, Col } from "react-bootstrap";
import FlipMoveListItem from '../FlipMoveListItem/FlipMoveListItem';
import { returnOnePointCrossoverPageDesc } from '../PagesDescriptions/PagesDescriptions'
import FlipMoveWrapper from '../FlipMoveWrapper/FlipMoveWrapper';
import { generateShuffledArrayOfAllLocations } from '../utils';
import '../VisualizationModal/VisualizationModal.scss'
import './OnePointCrossoverPage.scss';

const generateFirstParent = (tspProblemSize, color) => {
  return markFirstHalfOfSolution(generateShuffledArrayOfAllLocations(tspProblemSize), color);
}

const generateSecondParent = (tspProblemSize, color) => {
  return markSecondHalfOfSolution(generateShuffledArrayOfAllLocations(tspProblemSize), color);
}

const markFirstHalfOfSolution = (solution, color) => {
  return solution.map((obj, i) => ({
    ...obj, backgroundColor: i < solution.length / 2 ? color : ""
  }));
}

const markSecondHalfOfSolution = (solution, color) => {
  return solution.map((obj, i) => ({
    ...obj, backgroundColor: i >= solution.length / 2 ? color : ""
  }));
}

const OnePointCrossoverPage = () => {
  const tspProblemSize = 20;  //reduced for readability in this view
  const [firstParentSolution] = useState(generateFirstParent(tspProblemSize, "gold"))
  const [secondParentSolution] = useState(generateSecondParent(tspProblemSize, "sandybrown"))
  const [createdSolution, setCreatedSolution] = useState([]);
  const [correctedSolution, setCorrectedSolution] = useState([]);
  const [solutionCreated, setSolutionCreated] = useState(false);
  const [solutionChecked, setSolutionChecked] = useState(false);
  const [solutionCorrected, setSolutionCorrected] = useState(false);

  const performCrossover = (firstParentSolution, secondParentSolution) => {
    setCreatedSolution(
      [...firstParentSolution.slice(0, tspProblemSize / 2).map((location, i) => ({
        id: i,
        value: location.value,
        backgroundColor: location.backgroundColor
      })), ...secondParentSolution.slice(tspProblemSize / 2, tspProblemSize).map((location, i) => ({
        id: i + tspProblemSize / 2,
        value: location.value,
        backgroundColor: location.backgroundColor
      }))])

    setSolutionCreated(true);
  }

  const isLocationDuplicated = (index, locationsInSolution, location) => {
    //duplicates possibly present only in solution's second half - only one child is created here
    return (index < tspProblemSize / 2) ? false :
      locationsInSolution.indexOf(location.value) != locationsInSolution.lastIndexOf(location.value);
  }

  const checkSolution = () => {
    let locationsInSolution = [];  //value = location
    createdSolution.forEach((location) => {
      locationsInSolution.push(location.value)
    })

    setCreatedSolution(
      [...createdSolution.map((location, i) => ({
        ...location,
        backgroundColor: isLocationDuplicated(i, locationsInSolution, location) ? 'red' : ''
      }))])

    setSolutionChecked(true)
  }

  const correctSolution = (createdSolution) => {
    let locationsInSolution = [];

    createdSolution.forEach((obj) => {
      locationsInSolution.push(obj.value)
    })

    let solutionWithNoDuplicates = [...new Set(locationsInSolution)];
    let allLocationsSequence = Array.from(Array(tspProblemSize + 1).keys());
    allLocationsSequence.shift() //skip 0

    let missingLocations = allLocationsSequence.filter(location => !solutionWithNoDuplicates.includes(location));
    let correctedSolution = [...solutionWithNoDuplicates.map((value, i) => ({
      id: i,
      value: value
    })), ...missingLocations.map((value, i) => ({
      id: i + solutionWithNoDuplicates.length,
      backgroundColor: 'greenyellow',
      value: value
    }))]
    setCorrectedSolution(correctedSolution)
    setSolutionCorrected(true)
  }

  const renderSolution = (tspSolution) => {
    return tspSolution.map((location) => {
      return (
        <FlipMoveListItem
          key={location.id}
          index={location.id}
          value={location.value}
          style={{ backgroundColor: location.backgroundColor }}
        />
      );
    });
  }

  return (
    <Modal.Body>
      <Row>
        <Col className="page-column" lg="12">
          <Row className="fade-in-image description-field" style={{ height: '45%' }}>
            {returnOnePointCrossoverPageDesc()}
          </Row>

          <Row className="fade-in-image interactive-field" style={{ height: '12.5%' }}>
            <FlipMoveWrapper style={{ paddingInlineStart: '1px', marginBottom: '0px' }}>
              {renderSolution(firstParentSolution)}
            </FlipMoveWrapper>
          </Row>

          <Row className="fade-in-image interactive-field" style={{ height: '12.5%' }}>
            {solutionCreated ? null :
              <Button
                className="crossover-page-button"
                variant="primary" onClick={() => performCrossover(firstParentSolution, secondParentSolution)}>
                Perform crossover
              </Button>
            }

            <FlipMoveWrapper style={{ paddingInlineStart: '1px', marginBottom: '0px' }}>
              {renderSolution(secondParentSolution)}
            </FlipMoveWrapper>
          </Row>

          <Row className="fade-in-image interactive-field" style={{ height: '12.5%' }}>
            {solutionCreated && !solutionChecked ?
              <Button
                className="crossover-page-button"
                variant="primary" onClick={() => checkSolution()}>
                Check correctness
              </Button> : null
            }

            {solutionChecked && !solutionCorrected ?
              <Button
                className="crossover-page-button"
                variant="primary" onClick={() => correctSolution(createdSolution)}>
                Correct solution
              </Button>
              : null
            }

            <FlipMoveWrapper duration="1000" style={{ paddingInlineStart: '1px', marginBottom: '0px' }}>
              {renderSolution(createdSolution)}
            </FlipMoveWrapper>
          </Row>

          <Row className="fade-in-image interactive-field" style={{ height: '12.5%' }}>
            <FlipMoveWrapper duration="1000" style={{ paddingInlineStart: '1px', marginBottom: '0px' }}>
              {renderSolution(correctedSolution)}
            </FlipMoveWrapper>
          </Row>
        </Col>
      </Row>
    </Modal.Body>
  );
};

export default OnePointCrossoverPage;