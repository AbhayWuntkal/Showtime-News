import { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import moment from "moment";
import { TrendingUp } from "lucide-react"; // Import the stock uptrend icon
import { motion } from "framer-motion"; // Import framer-motion for animations

const NewsList = ({
	searchQuery,
	setSearchQuery,
	searchCategory,
	setSearchCategory,
}) => {
	const [articles, setArticles] = useState([]);
	const [latestNews, setLatestNews] = useState([]);
	const [trendingNews, setTrendingNews] = useState([]);
	const [loading, setLoading] = useState(true);

	const API_KEY = "2f072ad19d7e48dbae9f9218221b2941";

	useEffect(() => {
		setSearchQuery("");
	}, [searchCategory]);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				let url = `https://newsapi.org/v2/top-headlines?category=${searchCategory}&apiKey=${API_KEY}`;

				if (searchQuery) {
					url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${API_KEY}`;
				}

				const response = await axios.get(url);
				setArticles(response.data.articles.slice(0, 6));
			} catch (error) {
				console.error("Error fetching top headlines:", error);
			}
		};

		fetchArticles();
	}, [searchQuery, searchCategory]);

	useEffect(() => {
		const fetchLatestNews = async () => {
			try {
				const response = await axios.get(
					`https://newsapi.org/v2/everything?q=latest&sortBy=publishedAt&apiKey=${API_KEY}`
				);
				const trendingResponse = await axios.get(
					`https://newsapi.org/v2/everything?q=trending&sortBy=publishedAt&apiKey=${API_KEY}`
				);

				setLatestNews(response.data.articles.slice(0, 4));
				setTrendingNews(trendingResponse.data.articles.slice(0, 5));
			} catch (error) {
				console.error("Error fetching latest news:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchLatestNews();
	}, []);

	const truncateText = (text, wordLimit) => {
		if (!text) return "";
		const words = text.split(" ");
		return words.length > wordLimit
			? words.slice(0, wordLimit).join(" ") + "..."
			: text;
	};

	function getRelativeTime(dateString) {
		const publishedDate = new Date(dateString);
		const now = new Date();
		const diffMs = now - publishedDate;
		const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

		if (diffHours < 1) {
			const diffMinutes = Math.floor(diffMs / (1000 * 60));
			return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
		} else if (diffHours < 24) {
			return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
		} else {
			const diffDays = Math.floor(diffHours / 24);
			return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
		}
	}

	return (
		<div className='p-12 '>
			{/* Show Loading Spinner */}
			{loading ? (
				<div className='flex justify-center items-center min-h-screen'>
					<div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid'></div>
				</div>
			) : (
				<>
					{/* Top Headlines Section */}
					<div className='max-w-[1300px] mx-auto transition-all duration-500 ease-in-out'>
						<h2
							className='text-2xl md:text-5xl mb-10 lg:font-medium text-black text-left
						  font-bold bg-gradient-to-r  to-sky-500 from-primary bg-clip-text text-transparent '
						>
							Top News Articles
						</h2>

						{/* News Grid */}
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8'>
							{articles.length > 0 ? (
								articles.map((article) => (
									<div
										key={article.url}
										className='transition-all duration-300 hover:scale-[1.02]'
									>
										<NewsCard article={article} category={searchCategory} />
									</div>
								))
							) : (
								<p className='text-gray-500'>No articles found.</p>
							)}
						</div>
					</div>

					{/* Latest News Section */}
					<motion.div // Changed from div to motion.div
						initial={{ opacity: 0, y: 20 }} // Start slightly below and invisible
						animate={{ opacity: 1, y: 0 }} // Animate to full opacity and normal position
						transition={{ duration: 0.5, ease: "easeOut" }}
						className='border-t border-gray-300 mt-8 pt-8 transition-all duration-500 ease-in-out'
					>
						<h2 className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent'>
							Latest News
						</h2>
						<p className='text-gray-500 mb-4 transition-all duration-300'>
							{moment().format("MMMM D, YYYY")}
						</p>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300'>
							<div className='col-span-1 md:col-span-1 lg:col-span-2 grid grid-rows-2 grid-cols-1 sm:grid-cols-5 gap-2 h-full'>
								{latestNews.length > 0 ? (
									latestNews.slice(0, 4).map((article, index) => (
										<div
											key={article.url}
											className={
												index % 4 === 0 || index % 4 === 3
													? "col-span-1 sm:col-span-3 "
													: "col-span-1 sm:col-span-2"
											}
										>
											<div className='w-full aspect-[3/2] transition-all duration-300 hover:scale-[1.01] '>
												<NewsCard article={article} />
											</div>
										</div>
									))
								) : (
									<p className='text-gray-500 col-span-5'>
										No latest news found.
									</p>
								)}
							</div>

							{/* Trending News Section */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, ease: "easeOut" }}
								className='col-span-1 bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300'
							>
								{/* Header */}
								<motion.div
									whileHover={{ x: 3 }}
									className='flex items-center gap-4 mb-6 pb-4 border-b border-gray-200'
								>
									<motion.div
										whileHover={{ rotate: 10 }}
										className='p-2 bg-blue-100 rounded-full'
									>
										<TrendingUp className='w-5 h-5 text-blue-600' />
									</motion.div>
									<h2 className='text-xl font-semibold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent'>
										Trending News
									</h2>
								</motion.div>

								{trendingNews.length > 0 ? (
									<ul className='space-y-2 divide-y divide-gray-200/50'>
										{trendingNews.slice(0, 8).map((article, index) => (
											<motion.li
												key={article.url}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: index * 0.05 }}
												whileHover={{
													backgroundColor: "rgba(239, 246, 255, 0.5)",
												}}
												className='py-3 px-2 rounded-lg transition-colors duration-200 flex items-start'
											>
												{/* Badge */}
												<div className='relative mr-3 mt-1'>
													<div className='absolute inset-0 bg-gradient-to-br from-blue-500 to-sky-400 rounded-full blur-sm opacity-30'></div>
													<span className='relative flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-sky-400 text-white font-semibold text-[0.7rem]'>
														{index + 1}
													</span>
												</div>

												{/* Article */}
												<div className='flex-1'>
													<a
														href={article.url}
														target='_blank'
														rel='noopener noreferrer'
														className='group'
													>
														<h3 className='text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200 mb-1 line-clamp-2'>
															{article.title}
														</h3>
														{article.description && (
															<p className='text-xs text-gray-500 group-hover:text-gray-600 line-clamp-2'>
																{article.description}
															</p>
														)}
													</a>

													{/* Source + Date */}
													<div className='flex items-center mt-1.5 text-[0.65rem] text-gray-600 gap-2'>
														{article.source?.name && (
															<span className='px-2 py-[2px] bg-gray-200 rounded-full'>
																{truncateText(article.source.name, 4)}
															</span>
														)}
														{article.publishedAt && (
															<span>
																{getRelativeTime(article.publishedAt)}
															</span>
														)}
													</div>
												</div>
											</motion.li>
										))}
									</ul>
								) : (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className='flex flex-col items-center justify-center py-12 text-center'
									>
										<Newspaper className='w-10 h-10 text-gray-300 mb-3' />
										<p className='text-gray-400 font-medium text-sm'>
											No trending news found
										</p>
										<p className='text-gray-400 text-xs mt-1'>
											Check back later for updates
										</p>
									</motion.div>
								)}

								{/* View More */}
								{trendingNews.length > 3 && (
									<motion.div
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className='mt-5 text-center'
									>
										<button className='px-5 py-2 bg-gradient-to-r from-blue-500 to-sky-400 text-white rounded-3xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300'>
											View More
										</button>
									</motion.div>
								)}
							</motion.div>
						</div>
					</motion.div>
				</>
			)}
		</div>
	);
};

export default NewsList;
