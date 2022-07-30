import React, { useState } from 'react';

import { Modal } from 'react-bootstrap';
import { Button, Row, Col } from "react-bootstrap";
import FlipMoveListItem from '../FlipMoveListItem/FlipMoveListItem';
import FlipMoveWrapper from '../FlipMoveWrapper/FlipMoveWrapper';
import { returnTournamentSelectPageDesc } from '../PagesDescriptions/PagesDescriptions'
import '../VisualizationModal/VisualizationModal.scss'
import './TournamentSelectPage.scss';
import { generateArrayOfRandomSolutionsWithFitnessInRange, generateArrayOfRandomNumbersInRange } from '../utils'; 

//sort asc fitness-wise 
const selectAndSortSolutionsInTournament = (solutionsInCurrentGeneration) => {
  return (solutionsInCurrentGeneration.filter(solution => {
    return solution.inTournament
  }).sort((a, b) => {
    return a.value - b.value;
  }));
}

const markSolutionsInTournamentAsMarked = (solutionsInCurrentGeneration, indexesOfSolutionsInTournament) => {
  solutionsInCurrentGeneration.forEach(solution => {
    solution.bestInTournament = false;

    indexesOfSolutionsInTournament.includes(solution.id) ?
      solution.inTournament = true :
      solution.inTournament = false;
  })
}

const TournamentSelectPage = () => {
  const populationSize = 9;
  const tournamentSize = 3;
  const minFitness = 15000;
  const maxFitness = 80000;
  const [solutionsInCurrentGeneration] = useState(generateArrayOfRandomSolutionsWithFitnessInRange(populationSize, minFitness, maxFitness));
  const [solutionsInNewGeneration, setSolutionsInNewGeneration] = useState([]);

  const selectSolution = (solutionsInCurrentGeneration, solutionsInNewGeneration) => {
    if (solutionsInNewGeneration.length == solutionsInCurrentGeneration.length) return;

    let indexesOfSolutionsInTournament = generateArrayOfRandomNumbersInRange(tournamentSize, populationSize);
    markSolutionsInTournamentAsMarked(solutionsInCurrentGeneration, indexesOfSolutionsInTournament)
    let solutionsInTournament = selectAndSortSolutionsInTournament(solutionsInCurrentGeneration)
    //first solution - the shortest path
    solutionsInTournament[0].bestInTournament = true;
    let updatedNewGeneration = solutionsInNewGeneration.concat(
      [{ id: solutionsInNewGeneration.length, value: solutionsInTournament[0].value }]);

    setSolutionsInNewGeneration(updatedNewGeneration)
  }

  const renderSolutions = (solutions) => {
    return solutions.map((solution, i) => {
      return (
        <FlipMoveListItem
          key={solution.id}
          listItemClass={solution.inTournament ?
            solution.bestInTournament ? "solutionItem InTournament" : "solutionItem InTournamentSelected"
            : "solutionItem"}
          index={i}
          {...solution}
        />
      );
    });
  }

  return (
    <Modal.Body>
      <Row>
        <Col className="page-column" lg="12">
          <Row className="fade-in-image description-field" style={{ height: '50%' }}>
            {returnTournamentSelectPageDesc()}
          </Row>

          <Row className="fade-in-image interactive-field" style={{ height: '20%' }}>
            <FlipMoveWrapper style={{paddingInlineStart: '1px', marginBottom: '0px'}}>
              {renderSolutions(solutionsInCurrentGeneration)}
            </FlipMoveWrapper>
          </Row>

          <Row className="fade-in-image interactive-field" style={{ height: '20%' }}>
            {solutionsInCurrentGeneration.length == solutionsInNewGeneration.length ? null :
              <Button
                className="select-solution-button" variant="primary"
                onClick={() => selectSolution(solutionsInCurrentGeneration, solutionsInNewGeneration)}>
                Select
              </Button>
            }

            <FlipMoveWrapper style={{paddingInlineStart: '1px', marginBottom: '0px'}}>
              {renderSolutions(solutionsInNewGeneration)}
            </FlipMoveWrapper>
          </Row>
        </Col>
      </Row>
    </Modal.Body>
  );
};

export default TournamentSelectPage;