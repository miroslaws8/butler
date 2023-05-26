/* global chrome */

import './index.css';
import {MantineProvider} from '@mantine/core';
import {useChromeStorageLocal} from "use-chrome-storage";
import MainDialog from "./Components/MainDialog";
import {ChromeService} from "./Services/ChromeService";

function App() {
    const [butlerActive] = useChromeStorageLocal(ChromeService.getStorageKey(), true);

    return (
      <MantineProvider>
        <div className='butlerModal'>
            { butlerActive && <MainDialog /> }
        </div>
      </MantineProvider>
  );
}

export default App;
