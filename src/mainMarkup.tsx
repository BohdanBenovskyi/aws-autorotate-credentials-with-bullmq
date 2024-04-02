import { useState, useEffect } from 'react';

const { autorotateApi } = window;

const MainMarkup = (): JSX.Element => {
  const [allConfigurations, setAllConfigurations] = useState([{}]);

  useEffect(() => {
    const getConfigurations = async (): Promise<void> => {
      const result = await autorotateApi.configurationsApi.getConfigurations();

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
        </h1>
        {allConfigurations?.map((config, index) => {
          return <section key={index}>{JSON.stringify(config)}</section>;
        })}
      </div>
    </>
  );
};

export default MainMarkup;
