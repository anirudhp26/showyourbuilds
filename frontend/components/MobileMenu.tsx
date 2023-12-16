"use client"
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const MobileMenu = ({ user }: { user: any }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};
	const handleLogout = () => {
		console.log("logout");
		setIsOpen(false);
		signOut();
	};
	return (
		<div className="relative inline-block text-left">
			<div>
				<button
					type="button"
					onClick={toggleDropdown}
					onBlur={() => setTimeout(() => {
						setIsOpen(false)
					}, 1000)}
					className="flex justify-center w-full p-4 text-sm font-medium"
				>
					<div className="flex m-2 items-center">
						{user?.image ? (
							<img
								src={user?.image}
								alt=""
								width={"34px"}
								className="rounded-full"
							/>
						) : (
							<i className="fa-solid fa-user-circle text-[1.5rem] md:text-[2rem]"></i>
						)}
						<span className="ml-2 text-sm font-semibold font-sans">
							{user?.name}
						</span>
					</div>
				</button>
			</div>

			{isOpen && (
				<div className="origin-top-right z-10 absolute right-0 mt-2 w-50 shadow-lg bg-white ring-1 ring-black ring-opacity-5">
					<div
						className="py-1"
						role="menu"
					>
						<div aria-label="navigation" className="py-2">
							<nav className="grid gap-1">
								<Link
									href={`/profile/${user?._id}`}
									className="flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 rounded-md"
								>
									<span>Account</span>
								</Link>
							</nav>
						</div>
						
						<div aria-label="footer" className="pt-2">
							<button
								className="flex items-center space-x-3 py-3 px-4 w-full leading-6 text-lg text-gray-600 focus:outline-none hover:bg-gray-100 rounded-md"
                                onClick={handleLogout} 
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
									className="w-7 h-7"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path
										stroke="none"
										d="M0 0h24v24H0z"
										fill="none"
									></path>
									<path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
									<path d="M9 12h12l-3 -3"></path>
									<path d="M18 15l3 -3"></path>
								</svg>
								<span>Logout</span>
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MobileMenu;
	