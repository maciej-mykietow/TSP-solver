import React from "react";
import ReactTooltip from 'react-tooltip';
import './ResultsPanel.scss'

import { Card } from "react-bootstrap";

const ResultsPanel = ({ generationNumber, currentFitness, bestFitness }) => {
  return (
    <Card>
      <Card.Body>
        <div>
          <h4>
            Generation number
          </h4>
          <h4 className="panel-div-value">
            {generationNumber}
          </h4>
          <hr />
        </div>

        <div>
          <h4>
            Best solution in generation
          </h4>
          <h4 className="panel-div-value">
            {currentFitness}
          </h4>
          <hr />
        </div>

        <div>
          <h4>
            Best solution found
            <ReactTooltip />
            <span className="tooltip-span"
              data-tip="This value persists through consecutive runs for comparison">
              <i className="fa fa-info-circle"/>
            </span>
          </h4>
          <h4 className="panel-div-value">
            {bestFitness}
          </h4>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ResultsPanel;