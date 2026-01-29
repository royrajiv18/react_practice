// practice notes
////////////////////////////////////////////////////////////////////////////////////////
//props drilling examples
//  in App.jsx

const App = ()=> {
	const userName = 'Rajiv';
	return (
	<div>
		<Parent name = {userName}/>
	</div>
)
}
export default App;

// in Parent.jsx

const Parent = ({name})=>{
	return (
	<div>
		<Child name={name}/>
	</div>
)
}
export default Child;

// in Child.jsx

const Child = ({name})=> {
	return (
	<div>
		<h2>Hello, {name}!</h2>
	</div>
)
}
export default Child;

////////////////////////////////////////////////////////////////////////////////////////
// context api
// create context, provide context, consume context

// create context

// in userContext.jsx

export const UserContext = createContext();

// provider context

// in App.s

const App = ()=> {
	const userName = 'Rajiv';
	return (
	<UserContext.Provider value={userName}>
		<Parent />
	</UserContext.Provider>
)
}
export default App
// Parent.js

const Parent = ()=> {
return (
	<Child />
)
}
export default Parent

// Child.js // consume context

import {useContext} from 'react';
import {UserContext} from './UserContext'

const Child = ()=> {
	const name = useContext(UserContext);
	return (
	<h2>Hello, {name}!</h2>
)
}
export default Child
