// context/TaskContext.tsx
"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  priority: string;
}

interface TaskContextProps {
  tasks: Task[];
  fetchTasks: () => void;
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  sortTasks: (ascending: boolean) => void;
  filterTasks: (priority: string) => void;
  searchTasks: (title: string) => void; // New function for searching
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [originalTasks, setOriginalTasks] = useState<Task[]>([]); // Store unfiltered tasks

  const fetchTasks = async () => {
    const response = await axios.get("/api/tasks/fetch");
    setTasks(response.data);
    setOriginalTasks(response.data); // Initialize originalTasks with fetched data
  };

  const addTask = async (task: Omit<Task, "id">) => {
    const response = await axios.post("/api/tasks/create", task);
    setTasks((prev) => [...prev, response.data]);
    setOriginalTasks((prev) => [...prev, response.data]); // Update originalTasks as well
  };

  const updateTask = async (task: Task) => {
    const response = await axios.put("/api/tasks/update", task);
    setTasks((prev) => prev.map((t) => (t.id === task.id ? response.data : t)));
    setOriginalTasks((prev) =>
      prev.map((t) => (t.id === task.id ? response.data : t))
    ); // Update originalTasks as well
  };

  const deleteTask = async (id: number) => {
    await axios.delete("/api/tasks/delete", { data: { id } });
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setOriginalTasks((prev) => prev.filter((task) => task.id !== id)); // Update originalTasks as well
  };

  const sortTasks = (ascending: boolean) => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return ascending ? dateA - dateB : dateB - dateA;
    });
    setTasks(sortedTasks);
  };

  const filterTasks = (priority: string) => {
    if (priority === "") {
      setTasks(originalTasks); // Reset to originalTasks if no filter is selected
    } else {
      const filteredTasks = originalTasks.filter(
        (task) => task.priority.toUpperCase() === priority.toUpperCase()
      );
      setTasks(filteredTasks);
    }
  };

  const searchTasks = (title: string) => {
    if (title === "") {
      setTasks(originalTasks); // Reset to originalTasks if search input is empty
    } else {
      const searchedTasks = originalTasks.filter((task) =>
        task.title.toLowerCase().includes(title.toLowerCase())
      );
      setTasks(searchedTasks);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        sortTasks,
        filterTasks,
        searchTasks, // Include searchTasks in the provider value
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};
