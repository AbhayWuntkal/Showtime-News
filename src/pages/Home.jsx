import Header from "../components/Header";
import NewsList from "../components/NewsList";
import Footer from "../components/Footer";
import { useState } from "react";

const Home = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchCategory, setSearchCategory] = useState("politics");

	return (
		<div>
			<Header
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				searchCategory={searchCategory}
				setSearchCategory={setSearchCategory}
			/>
			<NewsList
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				searchCategory={searchCategory}
				setSearchCategory={setSearchCategory}
			/>
			<Footer />
		</div>
	);
};

export default Home;
