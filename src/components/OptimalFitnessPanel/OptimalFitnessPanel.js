import React from "react";
import { Card } from "react-bootstrap";

const OptimalFitnessPanel = ({ optimalFitness }) => {
  return (
    <Card>
      <Card.Body>
        <div>
          <h4 style={{ width: "100%" }}>Optimal solution</h4>
          <h4 style={{ textAlign: "right" }}>
            {Math.round(optimalFitness)} km
          </h4>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OptimalFitnessPanel;
