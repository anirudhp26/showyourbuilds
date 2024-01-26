import React from "react";

interface LoadingPageProps {
	message: string;
}

const LoadingPage = () => {
	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				background: 'rgba(255, 255, 255, 0.5)',
				zIndex: 9999,
				backdropFilter: 'blur(40px)',
				boxShadow: '0 4px 6px rgba(0, 0, 0, 1)'
			}}
		>
			<div className="flex flex-row gap-2">
				<div className="w-6 h-6 rounded-full bg-blue-600 mx-2 animate-bounce [animation-delay:.2s]"></div>
				<div className="w-6 h-6 rounded-full bg-blue-600 mx-2 animate-bounce [animation-delay:.3s]"></div>
				<div className="w-6 h-6 rounded-full bg-blue-600 mx-2 animate-bounce [animation-delay:.2s]"></div>
			</div>
		</div>
	);
};

export default LoadingPage;
