import { render, screen } from "@testing-library/react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { App } from "./index";

describe("App component", () => {
  it("renders without crashing", () => {
    render(
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    );
  });

  it("renders Header component", () => {
    render(
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    );
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();
  });

  it("renders KanbanList component", () => {
    const { getByText } = render(
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    );
    const kanbanListElement = getByText(/todo/i);
    expect(kanbanListElement).toBeInTheDocument();
  });
});
