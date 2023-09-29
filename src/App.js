import React, { useState } from "react";
import "./App.css";
import { trainingData } from "./mockData";
import Workout from "./component/Workouts";
import { getWeekdayDate } from "./utils";

const App = () => {
  const [data, setData] = useState(trainingData);

  const addNewWorkout = (day) => {
    const newWorkout = {
      workoutName: "New Workout",
      exercises: [],
    };
    data[day].push(newWorkout);
    setData({ ...data });
  };

  const rearrangeWorkouts = (day, workoutIndex, newDay) => {
    const workout = data[day].splice(workoutIndex, 1)[0];
    data[newDay].push(workout);
    setData({ ...data });
  };

  const rearrangeExercises = (
    fromDay,
    fromWorkoutIndex,
    fromExerciseIndex,
    toDay,
    toWorkoutIndex
  ) => {
    const exercise = data[fromDay][fromWorkoutIndex].exercises.splice(
      fromExerciseIndex,
      1
    )[0];
    data[toDay][toWorkoutIndex].exercises.push(exercise);
    setData({ ...data });
  };

  const renderDayContainer = (day) => {
    const currentDate = new Date();

    return (
      <>
        <div className="day-of-week">{day}</div>
        <div
          className="day-container"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const [fromDay, fromWorkoutIndex] = e.dataTransfer
              .getData("text/plain")
              .split(",");
            rearrangeWorkouts(fromDay, fromWorkoutIndex, day);
          }}
        >
          <div className="day-header">
            <div
              className={`day-of-month ${
                currentDate.getDay() === getWeekdayDate(day).getDay() && "today"
              }`}
            >
              {getWeekdayDate(day).toLocaleDateString("en", { day: "2-digit" })}
            </div>
            <div className="add-new-workout" onClick={() => addNewWorkout(day)}>
              <img src="/add-icon.svg" alt="add icon" />
            </div>
          </div>

          {data[day].map((workout, workoutIndex) => (
            <div
              key={workoutIndex}
              onDragStart={(e) => {
                e.stopPropagation();
                e.dataTransfer.setData("text/plain", `${day},${workoutIndex}`);
              }}
              draggable
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.stopPropagation();
                const [fromDay, fromWorkoutIndex, fromExerciseIndex] =
                  e.dataTransfer.getData("text/plain").split(",");
                rearrangeExercises(
                  fromDay,
                  fromWorkoutIndex,
                  fromExerciseIndex,
                  day,
                  workoutIndex
                );
              }}
              className="workout-wrapper"
            >
              <Workout
                workout={workout}
                day={day}
                workoutIndex={workoutIndex}
                data={data}
                setData={setData}
              />
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="calendar">
      {Object.keys(data).map((day) => {
        return <div key={day}>{renderDayContainer(day)}</div>;
      })}
    </div>
  );
};

export default App;
