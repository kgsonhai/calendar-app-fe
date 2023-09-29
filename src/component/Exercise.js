const Exercise = ({ exercise }) => {
  return (
    <div className="exercise-container">
      <div className="exercise-infor">
        <div className="exercise-name">{exercise.exerciseName}</div>
        <div className="sets">{exercise.sets}</div>
      </div>
      <div className="number-of-sets">{exercise.numberOfSets}</div>
    </div>
  );
};

export default Exercise;
