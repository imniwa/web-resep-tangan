import React from "react";

function Materials(props) {
  return (
    <div className="container materials">
      <ul>
        {props.materials.map((material, idx) => (
          <li key={idx}>{material}</li>
        ))}
      </ul>
    </div>
  );
}

export default Materials;
