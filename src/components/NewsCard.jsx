import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import framer-motion

const NewsCard = ({ article, category = "", onRemoveBookmark = "" }) => {
	const [isBookmark, setIsBookmark] = useState(false);
	// const [imageLoaded, setImageLoaded] = useState(false);
	// const [imageError, setImageError] = useState(false);

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
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className='p-2 h-[400px]'
		>
			<div className='bg-white rounded-3xl shadow-md overflow-hidden border border-gray-200 h-full flex flex-col'>
				{/* Image */}
				{article.urlToImage && (
					<img
						className='w-full h-36 object-cover'
						src={article.urlToImage}
						alt={article.title}
					/>
				)}

				{/* Content */}
				<div className='p-4 flex flex-col flex-grow group'>
					{/* Category */}
					<span className='text-xs font-semibold text-blue-600 uppercase tracking-wide'>
						{category || "General"}
					</span>

					{/* Title */}
					<a
						href={article.url}
						target='_blank'
						rel='noopener noreferrer'
						className='group'
					>
						<h3 className='mt-2 text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2'>
							{truncateText(article.title, 15)}
						</h3>
					</a>

					{/* Source and Date */}
					<div className='mt-2 flex items-center flex-wrap text-xs text-gray-500'>
						{article.source?.name && (
							<span className='mr-2 px-2 py-1 bg-gray-200 rounded-full'>
								{article.source.name}
							</span>
						)}
						{article.publishedAt && (
							<span>{formatDate(article.publishedAt)}</span>
						)}
					</div>

					{/* Description */}
					<p className='mt-2 text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-200 flex-grow'>
						<span className='hidden sm:inline'>
							{truncateText(article.description, 15)}
						</span>
						<span className='sm:hidden sm:text-sm'>
							{truncateText(article.description, 12)}
						</span>
					</p>

					{/* Footer: Read More & Bookmark */}
					<div className='mt-2 flex items-center justify-between'>
						<a
							href={article.url}
							target='_blank'
							rel='noopener noreferrer'
							className='text-indigo-500 hover:text-indigo-700 font-semibold text-md'
						>
							Read More
						</a>

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
		</motion.div>
	);
};

export default NewsCard;
