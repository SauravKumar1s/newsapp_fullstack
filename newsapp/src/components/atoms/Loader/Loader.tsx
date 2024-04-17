import { ThreeDots } from 'react-loader-spinner';

// Loader component that renders a spinner to indicate loading state
const Loader = () => {
  return (
    // Container for the loader with padding for visual spacing
    <div style={{ padding: '350px' }}>
      {/* ThreeDots spinner from react-loader-spinner library */}
      <ThreeDots
        height='80' // Height of the spinner
        width='80' // Width of the spinner
        radius='9' // Radius of dots in the spinner
        color='#4fa94d' // Color of the spinner
        ariaLabel='three-dots-loading' // Accessible label for the spinner
        wrapperStyle={{}} // Custom styles for the spinner wrapper
        visible={true} // Controls the visibility of the spinner
      />
    </div>
  );
};

export default Loader;

/**
 * Documentation for Loader Component
 *
 * Overview:
 * The `Loader` component is designed to provide visual feedback during loading states within a React application.
 * It utilizes the `ThreeDots` spinner from the `react-loader-spinner` library to display an animated loading indicator.
 * The component is highly customizable and can be adjusted to fit the design requirements of various applications.
 *
 * Props:
 * This component does not accept any props directly. However, the `ThreeDots` spinner component it uses is highly 
 * customizable through props such as `height`, `width`, `radius`, `color`, etc. These can be adjusted within the 
 * component as needed.
 *
 * Styling:
 * The loader is centrally positioned within its container by default, achieved by applying a large padding to the 
 * container div. Additional styling can be applied directly to the `ThreeDots` component via the `wrapperStyle` prop.
 *
 * Usage:
 * To use the `Loader` component in your application, simply import it and include it in your component tree where a 
 * loading indicator is required. For example, it can be conditionally rendered while awaiting data fetch completion.
 *
 * Example:
 * ```jsx
 * import Loader from './Loader';
 *
 * const MyComponent = () => {
 *   const [isLoading, setIsLoading] = useState(true);
 *   
 *   useEffect(() => {
 *     fetchData().then(() => {
 *       setIsLoading(false);
 *     });
 *   }, []);
 *   
 *   return (
 *     <div>
 *       {isLoading ? <Loader /> : <div>Content has loaded!</div>}
 *     </div>
 *   );
 * };
 * ```
 *
 * This example demonstrates how to render the `Loader` component conditionally based on the `isLoading` state, which 
 * could be set based on asynchronous data fetching logic.
 *
 * Note:
 * Ensure the `react-loader-spinner` library is installed in your project to use the `ThreeDots` spinner component.
 * Customize the loader as needed to align with your application's visual and accessibility standards.
 */
