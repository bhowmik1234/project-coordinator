"use client";
import { useState } from "react";
import { FaEdit, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTasks } from "@/context/TaskContext";
import React from "react";

interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: string;
    priority: string;
}

export default function Table() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);
    
    const { tasks, updateTask, deleteTask } = useTasks();

    const openEditModal = (task: Task) => {
        setSelectedTask(task);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (task: Task) => {
        setSelectedTask(task);
        setIsDeleteModalOpen(true);
    };

    const closeModals = () => {
        setSelectedTask(null);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
    };

    const handleUpdateTask = async () => {
        if (selectedTask) {
            const updatedTask = {
                ...selectedTask,
                status: selectedTask.status.toUpperCase(),
            };
            await updateTask(updatedTask);
            closeModals();
        }
    };
    

    const handleDeleteTask = async () => {
        if (selectedTask) {
            deleteTask(selectedTask.id);
            closeModals();
        }
    };

    const toggleExpand = (id: number) => {
        setExpandedTaskId(expandedTaskId === id ? null : id);
    };

    return (
        <div className="m-10">
            <table className="table-auto w-full border border-red-800 rounded-md">
                <thead className="bg-[#FFF9F8] rounded-t-md">
                    <tr>
                        <th className="p-3 border-b border-red-800">Sl. No</th>
                        <th className="p-3 border-b border-red-800 w-1/4">Title</th>
                        <th className="p-3 border-b border-red-800 w-1/3 hidden sm:table-cell">Description</th>
                        <th className="p-3 border-b border-red-800 hidden sm:table-cell">Due Date</th>
                        <th className="p-3 border-b border-red-800 hidden sm:table-cell">Status</th>
                        <th className="p-3 border-b border-red-800 hidden sm:table-cell">Priority</th>
                        <th className="p-3 border-b border-red-800">Actions</th>
                    </tr>
                </thead>
                <tbody>
    {tasks.length === 0 ? (
        <tr>
            <td colSpan={7} className="text-center p-3">
                Not found
            </td>
        </tr>
    ) : (
        tasks.map((task, index) => (
            <React.Fragment key={task.id}>
                <tr className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#FFF9F8]'}`}>
                    <td className="p-3 text-center">{index + 1}</td>
                    <td className="p-3 text-center w-1/4">{task.title}</td>
                    <td className="p-3 text-center w-1/3 hidden sm:table-cell">{task.description}</td>
                    <td className="p-3 text-center hidden sm:table-cell">{task.dueDate}</td>
                    <td className="p-3 text-center hidden sm:table-cell">
                        <div className={`m-2 px-3 py-1 text-white ${task.status === 'COMPLETED' ? 'bg-green-600' : 'bg-yellow-300'} rounded-full`}>
                            {task.status}
                        </div>
                    </td>
                    <td className="p-3 text-center hidden sm:table-cell">
                        <span className="px-3 py-1 bg-gray-100 border border-black text-gray-800 rounded-md">{task.priority}</span>
                    </td>
                    <td className="p-3 flex justify-center gap-2">
                        <button onClick={() => openEditModal(task)} className="text-black px-3 py-1 rounded-md flex items-center gap-1">
                            <FaEdit />
                        </button>
                        <button onClick={() => openDeleteModal(task)} className="text-black px-3 py-1 rounded-md flex items-center gap-1">
                            <FaTrash />
                        </button>
                        <button onClick={() => toggleExpand(task.id)} className="text-black p-1 sm:hidden">
                            {expandedTaskId === task.id ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                    </td>
                </tr>
                {expandedTaskId === task.id && (
                    <tr className="sm:hidden">
                        <td colSpan={7} className="p-3">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <p className="font-semibold text-red-800">Description:</p>
                                    <p>{task.description}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="font-semibold text-red-800">Due Date:</p>
                                    <p>{task.dueDate}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="font-semibold text-red-800">Status:</p>
                                    <div className={`px-3 py-1 text-white ${task.status === 'COMPLETED' ? 'bg-green-600' : 'bg-yellow-300'} rounded-full`}>
                                        {task.status}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <p className="font-semibold text-red-800">Priority:</p>
                                    <span className="px-3 py-1 bg-gray-100 border border-black text-gray-800 rounded-md">{task.priority}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
            </React.Fragment>
        ))
    )}
</tbody>

            </table>

            {/* Edit Modal */}
            {isEditModalOpen && selectedTask && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-md w-[90%] max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
                        <form className="flex flex-col gap-4">
                            <input
                                type="text"
                                value={selectedTask.title}
                                onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                                className="border p-2 rounded-md"
                                placeholder="Task Title"
                            />
                            <textarea
                                value={selectedTask.description}
                                onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                                className="border p-2 rounded-md"
                                placeholder="Task Description"
                            ></textarea>
                            <input
                                type="date"
                                value={selectedTask.dueDate}
                                onChange={(e) => setSelectedTask({ ...selectedTask, dueDate: e.target.value })}
                                className="border p-2 rounded-md"
                            />
                            <select
                                value={selectedTask.status}
                                onChange={(e) => setSelectedTask({ ...selectedTask, status: e.target.value })}
                                className="border p-2 rounded-md"
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <select
                                value={selectedTask.priority}
                                onChange={(e) => setSelectedTask({ ...selectedTask, priority: e.target.value })}
                                className="border p-2 rounded-md"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            <div className="flex gap-4 mt-4">
                                <button type="button" className="border w-full border-red-800 text-red-800 px-4 py-2 rounded-md" onClick={closeModals}>
                                    Cancel
                                </button>
                                <button type="button" className="bg-red-800 w-full text-white px-4 py-2 rounded-md" onClick={handleUpdateTask}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-md">
                        <h2 className="text-2xl font-bold mb-4">Delete Task</h2>
                        <p>Are you sure you want to delete this task?</p>
                        <div className="flex gap-4 mt-4">
                            <button className="border w-full border-red-800 text-red-800 px-4 py-2 rounded-md" onClick={closeModals}>
                                Cancel
                            </button>
                            <button className="bg-red-800 w-full text-white px-4 py-2 rounded-md" onClick={handleDeleteTask}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
