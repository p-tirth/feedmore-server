// const io = require("socket.io")(3000,{
//     cors:{
//         origin:['http://localhost:5173',
//         'http://localhost:5174',
//         'http://localhost:5175',
//         'https://feedmore-ws-admin.vercel.app/',
//         'http://feedmore-ws-admin.vercel.app/',
//         'ws://feedmore-ws-admin.vercel.app/',
//         'wss://feedmore-ws-admin.vercel.app/',
//         'ws://feedmore-ws-client.vercel.app/',],
//     },
// })

const io = require("socket.io")(3000, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "https://feedmore-ws-admin.vercel.app",
        "wss://feedmore-ws-admin.vercel.app",
        "https://feedmore-ws-client.vercel.app",
        "wss://feedmore-ws-client.vercel.app",
      ],
      methods: ["GET", "POST"], // Add allowed HTTP methods if needed
      allowedHeaders: ["Authorization"], // Add allowed headers if needed
    },
  });
  
  

io.on("connection", (socket) => {
  socket.on("adminConnection", (msg) => {
    adminId = socket.id;
    console.log(`Admin has connected with id :${adminId} and says ${msg}`);
  });
  socket.on("clientConnection", (msg) => {
    console.log(`client has connected with id :${socket.id} and says ${msg}`);
  });
  socket.on("foodInfo", (data) => {
    console.log(`${{ ...data.name }} sent to server by ${socket.id}`);
    socket.broadcast.to(adminId).emit("foodInfo", data);
    console.log("data sent to admin");
  });
});
