//Create a React root for displaying content inside a browser DOM element
import { createRoot } from 'react-dom/client';

// import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

//Finds the root of the app
const container = document.querySelector("#root");//assigned to the HTML element with the id "root"
const root = createRoot(container);//establishes the selected HTML element as the root for React app

//instucts React to render the app in the root DOM element
root.render(<App />);
