import { Text, FileUpload, Icon, Box, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuUpload } from "react-icons/lu";
import { useResponses } from "../contexts/ResponsesContext";
import type { LLMResponse } from "../types";

const UploadSection = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { setResponses, setPage } = useResponses();

  useEffect(() => {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e?.target == null) {
          throw new Error("Empty file uploaded");
        }
        const fileContents = e.target.result;
        if (fileContents == null) {
          throw new Error("File contents was null or empty!");
        }
        try {
          const jsonContent = JSON.parse(fileContents.toString());
          // TODO: validate the shape of the data? e.g. zod schema or similar
          // This is quite unsafe but the demo data looks well formed at least
          if (jsonContent.responses == null) {
            throw new Error("Malformed JSON file");
          }
          setResponses(jsonContent.responses as LLMResponse[]);
          setPage("visualization");
        } catch (e) {
          throw new Error("Invalid file, could not parse as JSON", e as Error);
        }
      };
      reader.readAsText(file);
    });
  }, [files]);

  return (
    <Grid
      templateRows={"100px 1fr"}
      h={"100vh"}
      w={"full"}
      id={"data-upload-section"}
      px={10}
    >
      <Text fontSize={"2xl"} as={"h1"} textAlign={"center"} w={"full"}>
        Data Upload Section
      </Text>
      <FileUpload.Root
        accept={["application/json"]}
        w={"full"}
        onFileAccept={(details) => {
          console.log(details);
          setFiles(details.files);
        }}
      >
        <FileUpload.HiddenInput />
        <FileUpload.Dropzone w={"full"}>
          <Icon size="md" color="fg.muted">
            <LuUpload />
          </Icon>
          <FileUpload.DropzoneContent>
            <Box>Drag and drop files here</Box>
            <Box color="fg.muted">.png, .jpg up to 5MB</Box>
          </FileUpload.DropzoneContent>
          {/* From the ChakraUI docs: */}
        </FileUpload.Dropzone>
        <FileUpload.ItemGroup>
          <FileUpload.Context>
            {({ acceptedFiles }) =>
              acceptedFiles.map((file) => (
                <FileUpload.Item key={file.name} file={file}>
                  <FileUpload.ItemPreview />
                  <FileUpload.ItemName />
                  <FileUpload.ItemSizeText />
                  <FileUpload.ItemDeleteTrigger />
                </FileUpload.Item>
              ))
            }
          </FileUpload.Context>
        </FileUpload.ItemGroup>
      </FileUpload.Root>
    </Grid>
  );
};

export default UploadSection;
