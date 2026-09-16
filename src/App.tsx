import { JSX } from "react";
import { Routes, Route } from "react-router";
import Index from "pages/index";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
    </Routes>
  );
}

export default App;
