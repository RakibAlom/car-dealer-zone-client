import React from 'react';

const ConfrimAlert = ({ htmlFor, title, message, successAction, successButtonName, modalData }) => {
  return (
    <div>
      {/* Put this part behtmlFor=e </body> tag */}
      <input type="checkbox" id={htmlFor} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box rounded max-w-sm p-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-2">{message}</p>
          <div className="modal-action my-2">
            <label htmlFor={htmlFor} className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 cursor-pointer">
              Cancel
            </label>

            <label onClick={() => successAction(modalData)} htmlFor={htmlFor} className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded sm:w-auto sm:mt-0 bg-[#f06425] hover:bg-[#FF731D] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 cursor-pointer">
              {successButtonName}
            </label>
          </div>
        </div>
      </div >
    </div >
  );
};

export default ConfrimAlert;