import React from "react";
import './ParamsSetupPanel.scss'
import 'rc-slider/assets/index.css';

import { Button, Card, Row, Col } from "react-bootstrap";
import Slider from 'rc-slider';

const ParamsSetupPanel = (props) => {
  return (
    <Row>
      <Col lg="4" sm="6">
        <Card className="card-stats">
          <Card.Body>
            <Row className="card-body-row">
              <Col xs="3" className="card-stats-img-container-col">
                <div>
                  <img src={require('assets/png/004-blur.png').default}
                    alt="fire"
                    className="card-stats-icon" />
                </div>
              </Col>
              <Col xs="9" className="card-stats-slider-col">
                <p className="card-category">{props.populationSize}</p>
                <Card.Title as="h4" className="card-stats-title">Population size</Card.Title>
                <Slider
                  value={props.populationSize}
                  onChange={props.setPopulationSize}
                  disabled={props.isRunning}
                  min={10}
                  max={1000}
                  step={10}
                  marks={{ 10: 10, 1000: 1000 }}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>

      <Col lg="4" sm="6">
        <Card className="card-stats">
          <Card.Body>
            <Row className="card-body-row">
              <Col xs="3" className="card-stats-img-container-col">
                <img src={require('assets/png/002-clock.png').default}
                  alt="fire"
                  className="card-stats-icon" />
              </Col>
              <Col xs="9" className="card-stats-slider-col">
                <p className="card-category">{props.generationCount}</p>
                <Card.Title as="h4" className="card-stats-title">Generations count</Card.Title>
                <Slider
                  value={props.generationCount}
                  onChange={props.setGenerationCount}
                  disabled={props.isRunning}
                  min={100}
                  max={10000}
                  step={100}
                  marks={{ 100: 100, 10000: 10000 }}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>

      <Col lg="4" sm="6">
        <Card className="card-stats">
          <Card.Body>
            <Row className="card-body-row">
              <Col xs="3" className="card-stats-img-container-col">
                <img src={require('assets/png/005-ranking.png').default}
                  alt="fire"
                  className="card-stats-icon" />
              </Col>
              <Col xs="9" className="card-stats-slider-col">
                <p className="card-category">{props.tournamentSize}</p>
                <Card.Title as="h4" className="card-stats-title">Tournament size</Card.Title>
                <Slider
                  value={props.tournamentSize}
                  onChange={props.setTournamentSize}
                  disabled={props.isRunning}
                  min={1}
                  max={30}
                  step={1}
                  marks={{ 1: 1, 30: 30 }}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>

      <Col lg="4" sm="6">
        <Card className="card-stats">
          <Card.Body>
            <Row className="card-body-row">
              <Col xs="3" className="card-stats-img-container-col">
                <img src={require('assets/png/001-mix.png').default}
                  alt="fire"
                  className="card-stats-icon" />
              </Col>
              <Col xs="9" className="card-stats-slider-col">
                <p className="card-category">{props.crossingChance}</p>
                <Card.Title as="h4" className="card-stats-title">Crossing chance</Card.Title>
                <Slider
                  value={props.crossingChance}
                  onChange={props.setCrossingChance}
                  disabled={props.isRunning}
                  min={0}
                  max={100}
                  step={1}
                  marks={{ 0: 0, 100: 100 }}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>

      <Col lg="4" sm="6">
        <Card className="card-stats">
          <Card.Body>
            <Row className="card-body-row">
              <Col xs="3" className="card-stats-img-container-col">
                <img src={require('assets/png/003-reuse.png').default}
                  alt="fire"
                  className="card-stats-icon" />
              </Col>
              <Col xs="9" className="card-stats-slider-col">
                <p className="card-category">{props.mutationChance}</p>
                <Card.Title as="h4" className="card-stats-title">Mutation chance</Card.Title>
                <Slider
                  value={props.mutationChance}
                  onChange={props.setMutationChance}
                  disabled={props.isRunning}
                  min={0}
                  max={100}
                  step={1}
                  marks={{ 0: 0, 100: 100 }}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>

      <Col lg="4" sm="6">
        <Card className="card-stats">
          <Card.Body>
            <Row className="button-card-row">
              <Col>
                <Button
                  variant="primary" disabled={props.isRunning} onClick={props.startWorker}>
                  Run
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default ParamsSetupPanel;