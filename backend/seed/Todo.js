const Todo = require("../models/Todo");

const todos = [
  {
    title: "Complete Homework",
    description: "Finish the math and science assignments",
    date: new Date("2024-12-10"),
    isFavorited: true,
    isCompleted: false,
    user: "65b8e564ea5ce114184ccb96", 
  },
  {
    title: "Grocery Shopping",
    description: "Buy vegetables, fruits, and other essentials",
    date: new Date("2024-12-11"),
    isFavorited: false,
    isCompleted: false,
    user: "65b8e564ea5ce114184ccb96", 
  },
  {
    title: "Team Meeting",
    description: "Attend the team meeting for the project",
    date: new Date("2024-12-12"),
    isFavorited: false,
    isCompleted: true,
    user: "65b8e564ea5ce114184ccb96", 
  },
];

exports.seedTodos = async () => {
  try {
    await Todo.insertMany(todos);
    console.log("Todos seeded successfully");
  } catch (error) {
    console.log("Error seeding todos:", error.message);
  }
};
