// TableButtons.tsx
"use client";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { BiSort } from "react-icons/bi";
import { IoFilter } from "react-icons/io5";
import { useTasks } from "../context/TaskContext"; // Import the task context

export default function TableButtons() {
    const [filter, setFilter] = useState("");
    const [sortByDate, setSortByDate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Task input state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("LOW");

    const { addTask, sortTasks, filterTasks } = useTasks(); // Use the addTask and sortTasks functions from TaskContext

    useEffect(() => setIsClient(true) , []);

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilter = event.target.value;
        setFilter(selectedFilter);
        filterTasks(selectedFilter); // Call filterTasks with selected filter value
    };

    const handleSortToggle = () => {
        setSortByDate(!sortByDate);
        sortTasks(!sortByDate); // Call sortTasks with updated order
        console.log("Sort by date:", !sortByDate);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleAddTask = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!title || !dueDate || !priority) return; // Simple validation

        addTask({
            title,
            description,
            dueDate,
            priority,
            status: "IN_PROGRESS",
        });

        setTitle("");
        setDescription("");
        setDueDate("");
        setPriority("LOW");
        closeModal();
    };

    return (
        <div className="m-2">
            <div className="h-20 flex justify-between items-center py-3 px-4 md:px-10 border-b-2">
                <div className="font-bold text-xl md:text-2xl">Task</div>
                <div className="flex gap-2 md:gap-4">
                    <button
                        onClick={openModal}
                        className="bg-red-800 px-3 md:px-6 py-2 flex items-center gap-2 text-white rounded-md"
                    >
                        <FaPlus />
                        <span className="hidden md:inline">Add Task</span>
                    </button>
                    <button
                        onClick={handleSortToggle}
                        className="border-2 border-red-800 text-red-800 px-3 md:px-6 py-2 flex items-center gap-2 rounded-md"
                    >
                        <BiSort />
                        <span className="hidden md:inline">Sort</span>
                    </button>
                    <div className="flex items-center gap-2 px-3 py-2 border-2 border-red-800 text-red-800 rounded-md">
                        <IoFilter className="text-red-800 text-xl md:text-2xl" />
                        <select
                            value={filter}
                            onChange={handleFilterChange}
                            className="w-full border-none outline-none bg-transparent"
                        >
                            <option value="">ALL</option>
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isClient && isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="bg-white p-6 md:p-8 rounded-md w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-md">
                        <h2 className="text-xl md:text-2xl font-bold mb-4">Add New Task</h2>
                        <form onSubmit={handleAddTask} className="flex flex-col gap-4">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                                className="border-2 p-2 rounded-md"
                            />
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                className="border-2 p-2 rounded-md"
                            ></textarea>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="border-2 p-2 rounded-md"
                            />
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="border p-2 rounded-md"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <div className="flex gap-4 mt-4">
                                <button
                                    type="button"
                                    className="border w-full border-red-800 text-red-800 px-4 py-2 rounded-md"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-red-800 w-full text-white px-4 py-2 rounded-md"
                                >
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
