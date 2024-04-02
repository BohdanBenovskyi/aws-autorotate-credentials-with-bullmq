// import { ipcRenderer } from 'electron';
import { useState, useEffect } from 'react';

const { autorotateApi } = window;

const MainMarkup = (): JSX.Element => {
  const [allConfigurations, setAllConfigurations] = useState([{}]);

  useEffect(() => {
    const getConfigurations = async (): Promise<void> => {
      // const result = await ipcRenderer.invoke('get-configurations', null);

      const result = await autorotateApi.configurationsApi.getConfigurations();

      console.log(`Result from component => ${JSON.stringify(result)}`);

      setAllConfigurations(
        result as Array<{ id: 'string'; mapping: Record<string, string> }>,
      );
    };

    void getConfigurations();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline bg-red-200">
          Hello from Main Markup
          {JSON.stringify(allConfigurations)}
        </h1>
      </div>
    </>
  );
};

export default MainMarkup;
