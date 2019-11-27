import React from "react";

import Meter from "./Meter";
import Title from "./Title";
import CornerBanner from "./CornerBanner";
import Input from "./Input";

const App = () => {
  return (
    <div>
      <CornerBanner />
      <Title />
      <Input />
      <Meter />
    </div>
  );
};

export default App;
