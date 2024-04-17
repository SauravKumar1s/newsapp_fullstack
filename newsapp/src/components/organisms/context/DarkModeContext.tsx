// DarkModeContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// Defines the shape of props expected by the DarkModeProvider component
interface DarkModeContextProps {
  children: ReactNode;
}

// Defines the shape of the context value provided by DarkModeProvider
interface DarkModeContextValue {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Creating a context for dark mode with an initial undefined value
const DarkModeContext = createContext<DarkModeContextValue | undefined>(
  undefined
);

// DarkModeProvider component wraps child components to provide them with dark mode context
export const DarkModeProvider: React.FC<DarkModeContextProps> = ({
  children,
}) => {
  // State to track whether dark mode is enabled, initialized from localStorage
  const [isDarkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

    // Function to toggle dark mode state and save the preference to localStorage
  const toggleDarkMode = () => {
    setDarkMode((prevMode: any) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

    // Effect hook to synchronize the component's state with localStorage on mount
  useEffect(() => {
    // Ensure the dark mode state is consistent after a page refresh
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Providing the dark mode state and toggle function to child components
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Custom hook to use the dark mode context
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};

/**
 * Documentation for DarkModeContext
 *
 * Overview:
 * This module provides a React context for managing dark mode within an application. It includes a context provider
 * (`DarkModeProvider`) and a custom hook (`useDarkMode`) for easy access to dark mode state and functionality.
 *
 * DarkModeProvider:
 * - Wraps part or all of an application to provide children with access to the dark mode context.
 * - Initializes dark mode state based on the user's saved preference in localStorage, defaulting to light mode.
 * - Provides a toggle function (`toggleDarkMode`) to switch between dark and light modes, persisting the preference.
 *
 * useDarkMode Hook:
 * - Facilitates access to the dark mode state and toggle functionality within any component rendered inside a
 *   `DarkModeProvider`.
 * - Ensures that components can reactively update based on dark mode state changes.
 *
 * Usage:
 * Wrap your application or component tree with `DarkModeProvider` to enable dark mode functionality throughout:
 * ```jsx
 * ReactDOM.render(
 *   <DarkModeProvider>
 *     <App />
 *   </DarkModeProvider>,
 *   document.getElementById('root')
 * );
 * ```
 *
 * Access dark mode state and toggle functionality in components with `useDarkMode`:
 * ```jsx
 * const Component = () => {
 *   const { isDarkMode, toggleDarkMode } = useDarkMode();
 *   return (
 *     <button onClick={toggleDarkMode}>
 *       Switch to {isDarkMode ? "light" : "dark"} mode
 *     </button>
 *   );
 * };
 * ```
 *
 * This setup provides a robust and reusable solution for implementing dark mode, enhancing user experience by
 * respecting their visual preference across the application.
 */
