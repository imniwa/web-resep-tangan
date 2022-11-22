import React from "react";

function Step(props) {
  //   console.log(props.media);
  return (
    <div>
      <li>
        step {props.count}: {props.step}
      </li>
      <div className="img flex gap-5">
        {props.media.map((img, idx) => (
          <img key={idx} src={img} alt="" />
        ))}
      </div>
    </div>
  );
}

export default Step;
