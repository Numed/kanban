import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Header } from "./index";

describe("Header component", () => {
  it("should render input and button", () => {
    const { getByPlaceholderText, getByText } = render(<Header />);
    const inputElement = getByPlaceholderText("Basic usage");
    const buttonElement = getByText("Load Issues");

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("should update input value when typing", () => {
    const { getByPlaceholderText } = render(<Header />);
    const inputElement = getByPlaceholderText("Basic usage");

    fireEvent.change(inputElement, { target: { value: "example/url" } });

    expect(inputElement).toHaveValue("example/url");
  });
});
