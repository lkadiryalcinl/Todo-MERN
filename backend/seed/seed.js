const { seedUser } = require("./User");
const { seedTodos } = require("./Todo");
const { connectToDB } = require("../database/db");

const seedData = async () => {
    try {
        await connectToDB()
        console.log('Seed [started] please wait..');
        await seedUser()
        await seedTodos()

        console.log('Seed completed..');
    } catch (error) {
        console.log(error);
    }
}

seedData()