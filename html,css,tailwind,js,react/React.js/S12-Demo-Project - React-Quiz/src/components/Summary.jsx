import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTION from "../questions";

export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTION[index].answers[0]
  );
  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );
  const correctAnswersShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
  );
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="'number">{skippedAnswersShare}%</span>
          <span className="'text">skipped</span>
        </p>
        <p>
          <span className="'number">{correctAnswersShare}%</span>
          <span className="'text">answered correctly</span>
        </p>
        <p>
          <span className="'number">{wrongAnswersShare}%</span>
          <span className="'text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssclass = "user-answer";

          if (answer === null) {
            cssclass += " skipped";
          } else if (answer === QUESTION[index].answers[0]) {
            cssclass += " correct";
          } else {
            cssclass += " wrong";
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTION[index].text}</p>
              <p className={cssclass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
