//Create a React root for displaying content inside a browser DOM element
import { createRoot } from 'react-dom/client';

const container = document.querySelector("#root");//assigned to the HTML element with the id "root"
const root = createRoot(container);//establishes the selected HTML element as the root for React app

root.render(<App />);
