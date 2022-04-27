import "./Guesses.scss";

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
  compareName,
  // compareGender,
  compareResidence,
  compareLoLPos,
  compareHeight,
  compareAge,
} from "../lib/compare";

const Guesses = (props) => {
  const { answerPerson, guesses } = props;

  const renderGuess = (guessPerson, idx) => {
    // Name
    const nameEl = renderName(guessPerson[nameHeader]);

    // Gender
    // const genderEl = renderGender(guessPerson[genderHeader]);

    //  residence
    const residenceEl = renderResidence(guessPerson[residenceHeader]);

    // LoL Position
    const lolPosEl = renderLoLPos(guessPerson[lolPosHeader]);

    // Height
    const heightEl = renderHeight(guessPerson[heightHeader]);

    // Age
    const ageEl = renderAge(guessPerson[birthdayHeader]);

    return (
      <div className="guess" key={idx}>
        {nameEl}
        {/*{genderEl}*/}
        {residenceEl}
        {lolPosEl}
        {heightEl}
        {ageEl}
      </div>
    );
  };

  const renderName = (guessName) => {
    const comparison = compareName(guessName, answerPerson[nameHeader]);

    return (
      <div className={`information name ${comparison.accuracy}`}>
        {guessName}
      </div>
    );
  };

  // const renderGender = (guessGender) => {
  //   const comparison = compareGender(guessGender, answerPerson[genderHeader]);
  //
  //   return (
  //     <div className={`information gender ${comparison.accuracy}`}>
  //       {guessGender}
  //     </div>
  //   );
  // };

  const renderResidence = (guessResidence) => {
    const comparison = compareResidence(
      guessResidence,
      answerPerson[residenceHeader],
      answerPerson[pastResidenceHeader]
    );

    return (
      <div className={`information residence ${comparison.accuracy}`}>
        {guessResidence}
      </div>
    );
  };

  const renderLoLPos = (guessLoLPos) => {
    const comparison = compareLoLPos(guessLoLPos, answerPerson[lolPosHeader]);

    return (
      <div className={`information lol-pos ${comparison.accuracy}`}>
        {guessLoLPos}
      </div>
    );
  };

  const renderHeight = (guessHeight) => {
    const comparison = compareHeight(guessHeight, answerPerson[heightHeader]);

    return (
      <div className={`information height ${comparison.accuracy}`}>
        {guessHeight} {comparison.arrow}
      </div>
    );
  };

  const renderAge = (guessBirthday) => {
    const comparison = compareAge(guessBirthday, answerPerson[birthdayHeader]);

    return (
      <div className={`information age ${comparison.accuracy}`}>
        {comparison.guessAge} {comparison.arrow}
      </div>
    );
  };

  const createHeaders = () => {
    return (
      <div className="header-row">
        <div className="header name">Name</div>
        {/*<div className="header gender">Gender</div>*/}
        <div className="header residence">Residence</div>
        <div className="header lol-pos">LoL Positions</div>
        <div className="header height">Height</div>
        <div className="header age">Age</div>
      </div>
    );
  };

  return (
    <div className="guesses">
      {guesses.length > 0 ? createHeaders() : ""}
      {guesses.map((guessPerson, idx) => {
        return renderGuess(guessPerson, idx);
      })}
    </div>
  );
};

export default Guesses;
