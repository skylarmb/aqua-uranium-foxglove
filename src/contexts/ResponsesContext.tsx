import { type ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import type { LLMResponse } from "../types";

export interface ResponsesContextType {
  responses: LLMResponse[];
  setResponses: (r: LLMResponse[]) => void;
}

const ResponsesContext = createContext<ResponsesContextType | undefined>(
  undefined,
);

export const ResponsesContextProvder = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [responses, setResponses] = useState<LLMResponse[]>([]); // TODO: unknown
  return (
    <ResponsesContext.Provider value={{ responses, setResponses }}>
      {children}
    </ResponsesContext.Provider>
  );
};

export const useResponses = () => {
  const context = useContext(ResponsesContext);
  if (context == null) {
    throw new Error(
      "useResponses must be use within a ResponsesContextProvder",
    );
  }
  return context;
};

export default ResponsesContext;
