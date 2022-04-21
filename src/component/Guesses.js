import "./Guesses.scss";

const Guesses = (props) => {
  const { answerPerson, guesses } = props;

  const renderGuess = (guessPerson, idx) => {
    // Name
    const nameEl = compareName(guessPerson["Name"]);

    // Gender
    const genderEl = compareGender(guessPerson["Gender"]);

    //  residence
    const residenceEl = compareResidence(guessPerson["Residence"]);

    // LoL Position
    const lolPosEl = compareLolPos(guessPerson["LoL Position"]);

    // Height
    const heightEl = compareHeight(guessPerson["Height"]);

    // Age
    const ageEl = compareAge(guessPerson["Birthday"]);

    return (
      <div className="guess" key={idx}>
        {nameEl}
        {genderEl}
        {residenceEl}
        {lolPosEl}
        {heightEl}
        {ageEl}
      </div>
    );
  };

  const compareName = (guessName) => {
    const nameAccuracy =
      guessName === answerPerson["Name"] ? "correct" : "incorrect";
    return (
      <div className={`information name ${nameAccuracy}`}>{guessName}</div>
    );
  };

  const compareGender = (guessGender) => {
    const genderAccuracy =
      guessGender === answerPerson["Gender"] ? "correct" : "incorrect";
    return (
      <div className={`information gender ${genderAccuracy}`}>
        {guessGender}
      </div>
    );
  };

  const compareResidence = (guessResidence) => {
    let residenceAccuracy;
    if (guessResidence === answerPerson["Residence"]) {
      residenceAccuracy = "correct";
    } else if (
      answerPerson["Previous Residence"].split(", ").indexOf(guessResidence) !==
      1
    ) {
      residenceAccuracy = "close";
    } else {
      residenceAccuracy = "incorrect";
    }
    return (
      <div className={`information residence ${residenceAccuracy}`}>
        {guessResidence}
      </div>
    );
  };

  const compareLolPos = (guessLoLPos) => {
    const answerLoLPos = answerPerson["LoL Position"];
    let lolPosAccuracy;
    if (guessLoLPos === answerLoLPos) {
      lolPosAccuracy = "correct";
    } else {
      const guessLoLPoses = guessLoLPos.split(", ");
      const answerLoLPoses = answerLoLPos.split(", ");
      const hasPosIntersection = guessLoLPoses.some((pos) =>
        answerLoLPoses.includes(pos)
      );

      lolPosAccuracy = hasPosIntersection ? "close" : "incorrect";
    }
    return (
      <div className={`information lol-pos ${lolPosAccuracy}`}>
        {guessLoLPos}
      </div>
    );
  };

  const compareHeight = (guessHeight) => {
    let heightAccuracy, heightArrow;
    const answerHeight = answerPerson["Height"];

    if (guessHeight === answerHeight) {
      heightAccuracy = "correct";
    } else {
      const [guessFt, guessIn] = guessHeight.slice(0, -1).split("'");
      const [answerFt, answerIn] = answerHeight.slice(0, -1).split("'");

      const guessHeightIn = parseInt(guessFt) * 12 + parseInt(guessIn);
      const answerHeightIn = parseInt(answerFt) * 12 + parseInt(answerIn);

      heightArrow = guessHeightIn > answerHeightIn ? "\u2193" : "\u2191";

      if (Math.abs(guessHeightIn - answerHeightIn) <= 2) {
        heightAccuracy = "close";
      } else {
        heightAccuracy = "incorrect";
      }
    }

    return (
      <div className={`information height ${heightAccuracy}`}>
        {guessHeight} {heightArrow}
      </div>
    );
  };

  const compareAge = (guessBirthday) => {
    const guessAge = getAge(guessBirthday);
    const answerAge = getAge(answerPerson["Birthday"]);
    let ageAccuracy, ageArrow;

    if (guessAge === answerAge) {
      ageAccuracy = "correct";
    } else {
      ageArrow = guessAge > answerAge ? "\u2193" : "\u2191";

      if (Math.abs(guessAge - answerAge) <= 2) {
        ageAccuracy = "close";
      } else {
        ageAccuracy = "incorrect";
      }
    }

    return (
      <div className={`information age ${ageAccuracy}`}>
        {guessAge} {ageArrow}
      </div>
    );
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

  const createHeaders = () => {
    return (
      <div className="header-row">
        <div className="header name">Name</div>
        <div className="header gender">Gender</div>
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
