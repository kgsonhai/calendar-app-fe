import Exercise from "./Exercise";

const Workout = ({ workout, day, workoutIndex, data, setData }) => {
  const addNewExercise = () => {
    const newExercise = {
      exerciseName: "New Exercise",
      sets: "50 lb x 5",
      numberOfSets: "1x",
    };
    data[day][workoutIndex].exercises.push(newExercise);
    setData({ ...data });
  };

  return (
    <div className="workout-container">
      <div className="workout-header">
        <div className="workout-name">{workout.workoutName}</div>
        <div className="workout-header__icon">
          <img src="/elipsis-icon.svg" alt="Elipsis icon" />
        </div>
      </div>
      {workout.exercises.map((exercise, exerciseIndex) => (
        <div
          key={exerciseIndex}
          onDragStart={(e) => {
            e.dataTransfer.setData(
              "text/plain",
              `${day},${workoutIndex},${exerciseIndex}`
            );
          }}
          draggable
          className="exercise-wrapper"
        >
          <Exercise exercise={exercise} />
        </div>
      ))}
      <div className="add-new-exercise" onClick={addNewExercise}>
        <img src="/add-icon.svg" alt="add icon" />
      </div>
    </div>
  );
};

export default Workout;
