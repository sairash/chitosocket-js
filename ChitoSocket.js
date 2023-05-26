class ChitoSocket {
    constructor(url) {
        this.ws = new WebSocket(url);
        this.events = {};
        this.send_any_message = null;
        this.not_sent_messages = [];
        this.ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const { event: eventName, data } = message;
            if (eventName in this.events) {
                this.events[eventName].forEach((callback) => callback(data));
            }

            if (this.send_any_message != null) {
                this.send_any_message(event)
            }
        };

        this.ws.onopen = () => {
            this.not_sent_messages.forEach(not_sent_message => {
                this.ws.send(not_sent_message)
            });
        }
    }

    on(eventName, callback) {
        if (!(eventName in this.events)) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    get_events() {
        return this.events
    }

    ws() {
        return this.ws
    }

    all_messages(callback) {
        this.send_any_message = callback
    }

    emit(eventName, data) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ event: eventName, data: data }));
        } else {
            this.not_sent_messages.push(JSON.stringify({ event: eventName, data: data }))
        }
    }
}

module.exports.chitosocket = ChitoSocket