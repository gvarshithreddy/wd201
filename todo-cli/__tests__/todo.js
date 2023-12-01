/* eslint-disable no-undef */
const { todoList } = require("../todo");

const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

// const {all, markAsComplete, add} = todoList()
describe("Todolist test suite", () => {
  const formattedDate = (d) => {
    return d.toISOString().split("T")[0];
  };

  const dateToday = new Date();
  const today = formattedDate(dateToday);
  const yesterday = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() - 1)),
  );
  const tomorrow = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() + 1)),
  );
  test("Should add new todo", () => {
    const todo = { title: "New todo", dueDate: "2020-12-12", completed: false };
    const prevAllLength = all.length;
    add(todo);
    expect(all.length).toBe(prevAllLength + 1);
  });

  test("Should mark todo as complete", () => {
    const todo = { title: "New todo", dueDate: "2020-12-12" };
    add(todo);
    markAsComplete(0);
    expect(all).toContainEqual({ ...todo, completed: true });
  });

  test("Should return overdue todos", () => {
    const todo = { title: "New todo", dueDate: yesterday };
    add(todo);
    expect(overdue()).toContainEqual(todo);
  });

  test("Should return todos due today", () => {
    const todo = { title: "New todo", dueDate: today };
    add(todo);
    expect(dueToday()).toContainEqual(todo);
  });

  test("Should return todos due later", () => {
    const todo = { title: "New todo", dueDate: tomorrow };
    add(todo);
    expect(dueLater()).toContainEqual(todo);
  });
});
