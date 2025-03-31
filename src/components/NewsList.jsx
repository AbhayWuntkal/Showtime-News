import { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import moment from "moment";
import { TrendingUp } from "lucide-react"; // Import the stock uptrend icon

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
				setTrendingNews(trendingResponse.data.articles.slice(0, 7));
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
					<div className='max-w-[1300px] mx-auto'>
						<h2 className='text-2xl md:text-5xl mb-10 lg:font-medium text-black text-left'>
							Top News Articles
						</h2>

						{/* News Grid */}
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8'>
							{articles.length > 0 ? (
								articles.map((article) => (
									<NewsCard
										key={article.url}
										article={article}
										category={searchCategory}
									/>
								))
							) : (
								<p className='text-gray-500'>No articles found.</p>
							)}
						</div>
					</div>

					{/* Latest News Section */}
					<div className='border-t border-gray-300 mt-8 pt-8'>
						<h2 className='text-2xl font-[400] text-black mt-8 mb-2 text-left'>
							Latest News
						</h2>
						<p className='text-gray-500 mb-4'>
							{moment().format("MMMM D, YYYY")}
						</p>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
							<div className='col-span-1 md:col-span-1 lg:col-span-2 grid grid-rows-2 grid-cols-1 sm:grid-cols-5 gap-2'>
								{latestNews.length > 0 ? (
									latestNews.slice(0, 4).map((article, index) => (
										<div
											key={article.url}
											className={
												index % 4 === 0 || index % 4 === 3
													? "col-span-1 sm:col-span-3"
													: "col-span-1 sm:col-span-2"
											}
										>
											<div className='w-full aspect-[3/2]'>
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
							<div className='col-span-1 bg-gray-50 p-6 sm:p-9 rounded-lg shadow-lg'>
								<h2 className='text-xl sm:text-2xl font-semibold mb-6 sm:mb-10 text-sky-600 flex items-center gap-3 sm:gap-5'>
									<TrendingUp className='w-6 sm:w-7 h-6 sm:h-7 text-blue-500' />
									Trending News
								</h2>

								{trendingNews.length > 0 ? (
									<ul className='space-y-3 sm:space-y-4'>
										{trendingNews.slice(0, 8).map((article, index) => (
											<li key={article.url} className='flex items-start'>
												<span className='text-sky-600 text-lg sm:text-2xl font-semibold mr-4 sm:mr-7'>
													{index + 1}
												</span>
												<div>
													<a
														href={article.url}
														target='_blank'
														rel='noopener noreferrer'
														className='font-semibold text-md'
													>
														<h3 className='text-md sm:text-lg font-semibold text-gray-600 hover:underline cursor-pointer'>
															{truncateText(article.title, 7)}
														</h3>
													</a>
													<p className='text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2'>
														{truncateText(article.description, 20)}
													</p>
												</div>
											</li>
										))}
									</ul>
								) : (
									<p className='text-gray-500 mt-4'>No Trending news found.</p>
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default NewsList;
