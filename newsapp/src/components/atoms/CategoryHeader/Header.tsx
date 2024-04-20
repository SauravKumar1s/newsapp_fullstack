import React from "react";
import "./Header.styles.css";
import { useDarkMode } from "../../organisms/context/DarkModeContext";

// Type definition for props accepted by CategoryHeader component
type CategoryHeaderProps = {
  title: string; // Title to display in the header
  onClick?: any; // Optional click handler for the header
  style?: React.CSSProperties; // Optional CSS properties to apply to the header text
};

// Type definition for props accepted by CategoryHeader component
const CategoryHeader = ({ title, onClick, style }: CategoryHeaderProps) => {
  // Utilizes the useDarkMode hook to determine if dark mode is active
  const { isDarkMode } = useDarkMode();

  // Renders the component with conditional styling based on the dark mode state
  return (
    <div
      className={
        isDarkMode
          ? "dark-mode text-white py-5 mt-10 bg-blue-400 cursor-pointer"
          : "light-mode  text-white bg-blue-500 py-3 mt-4 mb-3 cursor-pointer"
      }
    >
      <a onClick={onClick}>
        <h3
          style={style}
          className="flex text-xl font-semibold uppercase justify-center items-center"
        >
          {title}
          <span className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
        </h3>
      </a>
    </div>
  );
};

export default CategoryHeader;

/**
 * Documentation for CategoryHeader Component
 *
 * Overview:
 * The `CategoryHeader` component is designed to display a customizable header for different categories within the
 * application. It supports dark mode, dynamically adjusting its styling based on the application's theme. The
 * component is highly reusable and can be tailored with a click handler and custom styles.
 *
 * Props:
 * - `title`: The text to display in the header. This is required.
 * - `onClick`: An optional click handler function for when the header is clicked. This can be used to navigate to
 *    different parts of the application or trigger specific actions.
 * - `style`: Optional custom CSS properties to apply directly to the header text, allowing for further customization.
 *
 * Styling:
 * The component uses conditional styling based on the dark mode state. It applies different background colors and
 * padding based on whether dark mode is active. Styles are defined in `Header.styles.css`, with additional inline
 * styles applied via the `style` prop.
 *
 * Usage:
 * To use the `CategoryHeader` in your application, simply import the component and provide the required `title`
 * prop, along with any optional `onClick` and `style` props as needed.
 *
 * ```jsx
 * <CategoryHeader title="Latest News" onClick={() => console.log('Header clicked')} style={{ color: 'red' }} />
 * ```
 *
 * This component is particularly useful for categorizing sections within a page or application, offering a visually
 * consistent way to display category titles with interactive capabilities.
 */
