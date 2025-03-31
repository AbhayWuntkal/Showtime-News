import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

const ArticleDetail = () => {
	const { id } = useParams();
	const [article, setArticle] = useState(null);

	useEffect(() => {
		const fetchArticle = async () => {
			const response = await axios.get(
				`https://newsapi.org/v2/top-headlines?category=politics&apiKey=2f072ad19d7e48dbae9f9218221b2941`
			);

			const dataArray = response?.data?.articles || [];
			console.log(dataArray, "dataArray");

			const data = dataArray.find((urlObject) => urlObject.url === id);

			setArticle(data);
		};

		fetchArticle();
	}, [id]);

	if (!article) return <div>Loading...</div>;

	return (
		<>
			<Header />

			<div className='p-8'>
				<h2 className='text-3xl font-semibold text-black'>{article.title}</h2>
				<img
					src={article.urlToImage}
					alt={article.title}
					className='w-full h-64 object-cover mt-4 text-black'
				/>
				<p className='mt-4 text-black'>{article.content}</p>
				<a
					href={article.url}
					target='_blank'
					rel='noopener noreferrer'
					className='mt-4 text-accent'
				>
					Read Source Article
				</a>
			</div>
			<Footer />
		</>
	);
};

export default ArticleDetail;
