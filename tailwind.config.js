/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Times New Roman"', "serif"], // Custom font family
			},

			colors: {
				primary: "#4F378B", // Purple
				secondary: "#FFFFFF", // Light background for cards
				hover: "#F3E8FF",// Light purple for hover effects
			},
			spacing: {
				128: "32rem", // Custom spacing for large sections
			},
		},
	},
	plugins: [],
};
