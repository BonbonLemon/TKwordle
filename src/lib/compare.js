export const compareName = (guessName, answerName) => {
  const accuracy = guessName === answerName ? "correct" : "incorrect";

  return { accuracy };
};

export const compareGender = (guessGender, answerGender) => {
  const accuracy = guessGender === answerGender ? "correct" : "incorrect";

  return { accuracy };
};

export const compareResidence = (
  guessResidence,
  answerResidence,
  answerPastResidence
) => {
  let accuracy;

  if (guessResidence === answerResidence) {
    accuracy = "correct";
  } else if (answerPastResidence.split(", ").indexOf(guessResidence) !== -1) {
    accuracy = "close";
  } else {
    accuracy = "incorrect";
  }

  return { accuracy };
};

export const compareLoLPos = (guessLoLPos, answerLoLPost) => {
  const answerLoLPos = answerLoLPost;
  let accuracy;

  if (guessLoLPos === answerLoLPos) {
    accuracy = "correct";
  } else {
    const guessLoLPoses = guessLoLPos.split(", ");
    const answerLoLPoses = answerLoLPos.split(", ");
    const hasPosIntersection = guessLoLPoses.some((pos) =>
      answerLoLPoses.includes(pos)
    );

    accuracy = hasPosIntersection ? "close" : "incorrect";
  }

  return { accuracy };
};

export const compareHeight = (guessHeight, answerHeight) => {
  let accuracy, arrow;

  if (guessHeight === answerHeight) {
    accuracy = "correct";
  } else {
    const [guessFt, guessIn] = guessHeight.slice(0, -1).split("'");
    const [answerFt, answerIn] = answerHeight.slice(0, -1).split("'");

    const guessHeightIn = parseInt(guessFt) * 12 + parseInt(guessIn);
    const answerHeightIn = parseInt(answerFt) * 12 + parseInt(answerIn);

    arrow = guessHeightIn > answerHeightIn ? "\u2193" : "\u2191";

    if (Math.abs(guessHeightIn - answerHeightIn) <= 2) {
      accuracy = "close";
    } else {
      accuracy = "incorrect";
    }
  }

  return { accuracy, arrow };
};

export const compareAge = (guessBirthday, answerBirthday) => {
  const guessAge = getAge(guessBirthday);
  const answerAge = getAge(answerBirthday);
  let accuracy, arrow;

  if (guessAge === answerAge) {
    accuracy = "correct";
  } else {
    arrow = guessAge > answerAge ? "\u2193" : "\u2191";

    if (Math.abs(guessAge - answerAge) <= 2) {
      accuracy = "close";
    } else {
      accuracy = "incorrect";
    }
  }

  return { accuracy, arrow, guessAge };
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
