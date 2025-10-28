import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react";
import { createContext } from "react";
import type { LLMResponse, DataSet } from "../types";

type Page = "visualization" | "upload";
export interface ResponsesContextType {
  responses: LLMResponse[];
  setResponses: (r: LLMResponse[]) => void;
  page: Page;
  setPage: Dispatch<SetStateAction<Page>>;
  dataSets: DataSet[];
  setDataSets: Dispatch<SetStateAction<DataSet[]>>;
  currentDataSetId: string | null;
  setCurrentDataSetId: Dispatch<SetStateAction<string | null>>;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<ResponsesContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentDataSetId, setCurrentDataSetId] = useState<string | null>(null);
  const [dataSets, setDataSets] = useState<DataSet[]>([]);
  const [responses, setResponses] = useState<LLMResponse[]>([]); // TODO: unknown
  const [page, setPage] = useState<"upload" | "visualization">("upload");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        responses,
        setResponses,
        page,
        setPage,
        dataSets,
        setDataSets,
        currentDataSetId,
        setCurrentDataSetId,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useResponses = () => {
  const context = useContext(AppContext);
  if (context == null) {
    throw new Error("useResponses must be use within a AppContextProvder");
  }
  return context;
};

export default AppContext;
