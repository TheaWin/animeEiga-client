//Create a React root for displaying content inside a browser DOM element
import { createRoot } from 'react-dom/client';

/* syntax to import components:
import { ComponentName } from '[path to the component file]'; */
import { MainView } from './components/main-view/main-view';

// import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

//Main component
const AnimeApplication = () => {
  return <MainView />;
}

//Finds the root of the app
const container = document.querySelector("#root");//assigned to the HTML element with the id "root"
const root = createRoot(container);//establishes the selected HTML element as the root for React app

//instucts React to render the app in the root DOM element
root.render(<AnimeApplication />);
