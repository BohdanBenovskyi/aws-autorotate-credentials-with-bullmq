import TestDatabaseConnection from './../../assests/svg/testDatabaseConnection.svg';

const { autorotateApi } = window;

const TestConnectionButton = (props: {
  connectionString: string;
}): JSX.Element => {
  const testConnection = async (): Promise<void> => {
    const testConnectionResult =
      await autorotateApi.configurationsApi.testConnection(
        props.connectionString,
      );

    console.log(testConnectionResult);
  };

  return (
    <>
      <button
        type="button"
        className="flex h-full justify-center items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400"
        onClick={testConnection}
      >
        <TestDatabaseConnection className="h-5 w-5 ml-1 mr-3 text-white fill-blue-950" />
        Test connection
      </button>
    </>
  );
};

export default TestConnectionButton;
