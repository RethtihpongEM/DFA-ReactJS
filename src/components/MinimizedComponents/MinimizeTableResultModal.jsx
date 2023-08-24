import { useContext } from "react";
import { MinimizedContext } from "../../context/MinimizedContext";
import { MinimizedTable } from "./MinimizeTable.jsx";

export const MinimizedTableResulModal = () => {
  const { showModal, setShowModal } = useContext(MinimizedContext);

  if (showModal) {
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto min-w-[500px] max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">Minimization Result</h3>
              </div>
              {/*body*/}
              <div>
                <MinimizedTable />
              </div>
              {/*footer*/}
              <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={(e) => {
                    setShowModal(false);
                    location.reload();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  }
};
