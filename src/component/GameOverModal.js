import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Modal } from "react-bootstrap";

const nameHeader = "Full Name (discord or LoL screen name)";
const genderHeader = "Gender";
const residenceHeader = "Where do you live?";
const pastResidenceHeader = "Please check the areas you previously lived";
const lolPosHeader = "Preferred League of Legends position (Summoner's Rift)";
const heightHeader = "How tall are you?";
const birthdayHeader = "When were you born?";

const GameOverModal = (props) => {
  const { showModal, setShowModal, answerPerson, guesses } = props;
  const [isCopied, setIsCopied] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  // FIXME: Surely there's a better way to do this, but I'm just gonna copy paste it for now to get it working.
  const getGenderAccuracy = (guessGender) => {
    return guessGender === answerPerson[genderHeader] ? "🟩" : "⬛";
  };

  const getResidenceAccuracy = (guessResidence) => {
    if (guessResidence === answerPerson[residenceHeader]) {
      return "🟩";
    } else if (
      answerPerson[pastResidenceHeader].split(", ").indexOf(guessResidence) !==
      1
    ) {
      return "🟨";
    } else {
      return "⬛";
    }
  };

  const getLolPosAccuracy = (guessLoLPos) => {
    const answerLoLPos = answerPerson[lolPosHeader];
    if (guessLoLPos === answerLoLPos) {
      return "🟩";
    } else {
      const guessLoLPoses = guessLoLPos.split(", ");
      const answerLoLPoses = answerLoLPos.split(", ");
      const hasPosIntersection = guessLoLPoses.some((pos) =>
        answerLoLPoses.includes(pos)
      );

      return hasPosIntersection ? "🟨" : "⬛";
    }
  };

  const getHeightAccuracy = (guessHeight) => {
    const answerHeight = answerPerson[heightHeader];

    if (guessHeight === answerHeight) {
      return "🟩";
    } else {
      const [guessFt, guessIn] = guessHeight.slice(0, -1).split("'");
      const [answerFt, answerIn] = answerHeight.slice(0, -1).split("'");

      const guessHeightIn = parseInt(guessFt) * 12 + parseInt(guessIn);
      const answerHeightIn = parseInt(answerFt) * 12 + parseInt(answerIn);

      if (Math.abs(guessHeightIn - answerHeightIn) <= 2) {
        return "🟨";
      } else {
        return "⬛";
      }
    }
  };

  const getAgeAccuracy = (guessBirthday) => {
    const guessAge = getAge(guessBirthday);
    const answerAge = getAge(answerPerson[birthdayHeader]);

    if (guessAge === answerAge) {
      return "🟩";
    } else {
      if (Math.abs(guessAge - answerAge) <= 2) {
        return "🟨";
      } else {
        return "⬛";
      }
    }
  };

  const getAge = (birthdayStr) => {
    const today = new Date();
    const birthDate = new Date(birthdayStr);

    const yearsDifference = today.getFullYear() - birthDate.getFullYear();

    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      return yearsDifference - 1;
    }

    return yearsDifference;
  };

  let accuracyRecord = "";
  guesses.forEach((guessPerson, idx) => {
    // Gender
    const genderAccuracy = getGenderAccuracy(guessPerson[genderHeader]);

    //  residence
    const residenceAccuracy = getResidenceAccuracy(
      guessPerson[residenceHeader]
    );

    // LoL Position
    const lolPosAccuracy = getLolPosAccuracy(guessPerson[lolPosHeader]);

    // Height
    const heightAccuracy = getHeightAccuracy(guessPerson[heightHeader]);

    // Age
    const ageAccuracy = getAgeAccuracy(guessPerson[birthdayHeader]);

    accuracyRecord += `${genderAccuracy}${residenceAccuracy}${lolPosAccuracy}${heightAccuracy}${ageAccuracy}\n`;
  });

  const shareButtonText = `TKwordle\nhttps://bonbonlemon.github.io/TKwordle/\n\n${accuracyRecord}\n`;

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
