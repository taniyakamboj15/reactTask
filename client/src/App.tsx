import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import { TasksProvider } from './context/TasksContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/Toast/ToastContainer';
import { MainLayout } from './layouts/MainLayout';
import { ChatPage } from './pages/ChatPage';
import { DashboardPage } from './pages/DashboardPage';

const App = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <SocketProvider>
          <TasksProvider>
            <BrowserRouter>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<ChatPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
              </MainLayout>
            </BrowserRouter>
          </TasksProvider>
        </SocketProvider>
        <ToastContainer />
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
