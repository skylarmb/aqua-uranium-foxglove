import { type ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import type { LLMResponse } from "../types";

type Page = "visualization" | "upload";
export interface ResponsesContextType {
  responses: LLMResponse[];
  setResponses: (r: LLMResponse[]) => void;
  page: Page;
  setPage: (p: Page) => void;
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
  const [page, setPage] = useState<"upload" | "visualization">("upload");

  return (
    <ResponsesContext.Provider
      value={{ responses, setResponses, page, setPage }}
    >
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
