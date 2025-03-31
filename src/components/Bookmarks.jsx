import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import Header from "./Header";
import Footer from "./Footer";

const Bookmarks = () => {
	const [bookmarkArticles, setBookmarkArticles] = useState([]);

	useEffect(() => {
		const storedBookmarks = JSON.parse(
			localStorage.getItem("bookmarkArticles") || "[]"
		);
		setBookmarkArticles(storedBookmarks);
	}, []);

	const removeBookmark = (url) => {
		setBookmarkArticles((prevBookmarks) => {
			const updatedBookmarks = prevBookmarks.filter(
				(article) => article.url !== url
			);
			localStorage.setItem(
				"bookmarkArticles",
				JSON.stringify(updatedBookmarks)
			);
			return updatedBookmarks;
		});
	};

	return (
		<>
			<Header isbookmarks={true} />
			<div className='align-center flex flex-col justify-center items-center p-8'>
				<h2 className='text-4xl mb-4 font-[600] text-gray-700'>Bookmarks</h2>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-9 px-7'>
				{bookmarkArticles.length > 0 ? (
					bookmarkArticles.map((article) => (
						<NewsCard
							key={article.url}
							article={article}
							category={bookmarkArticles.category}
							onRemoveBookmark={removeBookmark}
						/>
					))
				) : (
					<p className='text-gray-500 col-span-full text-center'>
						No articles found.
					</p>
				)}
			</div>
			<Footer />
		</>
	);
};

export default Bookmarks;
