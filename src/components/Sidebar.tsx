import {
  VStack,
  HStack,
  Button,
  List,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { useResponses } from "../contexts/ResponsesContext";
import { useCallback, useEffect, useState } from "react";
import { LuPencil, LuSave, LuTrash } from "react-icons/lu";
import DeleteModal from "./DeleteModal";

const Sidebar = () => {
  const { dataSets, setDataSets, setPage, setCurrentDataSetId } =
    useResponses();

  const [activeDeleteId, setActiveDeleteId] = useState<string | null>(null);
  const [activeRenameId, setActiveRenameId] = useState<string | null>(null);
  const [activeRenameValue, setActiveRenameValue] = useState<string>("");

  useEffect(() => {
    if (activeRenameId == null) {
      setActiveRenameValue("");
    }
  }, [activeRenameId]);

  const handleRename = useCallback(
    (dataSetId: string, newName: string) => {
      // TODO
      console.log(dataSetId, newName);
      const others = dataSets.filter((ds) => ds.id !== dataSetId);
      const current = dataSets.find((ds) => ds.id === dataSetId);
      if (current == null) {
        console.log(dataSetId);
        throw new Error("current dataSet is undefined");
      }
      setDataSets([...others, { ...current, name: newName }]);
      setActiveRenameId(null);
      setActiveRenameValue("");
    },
    [dataSets],
  );

  const handleDelete = useCallback((dataSetId: string) => {
    const others = dataSets.filter((ds) => ds.id !== dataSetId);
    setDataSets([...others]);
    setActiveDeleteId(null);
  }, []);

  return (
    <VStack borderRight={"1px solid #eee"}>
      <List.Root variant={"plain"}>
        {dataSets.length === 0 ? "No data sets" : null}
        {dataSets.map((dataSet) => {
          return (
            <List.Item key={dataSet.id} display={"flex"} alignItems={"center"}>
              <Button
                variant={"plain"}
                _hover={{ textDecoration: "underline" }}
                onClick={() => {
                  setCurrentDataSetId(dataSet.id);
                  setPage("visualization");
                }}
              >
                {dataSet.name}
              </Button>
              <IconButton
                aria-label="Rename"
                variant={"surface"}
                size={"xs"}
                h={5}
                w={5}
                minW={5}
                onClick={() => {
                  setActiveRenameValue(dataSet.name);
                  setActiveRenameId(dataSet.id);
                }}
              >
                <LuPencil />
              </IconButton>
              {activeRenameId === dataSet.id && (
                <>
                  <Input
                    value={activeRenameValue}
                    onChange={(e) => setActiveRenameValue(e.target.value)}
                  />
                  <IconButton
                    aria-label="Save"
                    variant={"surface"}
                    size={"xs"}
                    h={5}
                    w={5}
                    minW={5}
                    onClick={() => {
                      handleRename(activeRenameId, activeRenameValue);
                    }}
                  >
                    <LuSave />
                  </IconButton>
                </>
              )}
              <DeleteModal
                isOpen={activeDeleteId != null}
                onConfirmDelete={() => {
                  handleDelete(dataSet.id);
                }}
                onCancel={() => {
                  setActiveDeleteId(null);
                }}
              >
                <IconButton
                  aria-label="Delete"
                  variant={"surface"}
                  size={"xs"}
                  h={5}
                  w={5}
                  minW={5}
                  onClick={() => {
                    setActiveDeleteId(dataSet.id);
                  }}
                >
                  <LuTrash />
                </IconButton>
              </DeleteModal>
            </List.Item>
          );
        })}
      </List.Root>
      <HStack gap={2}>
        <Button
          onClick={() => {
            setPage("upload");
          }}
          size={"xs"}
        >
          Upload Data
        </Button>
      </HStack>
    </VStack>
  );
};

export default Sidebar;
