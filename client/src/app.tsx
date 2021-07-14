import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes"
import { ErrorContext } from "./utils/context";
import { Error } from "./types/types";

const App = () => {
  const [error, setError] = useState<Error>({
    isError: false,
    message: ""
  })

  return (
    <BrowserRouter>
      <ErrorContext.Provider value={{error, setError}}>
        <AppRoutes/>
      </ErrorContext.Provider>
    </BrowserRouter>
  )
}

export default App;