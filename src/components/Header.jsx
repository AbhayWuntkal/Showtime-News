import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Bookmark, Menu, X } from "lucide-react";
import moment from "moment";

const Header = ({
	searchQuery,
	setSearchQuery,
	searchCategory,
	setSearchCategory,
	isbookmarks = false,
}) => {
	const [menuOpen, setMenuOpen] = useState(false);

	const categories = [
		"Politics",
		"Health",
		"Business",
		"Technology",
		"Science",
		"Sports",
	];

	return (
		<>
			<header className='bg-primary text-white py-4 px-6 min-h-[60px] w-full'>
				{/* Top Section */}
				<div className='flex items-center justify-between lg:flex-row flex-col lg:w-full'>
					{/* Laptop Layout: w-1/6 | w-3/4 | w-1/6 */}
					<div className='flex w-full lg:w-1/6 justify-center lg:justify-start'>
						<Link
							to='/'
							onClick={() => {
								!isbookmarks && window.location.reload();
							}}
							className='text-2xl md:text-3xl font-medium text-secondary font-sans'
						>
							Showtime News
						</Link>
					</div>

					{!isbookmarks && (
						<div className='w-full lg:w-3/4 mt-3 lg:mt-0 flex justify-center'>
							<SearchBar searchQuery={searchQuery} onSearch={setSearchQuery} />
						</div>
					)}

					{/* Bookmark & Hamburger Menu */}
					<div className='flex items-center w-full lg:w-1/12 justify-between lg:justify-start mt-3 lg:mt-0'>
						{!isbookmarks && (
							<Link to='/bookmarks'>
								<Bookmark className='w-6 h-6 text-secondary' />
							</Link>
						)}
						{/* Hamburger Menu for Mobile/Tablet */}
						<button
							onClick={() => setMenuOpen(!menuOpen)}
							className='block lg:hidden'
						>
							{menuOpen ? (
								<X className='w-6 h-6 text-secondary' />
							) : (
								<Menu className='w-6 h-6 text-secondary' />
							)}
						</button>
					</div>

					<div>
						<p className='sm:block hidden text-secondary-500 mr-2 text-sm lg:text-md font-medium w-full lg:w-1/1 mt-3 lg:mt-0 '>
							{moment().format("MMMM D, YYYY")}
						</p>
					</div>
				</div>

				{/* Navigation - Mobile: Dropdown, Large Screens: Inline */}
			</header>

			{!isbookmarks && (
				<div className='bg-white py-4 px-6'>
					<nav
						className={`mt-4 ${
							menuOpen ? "block" : "hidden"
						} lg:flex lg:justify-center`}
					>
						<ul className='flex flex-col lg:flex-row lg:space-x-6 text-md'>
							{categories.map((category) => (
								<li key={category} className='py-2 lg:py-0'>
									<Link
										onClick={() => {
											setSearchCategory(category.toLowerCase());
											setMenuOpen(false);
										}}
										className={`block hover:text-primary ${
											searchCategory === category.toLowerCase()
												? "text-blue-600 font-bold" // Selected style
												: "text-primary" // Default style
										}`}
									>
										{category}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
			)}
		</>
	);
};

export default Header;
