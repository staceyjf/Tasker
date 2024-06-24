import { createContext, useEffect, useState } from "react";
import { ColourResponse } from "../services/api-responses.interfaces";
import { getAllColours } from "../services/colour-services";

// the shape of the colour Context
interface ColourContext {
  colours: ColourResponse[];
  addToColours: (newColour: ColourResponse) => void;
}

// default is provided when the context is consumed without a provider
const defaults: ColourContext = {
  colours: [],
  addToColours: () => {
    throw new Error(
      "addToColours must be used within a ColoursContextProvider"
    );
  },
};
export const ColoursContext = createContext(defaults);

interface ColoursContextProviderProps {
  children: string | JSX.Element | JSX.Element[];
}

// provides colours to its children
const ColoursContextProvider = ({ children }: ColoursContextProviderProps) => {
  const [colours, setColours] = useState<ColourResponse[]>([]);

  // to add additional colours
  const addToColours = (newColour: ColourResponse): void => {
    setColours([...colours, newColour]);
  };

  useEffect(() => {
    getAllColours()
      .then((data) => setColours(data))
      .catch((e) => console.warn(e));
  }, []);

  return (
    <ColoursContext.Provider value={{ colours, addToColours }}>
      {children}
    </ColoursContext.Provider>
  );
};

export default ColoursContextProvider;
