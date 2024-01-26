"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import UserPreview from "../UserPreview";
import Notifications from "../Notifications";
import MobileMenu from "../MobileMenu";
import { useRouter, useSearchParams } from "next/navigation";
// import { SocketContext } from "@/config/context/SocketContext";

export default function Navbar() {
	const { data: session, status: sessionStatus } = useSession() as any;
	let searchTimeout: NodeJS.Timeout;
	const searchParams = useSearchParams();
	const isLoggedIn = sessionStatus === "authenticated" ? true : false;
	const router = useRouter();
	// const socket = useContext(SocketContext);
	const [isMenuOpen, setisMenuOpen] = useState(false);
	const [search, setSearch] = useState(
		searchParams.get("query") || ("" as string)
	);
	const [results, setResults] = useState([] as any[]);
	function completionLevel() {
		if (session?.user?.socials?.length > 0) {
			if (session?.user?.bio?.length > 0) {
				if (session?.user?.image.length > 0) {
					return true;
				}
				return false;
			}
			return false;
		}
		return false;
	}
	const [isHeadlineOpen, setisHeadlineOpen] = useState(
		isLoggedIn ? !completionLevel() || false : false
	);

	// useEffect(() => {
	// 	socket.on('connect', () => {
	// 		console.log('connected');
	// 	});
	// 	console.log(socket);
	// 	if(isLoggedIn) socket.emit('newuser', { username: session?.user?.username, userId: session?.user?._id });
	// }, [socket, isLoggedIn]);

	const handleClick = () => {
		if (!isMenuOpen) {
			document
				.getElementById("toggle-ul")
				?.classList.replace("left-[-100vw]", "left-[0]");
			document
				.getElementById("toggle-ul")
				?.classList.replace("rounded-br-[50%]", "rounded-br-[0]");
			setisMenuOpen(!isMenuOpen);
		} else {
			document
				.getElementById("toggle-ul")
				?.classList.replace("left-[0]", "left-[-100vw]");
			document
				.getElementById("toggle-ul")
				?.classList.replace("rounded-br-[0]", "rounded-br-[50%]");
			setisMenuOpen(!isMenuOpen);
		}
	};
	const handleSearch = async (searchQuery: string) => {
		try {
			const response = await fetch(`/api/searchusers?query=${searchQuery}`);
			const data = await response.json();
			setResults(data.users);
		} catch (error) {
			console.error(error);
		}
	};
	const onInputChange = (e: any) => {
		const value = e.target.value;
		setSearch(value);

		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			handleSearch(search);
		}, 300);
	};
	return (
		<>
			<div
				className={`${
					sessionStatus === "authenticated" && isHeadlineOpen
						? "flex"
						: "hidden"
				}`}
			>
				<div className="w-full flex items-center bg-black">
					<p
						className="text-gray-300 text-[.8rem] p-4 mx-auto font-mono hover:underline"
						onClick={() => {
							router.push(`/profile/editProfile`);
						}}
					>
						Complete your Profile now to get the most out of the
						platform....!
					</p>
					<button
						className="bg-white p-2 me-4 rounded-lg"
						onClick={() => {
							setisHeadlineOpen(false);
						}}
						aria-label="close"
					>
						<span className="sr-only">Close</span>
						<svg
							className="w-3 h-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 14 14"
							fill="none"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
							/>
						</svg>
					</button>
				</div>
			</div>
			<div className="flex w-[100%] max-w-[2000px] min-h-[70px] mx-auto md:h-[13vh] h-[10vh] justify-between dark:bg-white">
				<img
					src="/assets/show.png"
					alt=""
					className="w-auto max-w-[300px] h-[100%]"
				/>
				<ul
					id="toggle-ul"
					className="md:w-[15%] h-[100%] bg-[#1f1c20] transition-all duration-300 rounded-br-[50%] md:rounded-none md:bg-transparent w-full z-30 absolute md:relative md:flex md:left-0 left-[-100vw] justify-around m-auto list-none pt-14 pl-8 md:p-0 items-center"
				>
					<li className="mx-4 flex items-center bg-transparent text-white md:text-gray-700 my-8 font-semibold md:my-0 hover:bg-gray-500 md:hover:bg-transparent md:hover:p-0 transition-all">
						<Link href={"/"} className="bg-transparent">
							Home
						</Link>
					</li>
					<li className="mx-4 flex items-center bg-transparent text-white md:text-gray-700 my-8 font-semibold md:my-0 hover:bg-gray-500 md:hover:bg-transparent md:hover:p-0 transition-all">
						<Link href={"/explore"} className="bg-transparent">
							Explore
						</Link>
					</li>
					<li className="mx-4 md:hidden flex items-center bg-transparent text-white md:text-gray-700 my-4 font-semibold md:my-0 hover:bg-gray-500 md:hover:bg-transparent md:hover:p-0 transition-all">
						<Link href={"/bookmarks"} className="bg-transparent">
							Bookmarks
						</Link>
					</li>
					<li className="md:hidden flex text-white items-center bg-transparent my-4 hover:bg-gray-500 transition-all">
						<UserPreview user={session?.user} />
					</li>
					<li className="mx-4 md:hidden flex items-center bg-transparent text-white md:text-black my-8 md:my-0">
						<Link
							href={isLoggedIn ? "/" : "/auth"}
							className={`py-2 px-4 border text-center hover:bg-white hover:text-black border-gray-200 ${
								!isLoggedIn ? "text-white" : "text-red-600"
							}`}
							onClick={() => {
								if (isLoggedIn) signOut(); 
							}}
						>
							{isLoggedIn ? "Logout" : "Login"}
						</Link>
					</li>
				</ul>
				<div className="w-[40%] lg:w-[60%] flex justify-between items-center">
					<div className="relative lg:w-[50%] h-[45%]">
						<input
							type="text"
							className="hidden lg:flex w-full px-8 outline-none rounded-[50px]"
							placeholder="Search.."
							value={search}
							onChange={onInputChange}
						/>
						{search.length > 0 && (
							<div className="absolute top-[8vh] p-2 h-max w-full bg-white z-30 border">
								{results?.length > 0 && (
									<>
										{results?.map((result) => (
											<div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 p-4">
												<div className="flex items-center">
													<img
														src={result.image}
														alt=""
														className="w-10 h-10 rounded-[50%]"
													/>
													<div className="flex flex-col ml-4">
														<p className="text-xl">
															{result.name}
														</p>
														<p className="text-sm font-thin">
															{result.username}
														</p>
													</div>
												</div>
												<Link
													href={`profile/${result._id}`}
													target="_blank"
													rel="noreferrer"
													className="px-4 py-2 rounded-md border border-gray-400 text-gray-500"
												>
													View
												</Link>
											</div>
										))}
									</>
								)}
							</div>
						)}
					</div>
					{isLoggedIn ? (
						<div className="w-full xl:w-[35%] lg:w-[45%] mx-auto flex items-center justify-around">
							<div className="hidden md:block">
								<MobileMenu user={session?.user} />
							</div>
							<div
								id="menuIcon"
								className="cursor-pointer bg-white md:hidden flex flex-col justify-around items-center py-4 pl-3 pr-4 z-40"
								onClick={handleClick}
							>
								<div
									id="bar1"
									className={`w-5 h-1 bg-black mb-1 transition-transform duration-300 ${
										isMenuOpen
											? "transform rotate-45 translate-x-1 translate-y-2"
											: ""
									}`}
								></div>
								<div
									id="bar2"
									className={`w-5 h-1 bg-black mb-1 transition-opacity duration-300 ${
										isMenuOpen ? "opacity-0" : ""
									}`}
								></div>
								<div
									id="bar3"
									className={`w-5 h-1 bg-black transition-transform duration-300 ${
										isMenuOpen
											? "transform -rotate-45 translate-x-1 -translate-y-2"
											: ""
									}`}
								></div>
							</div>
						</div>
					) : (
						<>
							<div className="w-[80%] md:min-w-[140px] md:w-[20%] flex items-center">
								<Link href={"/auth"}>
									<button className="border border-gray-400 font-sans font-thin text-[#626262] hover:border-black rounded-[20px] py-2 px-4">
										Login
									</button>
								</Link>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}
