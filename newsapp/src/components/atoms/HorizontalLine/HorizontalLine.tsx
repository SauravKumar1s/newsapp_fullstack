import React from 'react';
import './HorizontalLine.styles.css';

interface Props {
  color: string;
  height: number;
}

const HorizontalLine: React.FC<Props> = ({color, height}) => {
  const style = {
    backgroundColor: color,
    height: `${height}px`,
    width: '85%', // or any desired width value
    margin: '10px auto', // center align the line
  };

  return <div className='horizontal-line' style={style} />;
};

export default HorizontalLine;


/**
 * Documentation for HorizontalLine Component
 *
 * Overview:
 * The `HorizontalLine` component is a simple, reusable component designed to render a customizable horizontal line.
 * It allows for customization of the line's color and height via props. The component can be used as a visual separator
 * within the UI of a React application.
 *
 * Props:
 * - `color`: A string specifying the color of the horizontal line. Any valid CSS color value can be used (e.g., hex,
 *   rgb, or color names).
 * - `height`: A number representing the height of the line in pixels. This value determines the thickness of the line.
 *
 * Styling:
 * The component uses inline styling to apply the specified color and height to the line. Additionally, it sets the
 * width of the line to 85% of its container's width and centers it horizontally. These styles can be adjusted by
 * modifying the `style` object within the component as needed.
 *
 * Usage:
 * To use the `HorizontalLine` component, import it into your component file and render it, providing the `color` and
 * `height` props for customization.
 *
 * Example:
 * ```jsx
 * import HorizontalLine from './HorizontalLine';
 *
 * const MyComponent = () => (
 *   <div>
 *     <p>Some content above the line</p>
 *     <HorizontalLine color="#FF6347" height={2} />
 *     <p>Some content below the line</p>
 *   </div>
 * );
 * ```
 *
 * In this example, a horizontal line with a tomato color and a height of 2 pixels is rendered between two paragraphs.
 * Adjust the `color` and `height` props as necessary to match the design requirements of your application.
 */