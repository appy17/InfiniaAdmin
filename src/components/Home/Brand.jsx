import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Brand() {

  const navigate=useNavigate()

  const handleEcomagix = () => {
    navigate('/ecomagix')
  }
  const handleClaymagix = () => {
    navigate('/claymagix')
  }
  const handleWoodmagix = () => {
    navigate('/woodmagix')
  }
  const handleSkyace = () => {
    navigate('/skyace')
  }

  return (
    <div className="flex justify-center items-center mt-[-100px] ml-[250px] min-h-screen">
      <div className="flex gap-10 justify-center items-center">
        <div className="max-w-32 bg-transparent items-center justify-center flex border-2 border-sky-500 shadow-lg hover:bg-sky-500 text-sky-500 hover:text-white duration-300 cursor-pointer active:scale-[0.98]">
          <button onClick={handleEcomagix} className="px-5 py-2">
            Ecomagix
          </button>
        </div>
        <div className="max-w-32 bg-transparent items-center justify-center flex border-2 border-sky-500 shadow-lg hover:bg-sky-500 text-sky-500 hover:text-white duration-300 cursor-pointer active:scale-[0.98]">
          <button onClick={handleClaymagix} className="px-5 py-2">
            Claymagix
          </button>
        </div>
        <div className="max-w-32 bg-transparent items-center justify-center flex border-2 border-sky-500 shadow-lg hover:bg-sky-500 text-sky-500 hover:text-white duration-300 cursor-pointer active:scale-[0.98]">
          <button onClick={handleWoodmagix} className="px-5 py-2">
            Woodmagix
          </button>
        </div>
        <div className="max-w-32 bg-transparent items-center justify-center flex border-2 border-sky-500 shadow-lg hover:bg-sky-500 text-sky-500 hover:text-white duration-300 cursor-pointer active:scale-[0.98]">
          <button onClick={handleSkyace} className="px-5 py-2">Skyace</button>
        </div>
      </div>
    </div>
  );
}
