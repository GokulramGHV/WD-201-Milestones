const todoList = () => {
  let all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  let current_date = new Date();
  current_date = current_date.toISOString().split("T")[0];

  const overdue = () => {
    return all.filter((item) => item.dueDate < current_date);
  };

  const dueToday = () => {
    return all.filter((item) => item.dueDate == current_date);
  };

  const dueLater = () => {
    return all.filter((item) => item.dueDate > current_date);
  };

  const toDisplayableList = (list) => {
    let formattedOutput = "";
    list.map((item) => {
      formattedOutput += `[${item.completed ? "x" : " "}] ${item.title} ${
        item.dueDate
      }\n`;
    });

    return formattedOutput;
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
