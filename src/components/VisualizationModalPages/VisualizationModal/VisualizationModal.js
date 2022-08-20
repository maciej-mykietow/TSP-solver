import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import RandomSolutionPage from "../RandomSolutionPage/RandomSolutionPage";
import TournamentSelectPage from "../TournamentSelectPage/TournamentSelectPage";
import OnePointCrossoverPage from "../OnePointCrossoverPage/OnePointCrossoverPage";
import InverseMutationPage from "../InverseMutationPage/InverseMutationPage";
import "../VisualizationModal/VisualizationModal.scss";

const numberOfPages = 4;

const VisualizationModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const handleClose = () => setIsOpen(false);

  const renderNextPageButton = (currentPage) => {
    return (
      <Button variant="primary" onClick={() => setCurrentPage(currentPage + 1)}>
        Next
      </Button>
    );
  };

  const renderStartSolverButton = () => {
    return (
      <Button variant="success" onClick={() => setIsOpen(false)}>
        Start solver
      </Button>
    );
  };

  const conditionalButtonRender = (currentPage) => {
    if (currentPage == numberOfPages) return renderStartSolverButton();
    else return renderNextPageButton(currentPage);
  };

  const renderRandomSolutionPage = () => <RandomSolutionPage />;
  const renderTournamentSelectPage = () => <TournamentSelectPage />;
  const renderOnePointCrossoverPage = () => <OnePointCrossoverPage />;
  const renderInverseMutationPage = () => <InverseMutationPage />;

  const conditionalPageRender = (page) => {
    if (page == 1) return renderRandomSolutionPage();
    else if (page == 2) return renderTournamentSelectPage();
    else if (page == 3) return renderOnePointCrossoverPage();
    else if (page == 4) return renderInverseMutationPage();
  };

  return (
    <Modal
      show={isOpen}
      size="xl"
      onHide={handleClose}
      style={{ width: "100%", transform: "none" }}
    >
      <Modal.Header closeButton />
      {conditionalPageRender(currentPage)}
      <Modal.Footer style={{ justifyContent: "right" }}>
        {conditionalButtonRender(currentPage)}
      </Modal.Footer>
    </Modal>
  );
};

export default VisualizationModal;
