import makeStore from './src/store';
import {startServer} from './src/server'

export const store = makeStore();
// We give to the server the store
startServer(store);

store.dispatch({
	type: 'SET_ENTRIES' , 
	entries: require('./entries.json')
});
store.dispatch({type: 'NEXT'});
