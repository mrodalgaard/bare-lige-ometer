import React from "react";

import Meter from "./Meter";
import Title from "./Title";
import CornerBanner from "./CornerBanner";
import Input from "./Input";
import ShareButton from "./ShareButton";

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
