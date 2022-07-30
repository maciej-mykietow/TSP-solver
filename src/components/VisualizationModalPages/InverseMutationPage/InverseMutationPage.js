import React, { useState } from 'react';

import { Modal, Button } from 'react-bootstrap';
import { Row, Col } from "react-bootstrap";
import FlipMoveListItem from '../FlipMoveListItem/FlipMoveListItem';
import FlipMoveWrapper from '../FlipMoveWrapper/FlipMoveWrapper';
import { returnInverseMutationPageDesc } from '../PagesDescriptions/PagesDescriptions';
import { generateShuffledArrayOfAllLocations, generateArrayOfRandomNumbersInRange } from '../utils';
import '../VisualizationModal/VisualizationModal.scss'

const generateBoundariesOfPartToInverse = (range) => {
  let numberInRange = generateArrayOfRandomNumbersInRange(2, range);
  let boundaries = numberInRange.sort((a, b) => {
    return a - b;
  });

  return boundaries;
}

const InverseMutationPage = () => {
  const tspProblemSize = 48;
  const [partBeforeInversedPart, setPartBeforeInversedPart] = useState(generateShuffledArrayOfAllLocations(tspProblemSize));
  const [partToBeInversed, setPartToBeInversed] = useState([]);
  const [partAfterInversedPart, setPartAfterInversedPart] = useState([]);
  const [inversionBoundariesGenerated, setInversionBoundariesGenerated] = useState(false);
  const [inversionDone, setInversionDone] = useState(false);

  const choseAndMarkPartToBeInversed = (solution) => {
    let inversionBoundaries = generateBoundariesOfPartToInverse(tspProblemSize);
    let start = inversionBoundaries[0];
    let end = inversionBoundaries[1];

    setPartBeforeInversedPart(solution.slice(0, start))
    setPartToBeInversed(solution.slice(start, end + 1).map((location) => ({
      ...location, backgroundColor: "gold"
    })))
    setPartAfterInversedPart(solution.slice(end + 1, tspProblemSize))
    setInversionBoundariesGenerated(true)
  }

  const inverse = (partToBeInversed) => {
    setPartToBeInversed([...partToBeInversed.reverse()])
    setInversionDone(true)
  }

  const renderSolutionPart = (solutionPart) => {
    return solutionPart.map((location, i) => {
      return (
        <FlipMoveListItem
          key={location.id}
          index={location.id}
          value={location.value}
          style={{ backgroundColor: location.backgroundColor }} //margin
        />
      );
    });
  }

  return (
    <Modal.Body>
      <Row>
        <Col className="page-column" lg="12">
          <Row className="fade-in-image description-field" style={{ height: '50%' }}>
            {returnInverseMutationPageDesc()}
          </Row>

          <Row className="fade-in-image interactive-field" style={{ height: '40%' }}>
            <div>
              {inversionBoundariesGenerated ?
                inversionDone ? null :
                  <Button variant="primary" onClick={() => inverse(partToBeInversed)}
                    style={{ margin: '1rem', marginTop: '1.5rem' }}>
                    {"Inverse"}
                  </Button> :
                <Button variant="primary" onClick={() => choseAndMarkPartToBeInversed(partBeforeInversedPart)}
                  style={{ margin: '1rem', marginTop: '1.5rem' }}>
                  {"Pick random part to be inversed"}
                </Button>
              }

              <FlipMoveWrapper duration="1000">
                {renderSolutionPart(partBeforeInversedPart)}
                {renderSolutionPart(partToBeInversed)}
                {renderSolutionPart(partAfterInversedPart)}
              </FlipMoveWrapper>
            </div>
          </Row>
        </Col>
      </Row>
    </Modal.Body>
  );
};

export default InverseMutationPage;