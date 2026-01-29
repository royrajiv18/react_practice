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

