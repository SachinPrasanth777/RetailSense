import React from "react";
import { Card } from "@tremor/react";
import { Link } from "react-router-dom";

const CameraCard = (props) => {
  return (
    <div>
      <Link to={`/${props.path}`}>
        <Card className="w-[600px]">
          <img src={props.thumbnail} className="w-fit" />
        </Card>
      </Link>
    </div>
  );
};

export default CameraCard;
