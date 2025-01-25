const channel = io("http://localhost:3000/channel");

channel.on("connect", () => {
    console.log("connected to channel namespace");
    channel.emit("channel", { message: "send channel message to nest" });
    channel.on("channel", (data) => {
        console.log("channelList:", data);
    });
});
