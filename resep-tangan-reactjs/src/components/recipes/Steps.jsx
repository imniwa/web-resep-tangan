import React from "react";
import Step from "./Step";
function Steps(props) {
  //   console.log(props.steps);
  return (
    <div>
      <ul>
        {props.steps.map((step) => (
          <Step
            key={step.id}
            count={step.id}
            step={step.step}
            media={step.media.path}
          />
        ))}
      </ul>
    </div>
  );
}

export default Steps;
