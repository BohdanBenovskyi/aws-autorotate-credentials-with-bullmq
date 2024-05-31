import { useEffect } from 'react';
import { initFlowbite } from 'flowbite';

import ToastSuccessIcon from '../../assests/svg/toastSuccessIcon.svg';
import ToastFailIcon from '../../assests/svg/toastFailIcon.svg';
import ToastCloseCross from '../../assests/svg/toastCloseCross.svg';
import ToastSmallCloseCross from '../../assests/svg/toastSmallCloseCrossIcon.svg';
import ToastRefreshIcon from '../../assests/svg/toastRefreshIcon.svg';

const Toast = (props: {
  toastId: string;
  toastType: string;
  toastText: string;
  deleteToast: () => void;
  toastTitle?: string;
  toastActionHandler?: () => void;
}): JSX.Element => {
  const {
    toastId,
    toastType,
    toastText,
    deleteToast,
    toastTitle = 'Update available',
    toastActionHandler,
  } = props;

  useEffect(() => {
    initFlowbite();
  }, []);

  const renderSuccessToast = (): JSX.Element => {
    return (
      <section
        id={'success-toast-' + toastId}
        className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow text-gray-400 bg-gray-900 fixed top-5 right-5"
        role="alert"
      >
        <section className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-gray-900 rounded-lg bg-green-800 text-green-200">
          <ToastSuccessIcon />
          <span className="sr-only">Check icon</span>
        </section>
        <section className="ms-3 text-sm font-normal">{toastText}</section>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700"
          data-dismiss-target={'#success-toast-' + toastId}
          aria-label="Close"
          onClick={() => {
            deleteToast();
          }}
        >
          <span className="sr-only">Close</span>
          <ToastCloseCross />
        </button>
      </section>
    );
  };

  const renderFailToast = (): JSX.Element => {
    return (
      <section
        id={'failed-toast-' + toastId}
        className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow text-gray-400 bg-gray-900 fixed top-5 right-5"
        role="alert"
      >
        <section className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-gray-900 rounded-lg bg-red-800 text-red-200">
          <ToastFailIcon />
          <span className="sr-only">Error icon</span>
        </section>
        <section className="ms-3 text-sm font-normal">{toastText}</section>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700"
          data-dismiss-target={'#failed-toast-' + toastId}
          aria-label="Close"
          onClick={() => {
            deleteToast();
          }}
        >
          <span className="sr-only">Close</span>
          <ToastCloseCross />
        </button>
      </section>
    );
  };

  const renderUpdateInfoToast = (): JSX.Element => {
    return (
      <section
        id={'toast-interactive-' + toastId}
        className="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow bg-gray-900 text-gray-400 fixed top-5 right-5"
        role="alert"
      >
        <section className="flex">
          <section className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-gray-800 rounded-lg text-blue-300 bg-blue-900">
            <ToastRefreshIcon />
            <span className="sr-only">Refresh icon</span>
          </section>
          <section className="ms-3 text-sm font-normal">
            <span className="mb-1 text-sm font-semibold text-gray-900 text-white">
              {toastTitle}
            </span>
            <section className="mb-2 text-sm font-normal">{toastText}</section>
            <section className="grid grid-cols-2 gap-2">
              <section>
                <a
                  href="#"
                  className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 bg-blue-500 hover:bg-blue-600 focus:ring-blue-800"
                  onClick={() => {
                    toastActionHandler !== undefined && toastActionHandler();
                  }}
                >
                  Setup
                </a>
              </section>
              <section>
                <a
                  href="#"
                  className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 bg-gray-600 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-700 focus:ring-gray-700"
                  data-dismiss-target={'#toast-interactive-' + toastId}
                  aria-label="Close"
                  onClick={() => {
                    deleteToast();
                  }}
                >
                  Not now
                </a>
              </section>
            </section>
          </section>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700"
            data-dismiss-target={'#toast-interactive-' + toastId}
            aria-label="Close"
            onClick={() => {
              deleteToast();
            }}
          >
            <span className="sr-only">Close</span>
            <ToastSmallCloseCross />
          </button>
        </section>
      </section>
    );
  };

  switch (toastType) {
    case 'success':
      return renderSuccessToast();
    case 'fail':
      return renderFailToast();
    case 'update':
      return renderUpdateInfoToast();
    default:
      throw new Error('This toast type was not implemented!');
  }
};

export default Toast;
