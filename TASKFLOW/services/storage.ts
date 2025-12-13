import { Task, User } from '../types';

const TASKS_KEY = 'taskflow_tasks';
const USER_KEY = 'taskflow_user';

export const storage = {
  getTasks: (): Task[] => {
    try {
      const data = localStorage.getItem(TASKS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to load tasks", e);
      return [];
    }
  },

  saveTasks: (tasks: Task[]) => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  },

  getUser: (): User | null => {
    try {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  saveUser: (user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  logout: () => {
    localStorage.removeItem(USER_KEY);
  }
};
