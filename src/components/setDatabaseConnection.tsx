import { useId, useState } from 'react';
import TestConnectionButton from './testConnectionButton';

const SetDatabaseConnection = (): JSX.Element => {
  const connectionStringInputId = useId();
  const connectionStringHelperTextId = useId();
  const connectionStringExampleTextId = useId();

  const [connectionString, setConnectionString] = useState('');

  return (
    <>
      <section className="flex">
        <section className="grow">
          <section className="relative">
            <input
              type="text"
              id={connectionStringInputId}
              name="connectionString"
              aria-describedby={connectionStringHelperTextId}
              className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(event) => {
                setConnectionString(event.target.value);
              }}
            />

            <label
              htmlFor={connectionStringInputId}
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Connection string
            </label>
          </section>
        </section>
        {connectionString !== '' && (
          <section className="ml-2 self-strech">
            <TestConnectionButton connectionString={connectionString} />
          </section>
        )}
      </section>
      <section
        id={connectionStringHelperTextId}
        className="mt-2 text-xs text-gray-500 dark:text-gray-400"
      >
        <section id={connectionStringExampleTextId}>
          <code className="text-xs xs:text-base inline-flex text-left items-center space-x-4 bg-gray-50 dark:bg-gray-700 text-white rounded-lg p-1 pl-2">
            <span className="flex gap-4">
              <span className="shrink-0 text-gray-500">MongoDB example $:</span>

              <span className="flex-1">
                <span className="text-yellow-500">
                  mongodb://username:password@host:port/databaseName
                </span>
              </span>
            </span>
          </code>
        </section>
      </section>
    </>
  );
};

export default SetDatabaseConnection;
