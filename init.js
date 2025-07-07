const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main()
.then(() => {
    console.log("connection successful");
})
.catch((err) => {
    console.log(err)
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

let allChats = [
    {
        from :"Tannu",
        to :"Veer",
        msg : "Always be happy in your life..!",
        created_at : new Date(),
    },
    {
        from :"Keshav",
        to :"Baldev",
        msg : "Happy Birthday",
        created_at : new Date(),
    },
    {
        from :"Sunny",
        to :"Vicky",
        msg : "Be a good learner",
        created_at : new Date(),
    },
    {
        from :"Kriti",
        to :"Sanju",
        msg : "Grow in your life",
        created_at : new Date(),
    },
    {
        from :"Harry",
        to :"Jack",
        msg : "Life is always unpredictable",
        created_at : new Date(),
    },
];

Chat.insertMany(allChats);
