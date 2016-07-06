import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  store.subscribe(
  	() => io.emit('state',store.getState().toJS())
  	//We are now publishing the whole state to everyone 
  	//whenever any changes occur.
  	);

  	/*We can listen to 'connection' events on our Socket.io server.
  	// We get one each time a client connects. In the event listener 
  	we can emit the current state right away:*/
  	io.on('connection', (socket) => {
  	 socket.emit('state', store.getState().toJS());
  	  	 /*A client sends an action to the server.
		The server hands the action to the Redux Store.
		The Store calls the reducer and the reducer executes the logic related to the action.
		The Store updates its state based on the return value of the reducer.
		The Store executes the listener function subscribed by the server.
		The server emits a 'state' event.
		All connected clients - including the one that initiated the original action - receive the new state.*/
  	 socket.on( 'action' , store.dispatch.bind(store));

  });
}

