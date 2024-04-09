import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import KanbanList from "./index";

test("renders KanbanList component without errors", () => {
  render(<KanbanList />);
  const todoColumn = screen.getByText("todo");
  const inProgressColumn = screen.getByText("inProgress");
  const doneColumn = screen.getByText("done");
  expect(todoColumn).toBeInTheDocument();
  expect(inProgressColumn).toBeInTheDocument();
  expect(doneColumn).toBeInTheDocument();
});

test("moves item between columns", () => {
  render(<KanbanList />);
  const draggableItem = screen.getByText("Sample Issue");
  const destinationColumn = screen.getByText("inProgress");
  fireEvent.dragStart(draggableItem);
  fireEvent.dragEnter(destinationColumn);
  fireEvent.dragEnd(draggableItem);
  expect(destinationColumn).toContainElement(draggableItem);
});

test("moves item within column", () => {
  render(<KanbanList />);
  const draggableItem = screen.getByText("Sample Issue");
  const destinationPosition = 1;
  fireEvent.dragStart(draggableItem);
  fireEvent.dragEnter(draggableItem);
  fireEvent.dragEnd(draggableItem);
  const items = screen.getAllByText(/opened/);
  expect(items[destinationPosition]).toContainElement(draggableItem);
});
