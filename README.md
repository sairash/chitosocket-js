# Chitosocket Js

This is a js wrapper for [Chitosocket Server](https://github.com/sairash/chitosocket)


```cmd
npm i @sairash/chitosocket
```

##### Start A new Websocket connection
```js
cs = new chitosocket(`ws://localhost:6969/ws/`);
```

##### Get event on message
```js
cs.on("message", (data) => {
    console.log(data);
});
```

##### Send message on event
```js
cs.emit("message", { user_id: 1, message: "This is a message." });
```

##### Get all the events client is listening to
```js
console.log(cs.get_events());
```

##### Get raw websocket
```js
const ws = cs.ws();
```

##### Run function on any message from server
```js
ws.all_messages( (data) => {
    console.log(data);
})
```