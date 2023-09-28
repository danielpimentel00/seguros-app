import { useState } from "react";
import "./App.css";
import SolicitarSeguroComponent from "./components/solicitar-seguro/solicitar-seguro.component";
import ConsultarSeguroComponent from "./components/consultar-seguro/consultar-seguro.component";

function App() {
  const [view, setView] = useState<"create" | "consult">("create");

  return (
    <div className="app">
      <button
        onClick={() =>
          setView((prevState) =>
            prevState === "create" ? "consult" : "create"
          )
        }
      >
        {view === "create" ? "Consultar" : "Crear"}
      </button>
      {view === "create" ? (
        <SolicitarSeguroComponent />
      ) : (
        <ConsultarSeguroComponent />
      )}
    </div>
  );
}

export default App;
