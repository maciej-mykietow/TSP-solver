import React, { useState } from 'react';

import shuffle from 'lodash/shuffle';
import { Modal } from 'react-bootstrap';
import { Row, Col, Button } from "react-bootstrap";
import FlipMoveListItem from '../FlipMoveListItem/FlipMoveListItem';
import { returnRandomSolutionPageDesc } from '../PagesDescriptions/PagesDescriptions';
import FlipMoveWrapper from '../FlipMoveWrapper/FlipMoveWrapper';
import { generateArrayOfAllLocations } from '../utils';
import '../VisualizationModal/VisualizationModal.scss'
import './RandomSolutionPage.scss';

const RandomSolutionPage = () => {
  const tspProblemSize = 48;
  const [tspSolution, setTspSolution] = useState(generateArrayOfAllLocations(tspProblemSize));

  const shuffleSolution = () => setTspSolution(shuffle(tspSolution))

  const renderSolution = () => {
    return tspSolution.map((location) => {
      return (
        <FlipMoveListItem
          key={location.id}
          index={location.id}
        />
      );
    });
  }

  return (
    <Modal.Body>
      <Row>
        <Col className="page-column" lg="12">
          <Row className="fade-in-image description-field" style={{ height: '65%' }}>
            {returnRandomSolutionPageDesc()}
          </Row>

          <Row className="fade-in-image interactive-field" style={{ height: '35%' }}>
            <div>
              <Button variant="primary" onClick={shuffleSolution}
                style={{ margin: '1rem', marginTop: '1.5rem' }}>
                {"Shuffle"}
              </Button>

              <FlipMoveWrapper>
                {renderSolution()}
              </FlipMoveWrapper>
            </div>
          </Row>
        </Col>
      </Row>
    </Modal.Body>
  );
}

export default RandomSolutionPage;