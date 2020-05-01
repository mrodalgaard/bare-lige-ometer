import React from "react";
import CornerBanner from "./CornerBanner";
import Input from "./Input";
import Meter from "./Meter";
import ShareButton from "./ShareButton";
import Title from "./Title";

const App = () => {
  return (
    <div>
      <ShareButton />
      <CornerBanner />
      <Title />
      <Input />
      <Meter />
    </div>
  );
};

export default App;
