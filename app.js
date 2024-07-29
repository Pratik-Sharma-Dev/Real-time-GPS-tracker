const express = require("express");
const app = express();
const http = require("http");
const path = require("path");

const socketio = require("socket.io");
const server = http.createServer(app);

const io = socketio(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS as the templating engine for rendering pages.
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    socket.on("send-location", function(data) {
        io.emit("receive-location", {id : socket.id, ...data}); // Broadcasts to all connected clients
    })

    socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
    });

});



app.get("/", (req, res) => {
    res.render("index.ejs");
});

server.listen(3000, () => {
    console.log("Server is running on port 3000...");
});