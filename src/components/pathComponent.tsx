import { useState } from 'react';

const { autorotateApi } = window;

const PathComponent = ({
  setDirectoryPath,
}: {
  setDirectoryPath: (directoryPath: string) => void;
}): JSX.Element => {
  const [currentDirectory, setCurrentDirectory] = useState(
    'No directory selected',
  );

  const handleDirectorySelect = async (): Promise<void> => {
    const result = await autorotateApi.configurationsApi.selectDirectories();

    if (result.length > 0) {
      console.log(result);
      setDirectoryPath(result[0]);
      setCurrentDirectory(result[0]);
    }
  };

  return (
    <form className="flex flex-row items-center rounded-lg px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-900 bg-gray-50 bg-gray-700 border-0 text-white mt-2">
      <input
        type="file"
        id="custom-input"
        onClick={async (event) => {
          event.preventDefault();
          await handleDirectorySelect();
        }}
        hidden
      />

      <label
        htmlFor="custom-input"
        className="flex justify-center w-full max-w-40 items-center px-4 py-2 font-semibold text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 cursor-pointer"
      >
        Choose directory
      </label>
      <label className="text-sm text-slate-500 w-full ml-2">
        {currentDirectory}
      </label>
    </form>
  );
};

export default PathComponent;
