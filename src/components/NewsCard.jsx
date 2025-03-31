import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { FaYoutube, FaHeart } from "react-icons/fa";

const NewsCard = ({ article, category = "", onRemoveBookmark = "" }) => {
	const [isBookmark, setIsBookmark] = useState(false);

	// Check if article is already in bookmarks
	useEffect(() => {
		const storedBookmarks = JSON.parse(
			localStorage.getItem("bookmarkArticles") || "[]"
		);
		setIsBookmark(storedBookmarks.some((fav) => fav.url === article.url));
	}, [article.url]);

	// Toggle bookmark status
	const toggleBookmark = () => {
		let storedBookmarks = JSON.parse(
			localStorage.getItem("bookmarkArticles") || "[]"
		);

		if (isBookmark) {
			// Remove from bookmarks
			storedBookmarks = storedBookmarks.filter(
				(fav) => fav.url !== article.url
			);
			onRemoveBookmark && onRemoveBookmark(article.url);
		} else {
			// Add to bookmarks
			const newArticle = { ...article, category };
			storedBookmarks.push(newArticle);
		}

		localStorage.setItem("bookmarkArticles", JSON.stringify(storedBookmarks));
		setIsBookmark(!isBookmark);
	};

	// Function to truncate text to a given word limit
	const truncateText = (text, wordLimit) => {
		if (!text) return ""; // Handle empty text
		const words = text.split(" ");
		return words.length > wordLimit
			? words.slice(0, wordLimit).join(" ") + "..."
			: text;
	};

	// Function to format date as "Day st/th/rd, Month, Year"
	const formatDate = (dateString) => {
		if (!dateString) return "Unknown Date";
		const date = new Date(dateString);
		const day = date.getDate();
		const month = date.toLocaleString("en-US", { month: "long" });
		const year = date.getFullYear();

		// Determine suffix (st, nd, rd, th)
		const suffix =
			day % 10 === 1 && day !== 11
				? "st"
				: day % 10 === 2 && day !== 12
				? "nd"
				: day % 10 === 3 && day !== 13
				? "rd"
				: "th";

		return `${day}${suffix} ${month}, ${year}`;
	};

	return (
		<div className='p-2 h-[400px]'>
			<div className='bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 h-full flex flex-col'>
				{/* Image */}
				{article.urlToImage && (
					<img
						className='w-full h-36 object-cover'
						src={article.urlToImage}
						alt={article.title}
					/>
				)}

				{/* Content */}
				<div className='p-4 flex flex-col flex-grow'>
					{/* Category */}
					<span className='text-xs text-blue-500 uppercase font-medium'>
						{category || "General"}
					</span>

					{/* Title (Truncated to 10 words) */}
					<a
						href={article.url}
						target='_blank'
						rel='noopener noreferrer'
						className='text-indigo-500 hover:text-indigo-700 font-semibold text-md'
					>
						<h3 className='mt-2 text-lg font-semibold text-gray-800 hover:text-blue-600'>
							{truncateText(article.title, 10)}
						</h3>
					</a>

					{/* Source and Date */}
					<p className='mt-1 text-gray-500 text-sm'>
						Source: {article.source?.name || "Unknown"} |{" "}
						{formatDate(article.publishedAt)}
					</p>

					{/* Description (Truncated to 20 words) */}
					<p className='mt-2 text-gray-600 text-sm flex-grow'>
						{truncateText(article.description, 17)}
					</p>

					{/* Footer: Read More & Bookmark */}
					<div className='mt-2 flex items-center justify-between'>
						{/* Read More Button */}
						<a
							href={article.url}
							target='_blank'
							rel='noopener noreferrer'
							className='text-indigo-500 hover:text-indigo-700 font-semibold text-md'
						>
							Read More
						</a>

						{/* Bookmark Button */}
						<button
							onClick={toggleBookmark}
							className='bg-transparent hover:bg-gray-100 rounded-full p-1'
						>
							<Bookmark
								className={`w-6 h-6 ${
									isBookmark
										? "text-indigo-500 fill-indigo-500"
										: "text-gray-400 hover:text-gray-600"
								}`}
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewsCard;
