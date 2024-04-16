import { useState } from 'react';

import SettingsLogo from './../../assests/svg/settings.svg';
import SetDatabaseConnection from './setDatabaseConnection';

const MainMarkup = (): JSX.Element => {
  const [setupComponentVisibility, setSetupComponentVisibility] =
    useState(false);

  return (
    <>
      {!setupComponentVisibility && (
        <section className="grid justify-items-center">
          <button
            type="button"
            onClick={() => {
              setSetupComponentVisibility(true);
            }}
            className="flex justify-center items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 hover:scale-125 ease-in-out duration-700"
          >
            <SettingsLogo className="h-5 w-5 ml-1 mr-3 animate-spin text-white fill-blue-950" />
            Get started
          </button>
        </section>
      )}

      {setupComponentVisibility && <SetDatabaseConnection />}
    </>
  );
};

export default MainMarkup;
