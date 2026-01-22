# Client Application Documentation

## Architecture Overview

This React application utilizes a component-based architecture with global state management to ensure a seamless user experience. The system is designed to handle real-time communication and persistent background tasks effectively.

### Project Structure (Key Directories)

*   **`src/components`**: Modular UI components. divided into functional domains (`Chat`, `Sidebar`, `Common`).
*   **`src/context`**: Global state providers (React Context) for managing application-wide data flows.
*   **`src/hooks`**: Custom hooks for encapsulating complex logic and reusable behavior.
*   **`src/layouts`**: Higher-order components defining the structural framework of the application.

---

## core Mechanisms

### 1. Task Persistence (Uploads/Downloads)

**Problem**: Ensuring upload/download progress remains visible and active when users navigate between different application views (e.g., switching from Chat to Dashboard).

**Implementation**:
*   **Global State**: A `TasksContext` lifts the state of all active background operations to the application root. This decouples the task lifecycle from individual page components.
*   **Persistent Layout**: The `MainLayout` component wraps the routing layer. Sidebar components, which display task progress, remain mounted during route transitions, preventing unnecessary re-renders or state loss.
*   **Storage Fallback**: `localStorage` is implemented as a persistence layer to recover the task state in the event of a browser refresh (F5).

### 2. Real-Time Communication Layer

The application enables bi-directional real-time events between the client and server using an event-driven architecture.

*   **Socket Provider**: A singleton connection is established via `SocketContext` (`context/SocketContext.tsx`) upon application initialization.
*   **Event Handling**:
    *   **Data Synchronization**: `useChat` consumes socket events to update message feeds instantly.
    *   **Task Updates**: `TasksContext` listens for `task:progress` and `task:completed` events to update UI progress indicators without polling.

### 3. UI Component Integrations

**Dropdown Components**:
We utilize **`react-select`** for the room selection interface (`src/components/Chat/RoomSelector.tsx`) to provide extended functionality (search, keyboard navigation) that native select elements lack.
*   **Customization**: A custom hook (`useSelectStyles`) is implemented to override default styles, ensuring the component aligns with the application's design system (Glassmorphism) and adapts dynamically to Theme (Light/Dark) changes.
