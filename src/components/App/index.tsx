import { ChakraProvider, theme } from "@chakra-ui/react";

import { Header } from "../Header";
import KanbanList from "../KanbanList";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Header />
    <KanbanList />
  </ChakraProvider>
);
