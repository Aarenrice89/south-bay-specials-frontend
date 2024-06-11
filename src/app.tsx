import { useState } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@mui/material";
import GoogleMap from "./components/GoogleMap/map";
import AddLocationModal from "./components/AddLocationModal/add-location-modal";

const App = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setOpen(!open)}>Test me out</Button>
      <AddLocationModal open={open} setOpen={setOpen}>
        <GoogleMap />
      </AddLocationModal>
    </>
  );
};

export default App;

export function renderToDom(container: HTMLElement) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
