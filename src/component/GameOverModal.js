import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Modal } from "react-bootstrap";

import {
  nameHeader,
  // genderHeader,
  residenceHeader,
  pastResidenceHeader,
  lolPosHeader,
  heightHeader,
  birthdayHeader,
} from "../constants/googleDocHeaders";

import {
  // compareGender,
  compareResidence,
  compareLoLPos,
  compareHeight,
  compareAge,
} from "../lib/compare";

const GameOverModal = (props) => {
  const { showModal, setShowModal, answerPerson, guesses } = props;
  const [isCopied, setIsCopied] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  const getAccuracyTile = (accuracy) => {
    switch (accuracy) {
      case "correct":
        return "🟩";
      case "close":
        return "🟨";
      case "incorrect":
        return "⬛";
      default:
        return "⬛";
    }
  };

  let accuracyRecord = "";
  guesses.forEach((guessPerson, idx) => {
    // Gender
    // const genderAccuracyTile = getAccuracyTile(
    //   compareGender(guessPerson[genderHeader], answerPerson[genderHeader])
    //     .accuracy
    // );

    //  residence
    const residenceAccuracyTile = getAccuracyTile(
      compareResidence(
        guessPerson[residenceHeader],
        answerPerson[residenceHeader],
        answerPerson[pastResidenceHeader]
      ).accuracy
    );

    // LoL Position
    const lolPosAccuracyTile = getAccuracyTile(
      compareLoLPos(guessPerson[lolPosHeader], answerPerson[lolPosHeader])
        .accuracy
    );

    // Height
    const heightAccuracyTile = getAccuracyTile(
      compareHeight(guessPerson[heightHeader], answerPerson[heightHeader])
        .accuracy
    );

    // Age
    const ageAccuracyTile = getAccuracyTile(
      compareAge(guessPerson[birthdayHeader], answerPerson[birthdayHeader])
        .accuracy
    );

    accuracyRecord += `${residenceAccuracyTile}${lolPosAccuracyTile}${heightAccuracyTile}${ageAccuracyTile}\n`;
  });

  const shareButtonText = `TKwordle\nhttps://bonbonlemon.github.io/TKwordle/\n\n${accuracyRecord}`;

  return (
    <Modal centered show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {answerPerson ? answerPerson[nameHeader] : ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ marginBottom: 10 }}>
          You solved it in {guesses.length} guesses!
        </div>
        <CopyToClipboard
          text={shareButtonText}
          onCopy={() => {
            setIsCopied(true);
          }}
        >
          <button>Share</button>
        </CopyToClipboard>
        <div>{isCopied ? "Copied to clipboard" : ""}</div>
      </Modal.Body>
    </Modal>
  );
};

export default GameOverModal;
