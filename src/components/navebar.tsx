"use client"
import { useState } from "react";
import { useTasks } from "../context/TaskContext"; // Adjust the import path as necessary

export default function Navbar() {
    const { searchTasks } = useTasks(); // Destructure searchTasks from the context
    const [searchInput, setSearchInput] = useState(""); // Local state for search input

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchInput(value); // Update local state
        searchTasks(value); // Call searchTasks with the current input
    };

    return (
        <div className="h-20 flex md:flex-row justify-around items-center p-3 border-b-2 gap-4 md:gap-0">
            <div className="text-xl font-bold">
                logo
            </div>
            <div className="w-full md:w-auto flex justify-center md:justify-start">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchInput} // Bind input value to local state
                    onChange={handleSearchChange} // Handle input changes
                    className="border w-3/4 sm:w-64 border-black rounded-lg p-2"
                />
            </div>
        </div>
    );
}
