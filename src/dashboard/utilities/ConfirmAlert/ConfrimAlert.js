import React from 'react';

const ConfrimAlert = ({ title, message, successAction, successButtonName, modalData }) => {
  return (
    <div>
      {/* Put this part behtmlFor=e </body> tag */}
      <input type="checkbox" id="confirmAlert" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <label htmlhtmlFor="confirmAlert" className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transhtmlFor=m border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 cursor-pointer">
              Cancel
            </label>

            <label onClick={() => successAction(modalData)} htmlhtmlFor="confirmAlert" className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transhtmlFor=m bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
              {successButtonName}
            </label>
          </div>
        </div>
      </div >
    </div >
  );
};

export default ConfrimAlert;