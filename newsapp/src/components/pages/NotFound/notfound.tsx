import React from 'react';
import './notfound.styles.css';
const NotFound: React.FC = () => {
  return (
    <div className='not-found-container'>
      <h1 className='not-found-heading '>404 - Not Found</h1>
      <p className='not-found-description'>
        Oops! The page you're looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;


// Documentation for NotFound Component

/**
 * The `NotFound` component is a functional React component designed to display a user-friendly message indicating that the requested page was not found (HTTP 404 error). It is typically used in web applications to handle routes that do not match any defined path in the routing setup.
 *
 * ## Purpose
 * - To inform users that the page they are trying to access does not exist, has been moved, or the URL was entered incorrectly.
 * - To provide a consistent and styled user experience for handling route mismatches or invalid URLs.
 *
 * ## Features
 * - Displays a large `404 - Not Found` heading to immediately inform users of the error.
 * - Includes a brief description beneath the heading to explain that the page does not exist and to provide further clarity.
 * - Utilizes custom CSS for styling, ensuring that the error message is in line with the overall design language of the application.
 *
 * ## Styling
 * - The component uses a dedicated CSS file (`notfound.styles.css`) for styling. This allows for easy customization and ensures that the styles are encapsulated within the component.
 * - The `.not-found-container` class is used to style the container of the error message, centering the text and applying any necessary margins or padding.
 * - The `.not-found-heading` class applies styling specific to the `404 - Not Found` heading, such as font size, weight, and color.
 * - The `.not-found-description` class is used to style the explanatory text, making it slightly smaller than the heading but still prominent.
 *
 * */