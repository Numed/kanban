import { render } from "@testing-library/react";
import KanbanList from "./index";

describe("KanbanList component", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<KanbanList />);
    const doneColumn = getByText("done");
    expect(doneColumn).toBeInTheDocument();
  });
});
