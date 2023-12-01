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
  beforeAll(() => {
    add({ title: "New todo 1", dueDate: today, completed: false });
    add({ title: "New todo 1 today", dueDate: today, completed: true });
    add({ title: "New todo 2", dueDate: tomorrow, completed: false });
    add({ title: "New todo 3", dueDate: yesterday, completed: false });
  });

  test("Test to add a todo", () => {
    const todo = { title: "New todo", dueDate: "2020-12-12", completed: false };
    const prevAllLength = all.length;
    add(todo);
    expect(all.length).toBe(prevAllLength + 1);
  });

  test("Test to mark a todo as complete.", () => {
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Test to retrieve overdue items", () => {
    const overdueitems = overdue();
    expect(
      overdueitems.every(
        (item) => item.dueDate < today && item.completed === false,
      ),
    ).toBe(true);
  });

  test("Test to retrieve due today items", () => {
    const todayItems = dueToday();
    expect(
      todayItems.every(
        (item) => item.dueDate === today && item.completed === true,
      ),
    ).toBe(true);
  });

  test("Test to retrieve due later items.", () => {
    const laterItems = dueLater();
    expect(
      laterItems.every(
        (item) => item.dueDate > today && item.completed === false,
      ),
    ).toBe(true);
  });
});
