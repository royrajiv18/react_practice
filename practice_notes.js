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

// built in hooks 
// Basic / Core Hooks

// useState - Manage local component state

const [count, setCount] = useState(0);
//Triggers re-render
//State is preserved between renders

// useEffect - Handle side effects (API calls, subscriptions, timers)

useEffect(()=> {
	console.log('Component mounted');
	return ()=> console.log(''clean up);

},[])

//Runs after render
// Cleanup prevents memory leaks

// UseContext - Consume context without prop drilling
const theme = useContext(ThemeContext)

// Performance Hooks

// useMemo
// Memoize computed values

const total = useMemo(()=> heavyCalculation(price),[price])

// useCallback - Prevents unnecessary re-renders
//Memoize funcions

const handleClick = useCallback(()=> {
	setCount(c=> c+1)
},[])

// state management hooks
// useReducer - Better than useState for complex updates

const [state, dispatch] = useReducer(reducer,initialState)

| Hook                   | Purpose                |
| ---------------------- | ---------------------- |
| `useState`             | Local state            |
| `useEffect`            | Side effects           |
| `useContext`           | Context consumption    |
| `useRef`               | DOM / persistent value |
| `useMemo`              | Memoize value          |
| `useCallback`          | Memoize function       |
| `useReducer`           | Complex state          |
| `useLayoutEffect`      | DOM sync effect        |
| `useTransition`        | Non-urgent updates     |
| `useDeferredValue`     | Defer slow updates     |
| `useId`                | Unique IDs             |
| `useImperativeHandle`  | Control ref            |
| `useSyncExternalStore` | External store         |
| `useDebugValue`        | DevTools info          |

//////////////////////////////////////////////////////////////////////////////
// Debounce

// debounce

const DebounceSearch = ()=> {
		
	const [query, setQuery]= useState('');

	useEffect(()=> {
	if(!query) return
		const timer = setTimeout(()=>{
						searchApi(query)
					},500)

		return ()=> clearTimeout(timer);
}, [query])

	return (
		
			<input type="text"
			value = {query}
			onChange = {(e)=> setQuery(e.target.value)}
			placeholder = "Search..."
		
)


}
//////////////////////////////////////////////////////////////////////
// lazy loading and suspense

import React,{lazy, suspense} from 'react';

const Profile = React.lazy(()=> import('./Profile'))

// use it inside suspense

const App = ()=> {

	return (
		<div>
			<h2>Home page</h2>
		<Suspense fallback ={<p>Loading ...</p>}>
				<Profile />
		</Suspense>

		</div>
)	
}

export default App;

// Profile.js

const Profile = ()=> {
	return <h2>Profile component Loaded</h2>
}
export default Profile;

//////////////////////////////////////////////////////////////////////////////////////////////
// Lazy Loading with React Router

import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const Home = ()=> lazy(()=>import('./Home'));
const About = ()=> lazy(()=>import('./About'));
const Contact = ()=> lazy(()=>import('./Contact'));

const App = ()=> {
		return (
			<BrowserRouter>
				<Suspense fallback = {<h2>Loading ...</h2>}>
					<Routes>
						<Route path = '/' element= {<Home />} />
						<Route path = '/about' element = {<About />} />
						<Route path = '/contact' element = {<Contact />} />
					</Routes>
				</Suspense>
			</BrowserRouter>

)

}

export default App;

/////////////////////////////////////////////////////////////////////
// lazy loading images and component

const Gallery = ()=> React.lazy(()=>import('./Gallery'));

<Suspense fallback = {<p>Loading Gallery ...</p>}>
	<Gallery />
</Suspense>

// inside Gallery
<img src = 'img1.jpg' loading='lazy' />
<img  src='img2.jpg' loading = 'lazy' />
/////////////////////////////////////////////////////////////

//// useRef hook returns a mutable object with a .current property that we can use to store a value
	//// unlike useState, updating a useRef value does not trigger a component re-render
//Ex - 
import React, {useRef} from 'react';

const FocusInput = ()=> {

	const inputRef = useRef(null);
	const focusInput = ()=> {
		inputRef.current.focus();
	};

	return (
		<div>
		<input ref={inputRef} type="text" />
		<button onClick={focusInput} >Focus Input</button>
		</div>
		
	);
	
};

export default FocusInput;

//////////////////////////////////////////

// diffrence between onclick = {clicked} and onClick = {()=> clicked()}

// onClick = {clicked} pass the fn reference, calls clicked on onClick, use when no arguments are needed
// onClick = {()=> clicked() creates new arrow fn on each click, useful in case of passing arguments, multiple statements present, causes re render every time

////////////////////////// React Portal - A React Portal allows rendering a component into a different DOM node outside its parent hierarchy 
//while keeping it in the same React tree.

// in index.html
<div id="root"></div>
<div id="portal-root"></div>

// Modal component
import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default Modal;
// parent component
import React, { useState } from "react";
import Modal from "./Modal";

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        Open Modal
      </button>

      {open && (
        <Modal>
          <h2>Portal Modal</h2>
          <button onClick={() => setOpen(false)}>Close</button>
        </Modal>
      )}
    </>
  );
};

export default App;

// lifting state up example

// child component A
	const CounterDisplay = ({counter})=> {
		return <p>Counter: {counter}</p>
	}

// child component B

const CounterButton = ({onIncrement})=> {
	return <button onClick={onIncrement}>Increment Counter</button>
}

// Parent component (common ancestor)
const App =()=> {
	const [counter, setCounter]= useState(0);
	const handleIncrement = ()=> {
		setCounter(counter + 1);
	}
	return (
		<div>
		<CounterDisplay counter={counter} />
		<CounterButton onclick={handleIncrement} />
		</div>
	);
};

export default App;





