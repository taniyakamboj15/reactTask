import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { useSocket } from './SocketContext';
import type { ReactNode } from 'react';

export type TaskType = 'upload' | 'download' | 'process';
export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed';

export type Task = {
  id: string;
  type: TaskType;
  name: string;
  progress: number;
  status: TaskStatus;
  roomId: string;
  updatedAt: number;
};

type TaskProgressPayload = {
  taskId: string;
  progress: number;
};

type TasksState = {
  tasks: Task[];
};

type TasksActions = {
  tasks: Task[];
  removeTask: (taskId: string) => void;
  clearCompleted: () => void;
};

const STORAGE_KEY = 'tasks:v1';
const MAX_TASKS = 50;

type Action =
  | { type: 'hydrate'; tasks: Task[] }
  | { type: 'task:start'; task: Task }
  | { type: 'task:progress'; taskId: string; progress: number }
  | { type: 'task:completed'; taskId: string }
  | { type: 'task:failed'; taskId: string }
  | { type: 'remove'; taskId: string }
  | { type: 'clearCompleted' };

const clamp01to100 = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

const tasksReducer = (state: TasksState, action: Action): TasksState => {
  switch (action.type) {
    case 'hydrate': {
      return { tasks: action.tasks };
    }
    case 'task:start': {
      const next: Task = {
        ...action.task,
        progress: clamp01to100(action.task.progress ?? 0),
        status: action.task.status ?? 'running',
        updatedAt: Date.now(),
      };
      const deduped = state.tasks.filter((t) => t.id !== next.id);
      return { tasks: [next, ...deduped].slice(0, MAX_TASKS) };
    }
    case 'task:progress': {
      const progress = clamp01to100(action.progress);
      return {
        tasks: state.tasks.map((t) =>
          t.id === action.taskId
            ? { ...t, progress, status: t.status === 'pending' ? 'running' : t.status, updatedAt: Date.now() }
            : t
        ),
      };
    }
    case 'task:completed': {
      return {
        tasks: state.tasks.map((t) =>
          t.id === action.taskId ? { ...t, status: 'completed', progress: 100, updatedAt: Date.now() } : t
        ),
      };
    }
    case 'task:failed': {
      return {
        tasks: state.tasks.map((t) =>
          t.id === action.taskId ? { ...t, status: 'failed', updatedAt: Date.now() } : t
        ),
      };
    }
    case 'remove': {
      return { tasks: state.tasks.filter((t) => t.id !== action.taskId) };
    }
    case 'clearCompleted': {
      return { tasks: state.tasks.filter((t) => t.status !== 'completed') };
    }
    default: {
      return state;
    }
  }
};

const safeLoadTasks = (): Task[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((t): t is Task => !!t && typeof t === 'object')
      .map((t) => {
        const obj = t as Record<string, unknown>;
        return {
          id: String(obj.id),
          type: obj.type as TaskType,
          name: String(obj.name ?? 'Task'),
          progress: clamp01to100(Number(obj.progress ?? 0)),
          status: (obj.status as TaskStatus) ?? 'running',
          roomId: String(obj.roomId ?? 'general'),
          updatedAt: typeof obj.updatedAt === 'number' ? obj.updatedAt : Date.now(),
        };
      })
      .slice(0, MAX_TASKS);
  } catch {
    return [];
  }
};

const TasksContext = createContext<TasksActions | undefined>(undefined);

export const useTasks = (): TasksActions => {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks must be used within <TasksProvider>');
  return ctx;
};

type TasksProviderProps = {
  children: ReactNode;
};

export const TasksProvider = ({ children }: TasksProviderProps) => {
  const { socket } = useSocket();
  const [state, dispatch] = useReducer(tasksReducer, { tasks: [] });

  useEffect(() => {
    dispatch({ type: 'hydrate', tasks: safeLoadTasks() });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    } catch {
    }
  }, [state.tasks]);

  useEffect(() => {
    if (!socket) return;

    const onStart = (task: Omit<Task, 'updatedAt'>) => {
      dispatch({ type: 'task:start', task: { ...task, updatedAt: Date.now() } });
    };

    const onProgress = (payload: TaskProgressPayload) => {
      dispatch({ type: 'task:progress', taskId: payload.taskId, progress: payload.progress });
    };

    const onCompleted = (task: { id: string }) => {
      dispatch({ type: 'task:completed', taskId: task.id });
    };

    const onFailed = (task: { id: string }) => {
      dispatch({ type: 'task:failed', taskId: task.id });
    };

    socket.on('task:start', onStart);
    socket.on('task:progress', onProgress);
    socket.on('task:completed', onCompleted);
    socket.on('task:failed', onFailed);

    return () => {
      socket.off('task:start', onStart);
      socket.off('task:progress', onProgress);
      socket.off('task:completed', onCompleted);
      socket.off('task:failed', onFailed);
    };
  }, [socket]);

  const removeTask = useCallback((taskId: string) => dispatch({ type: 'remove', taskId }), []);
  const clearCompleted = useCallback(() => dispatch({ type: 'clearCompleted' }), []);

  const value = useMemo<TasksActions>(
    () => ({
      tasks: state.tasks,
      removeTask,
      clearCompleted,
    }),
    [state.tasks, removeTask, clearCompleted]
  );

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};


