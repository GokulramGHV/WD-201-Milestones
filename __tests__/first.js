let todoList = require("../index");

const { all, markAsComplete, add, dueLater, dueToday, overdue } = todoList();
/* eslint-disable no-undef */
describe("Todo List Test Suite", () => {
  beforeAll(() => {
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    [
      {
        title: "Buy milk",
        completed: false,
        dueDate: new Date(today.getTime() - 2 * oneDay).toLocaleDateString(
          "en-CA"
        ),
      },
      {
        title: "Pay rent",
        completed: false,
        dueDate: new Date().toLocaleDateString("en-CA"),
      },
      {
        title: "Submit assignment",
        completed: false,
        dueDate: new Date(today.getTime() + 2 * oneDay).toLocaleDateString(
          "en-CA"
        ),
      },
    ].forEach(add);
  });
  test("Should add a new todo", () => {
    let previous_length = all.length;
    add({
      title: "A test item",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toEqual(previous_length + 1);
  });
  test("Should mark a Todo as complete", () => {
    add({
      title: "A new test item",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all[all.length - 1].completed).toEqual(false);
    markAsComplete(all.length - 1);
    expect(all[all.length - 1].completed).toEqual(true);
  });
  test("Should return overdue items", () => {
    while (all.length > 0) all.pop();
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    add({
      title: "An overdue test item",
      completed: false,
      dueDate: new Date(today.getTime() - 2 * oneDay).toLocaleDateString(
        "en-CA"
      ),
    });
    let overdueItems = overdue();
    expect(overdueItems.length).toBe(1);
  });
  test("Should return due today items", () => {
    while (all.length > 0) all.pop();
    const today = new Date();
    add({
      title: "An due today test item",
      completed: false,
      dueDate: today.toLocaleDateString("en-CA"),
    });
    let dueTodayItems = dueToday();
    expect(dueTodayItems.length).toBe(1);
  });
  test("Should return due later items", () => {
    while (all.length > 0) all.pop();
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    add({
      title: "An due later test item",
      completed: false,
      dueDate: new Date(today.getTime() + 2 * oneDay).toLocaleDateString(
        "en-CA"
      ),
    });
    let dueLaterItems = dueLater();
    expect(dueLaterItems.length).toBe(1);
  });
});
