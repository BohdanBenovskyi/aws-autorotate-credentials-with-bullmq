import { useState, useEffect } from 'react';

const { autorotateApi } = window;

const EnvListComponent = (props: {
  pathToWorkingDirectory: string;
}): JSX.Element => {
  const [envPaths, setEnvPaths] = useState<
    Array<{ folder: string; path: string }>
  >([]);

  const findAllEnvFilesForPath = async (): Promise<void> => {
    console.log('DirPath', props.pathToWorkingDirectory);

    const envFiles = await autorotateApi.configurationsApi.findEnvFiles(
      props.pathToWorkingDirectory,
    );

    console.log(envFiles);

    setEnvPaths(envFiles);
  };

  useEffect(() => {
    void findAllEnvFilesForPath();
  }, []);

  const rotateAll = async (): Promise<void> => {
    console.log('Rotate All');
    console.table(envPaths);
    console.log('Rotate All');
  };

  const rotateItem = async (envFileItem: {
    folder: string;
    path: string;
  }): Promise<void> => {
    console.log('Rotate Item');
    console.table(envFileItem);
    console.log('Rotate Item');
  };

  return (
    <>
      <section className="mt-2 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-700 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Folder name
              </th>
              <th scope="col" className="px-6 py-3">
                Path
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                <button
                  type="button"
                  className="flex h-full justify-center items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400"
                  onClick={rotateAll}
                >
                  Rotate All
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {envPaths.map((envPath, index) => {
              return (
                <tr
                  key={index}
                  className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-white"
                  >
                    {envPath.folder}
                  </th>
                  <td className="px-6 py-4">{envPath.path}</td>
                  <td className="px-6 py-4">In Progress</td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="flex h-full justify-center items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400"
                      onClick={async () => {
                        await rotateItem(envPath);
                      }}
                    >
                      Rotate Item
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default EnvListComponent;
