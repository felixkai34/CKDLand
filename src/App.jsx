import { Route , Routes } from 'react-router-dom'
import './App.css'
import Main from './Pages/Main'
import Detail from './Pages/Detail'
import About from './Components/About';
import Pandp from './Components/Pandp';
import Casts from './Components/Casts';
import Photos from './Components/Photos';
import Search from './Components/Search';

export default function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Main/>} />
				<Route path="/about" element={<About/>} />
				<Route path="/pandp" element={<Pandp/>} />
				<Route path="/:Id" element={<Detail/>} />
				<Route path="/:Id/casts" element={<Casts/>} />
				<Route path="/:Id/photos" element={<Photos/>} />
				<Route path="/search" element={<Search />} />
    		</Routes>
		</>
	);
};