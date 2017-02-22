# chatease.js

> [[domain] http://studease.cn](http://studease.cn)

> [[source] https://github.com/studease/chatease](https://github.com/studease/chatease)

> [[zh_doc] http://blog.csdn.net/icysky1989/article/details/52138527](http://blog.csdn.net/icysky1989/article/details/52138527)

This is a client-side script of chat room, transmitting through websocket, with skin build in.


## Tested
---------

* **Chrome**
* **Firefox**
* **Opera**
* **Safari**
* **IE10-11, Edge**
* **IE7-9 (using sockjs)**


## Example
----------

### Basic Configuraion

The example below will find the element with an id of chatwrap and render a dialog into it.

```js
<div id='chatwrap'></div>
...
var chat = chatease('chatwrap').setup({
	url: 'ws://localhost/chatease/ch1',
	width: 300,
	height: 464
});
```

### More Configuration

Please have a look at cn/studease/embed/chatease.embed.config.js.

```js
_defaults = {
	url: 'ws://' + window.location.host + '/chatease/ch1',
	width: 300,
	height: 450,
	keywords: '',
	maxlength: 30,    // -1: no limit
	maxrecords: 50,
	maxretries: -1,   // -1: always
	retrydelay: 3000,
	render: {
		name: rendermodes.DEFAULT
	},
	skin: {
		name: skinmodes.DEFAULT
	}
}
```

### Add Callback

```js
var chat = chatease('chatwrap').setup({
	...
	events: {
		onReady: function(e) {
			console.log('onReady');
		},
		...
	}
});
```

For more events, please check cn/studease/api/chatease.api.js, or the source of test/index.html.

```js
_eventMapping = {
	onError: events.ERROR,
	onReady: events.CHATEASE_READY,
	onConnect: events.CHATEASE_CONNECT,
	onIdent: events.CHATEASE_INDENT,
	onMessage: events.CHATEASE_MESSAGE,
	onJoin: events.CHATEASE_JOIN,
	onLeft: events.CHATEASE_LEFT,
	onNickClick: events.CHATEASE_VIEW_NICKCLICK,
	onClose: events.CHATEASE_CLOSE
}
```

### Interface

* **send(data)**

> 	data: An object which will be sent in json format.

* **resize(width, height)**

> 	width: Width in px.

> 	height: Hieght in px.

### Websocket Server

[chatease-server https://github.com/studease/chatease-server](https://github.com/studease/chatease-server)


## Software License
-------------------

MIT.
