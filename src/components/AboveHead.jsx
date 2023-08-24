import CADT from "../assets/CADT2.png"
import IDT from "../assets/IDT3.png"

export const AboveHead = () => {
  return (
    <div className="min-[1880px]:px-96
    lg:px-16
    md:px-6 px-6 flex flex-col gap-6 py-6">
      <div className="flex justify-between">
        <img src={CADT} alt="Logo" style={{ width: '512px', height: '50px' }}/>
        <img src={IDT} alt="Logo" style={{ width: '397px', height: '50px' }}/>
      </div>
      <div className="flex">
        <div className="outline-double w-[30%] p-2">
          <h1 className="font-bold">Team Members:</h1>
          <ul className="pl-10 font-semibold">
            <li>Khoun Sovansunchhay</li>
            <li>Em Ormreth Rethtihpong</li>
            <li>Kong Rattanakpanha</li>
            <li>John Liza</li>
            <li>Chan Liza</li>
          </ul>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="text-3xl font-extrabold pb-5 border-b-2 border-black">
            <h1>Final Project ~ Automata</h1>
            <h1>Lecturer: Dr. Valy Dona</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
