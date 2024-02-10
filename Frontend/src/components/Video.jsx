import { Card } from "@tremor/react";
import { DatePicker } from "@tremor/react";

import React from "react";

const Video = (props) => {
  const url = `https://d2kzg5cjizpi8q.cloudfront.net/processed_vid/${props.videoname}`;
  
  console.log(url);

  return (
    <Card className="flex gap-8 p-10 mx-auto mt-8">
      <div>
        <video controls width="800" className="mx-auto">
          <source src={url} type="video/mp4" />
        </video>
      </div>
    </Card>
  );
};

export default Video;
