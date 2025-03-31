import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ArticleDetail from "./components/ArticleDetail";
import Bookmarks from "./components/Bookmarks";

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/article/:id' element={<ArticleDetail />} />
				<Route path='/bookmarks' element={<Bookmarks />} />
			</Routes>
		</Router>
	);
}

export default App;
