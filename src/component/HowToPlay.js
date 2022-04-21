import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import "./HowToPlay.scss";

const HowToPlay = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  return (
    <div className="how-to-play">
      <button onClick={handleShow}>How To Play</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Guess the mystery person!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>You get eight guesses.</li>
            <li>
              <span className="green">Green in any column</span> indicates a
              match!
            </li>
            <li>
              <span className="yellow">
                Yellow in the <strong>residence</strong> column
              </span>{" "}
              indicates that the mystery person once lived in that area, but
              does not currently.
            </li>
            <li>
              <span className="yellow">
                Yellow in the <strong>LoL positions</strong> column
              </span>{" "}
              indicates a partial match to the mystery person's preferred LoL
              position.
            </li>
            <li>
              <span className="yellow">Yellow in any other column</span>{" "}
              indicates the attribute is within 2 (inches, years) of the mystery
              player.
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HowToPlay;
