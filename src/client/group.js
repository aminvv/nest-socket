const group = io("http://localhost:3000/group");

group.on("connect", () => {
    console.log("connected to group namespace");
    group.emit("list", { message: "send group message to nest" });
    group.on("list", (data) => {
        console.log("groupList:", data);
    });
});
