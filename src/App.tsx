import { useState } from "react";
import { Provider } from "./components/ui/provider";
import { Button, VStack } from "@chakra-ui/react";
import { ColorModeButton } from "./components/ui/color-mode";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider>
      <VStack py={10} gap={4}>
        <Button
          colorPalette={"teal"}
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </Button>
        <ColorModeButton pos={"absolute"} top={4} right={4} />
      </VStack>
    </Provider>
  );
}

export default App;
