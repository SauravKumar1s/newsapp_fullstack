import React from 'react';
import './Button.styles.css';

// Type definition for the props accepted by ButtonComponent

type ButtonProps = {
  children: React.ReactNode; // Content to be rendered inside the button
  onClick: () => void; // Click handler function for the button
  style?: React.CSSProperties; // Optional custom styling to be applied to the button
};

// ButtonComponent renders a customizable button that accepts children elements,
// an onClick handler, and optional custom styles.

const ButtonComponent = ({children, onClick, style}: ButtonProps) => {
  return (
     // Wrapper div to allow for additional styling or layout adjustments
    <div className='button-wrapper'>
      <button className='button' onClick={onClick} style={style}>
        {children}
      </button>
    </div>
  );
};

export default ButtonComponent;

/**
 * Documentation for ButtonComponent
 *
 * Overview:
 * `ButtonComponent` is a reusable button component designed for the React application. It provides an easy way to
 * create buttons with custom content, click behavior, and styling. The component encapsulates the button's logic
 * and styling, making it easy to use and customize throughout the application.
 *
 * Props:
 * - `children`: The content to be displayed inside the button. This can be text, icons, or any React node.
 * - `onClick`: A function to be called when the button is clicked. This is used to handle button click events.
 * - `style`: Optional. Custom CSS properties to apply to the button for additional styling beyond the base styles.
 *
 * Styling:
 * The button's base styling is defined in `Button.styles.css`, which should be included in the project for the
 * component to be rendered correctly. The `.button-wrapper` class is used for the div surrounding the button, allowing
 * for layout adjustments, while the `.button` class applies directly to the button element for core styling.
 *
 * Usage:
 * To use the `ButtonComponent` in your application, import it and render it wherever a button is needed. You can
 * provide any React node as children (such as text or icons), a function for `onClick` to handle user interactions,
 * and an optional `style` prop for custom styling.
 *
 * Example:
 * ```jsx
 * import ButtonComponent from './path/to/ButtonComponent';
 *
 * const MyComponent = () => (
 *   <ButtonComponent onClick={() => console.log('Button clicked')} style={{ backgroundColor: 'blue', color: 'white' }}>
 *     Click Me
 *   </ButtonComponent>
 * );
 * ```
 *
 * This example creates a button with the text "Click Me", a blue background, white text, and logs a message to the
 * console on click. Customize the `style` prop and `children` as needed to fit the design and functionality of your
 * application.
 */