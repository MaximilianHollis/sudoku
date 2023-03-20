import Bar from './components/bar'
import Board from './components/board'
import Nav from './components/nav'
import Selector from './components/selector'

export const PRIMARY = '#71A1DB'

document.documentElement.style.setProperty('--primary', PRIMARY)

const App = () => (
	<div className="App">
		<Bar />
		<Board />
		<Selector />
		<Nav />
	</div>
)

export default App
