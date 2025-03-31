import { X, Linkedin, Facebook, Instagram } from "lucide-react";

const Footer = () => {
	return (
		<footer className='bg-[#563D82] text-gray-200 py-6 w-full'>
			<div className='container mx-auto px-6 md:px-12'>
				{/* Logo and Navigation */}
				<div className='text-2xl font-semibold font-sans mb-4'>
					Showtime News
				</div>

				{/* Navigation Links */}
				<nav className='flex space-x-6 text-lg mb-4'>
					<a className='text-gray-300'>Home</a>
					<a className='text-gray-300'>Political</a>
					<a className='text-gray-300'>Technology</a>
					<a className='text-gray-300'>World</a>
					<a className='text-gray-300'>Science</a>
				</nav>

				{/* Social Links */}
				<div className='flex items-center space-x-4'>
					<span>Follow Showtime News On:</span>
					<a className=' text-gray-300'>
						<X size={20} />
					</a>
					<a className=' text-gray-300'>
						<Linkedin size={20} />
					</a>
					<a className=' text-gray-300'>
						<Facebook size={20} />
					</a>
					<a className=' text-gray-300'>
						<Instagram size={20} />
					</a>
				</div>
			</div>

			{/* Copyright Section */}
			<p className='text-center text-sm mt-4'>
				&copy; 2025 Showtime News | All Rights Reserved
			</p>
		</footer>
	);
};

export default Footer;
