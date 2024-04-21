import React, { useEffect, useLayoutEffect, useState } from 'react'
import Carcomponent from './components/Carcomponent'
import db from "./firebase/firebase"
import { addDoc, collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { TextField } from '@mui/material';
import { IoMdClose } from "react-icons/io";
const App = () => {
  const [jsondata, setjsondata] = useState([])
  const [spaceno, setSpaceno] = useState("")
  const [totalspace, setTotalspace] = useState(0)
  const [occupied_spaces, setOccupied_spaces] = useState(0)
  useEffect(() => {
    const fetchdata = () => {
      const q = query(collection(db, "parking_area1"))
      
      const unsub = onSnapshot(q, (docref) => {
        let total_spaces =0;
        let no_of_occupied_spaces=0;
        let array = []
        docref.forEach((data) => {
          total_spaces = total_spaces + 1
          if (data.data().occupied === true){
            no_of_occupied_spaces = no_of_occupied_spaces + 1
          }

          array.push(data.data())
        })
        setjsondata(array);
        setTotalspace(total_spaces)
        setOccupied_spaces(no_of_occupied_spaces)
      });
    }
    fetchdata()
  }, [])
  const handlesenddata = async () => {
    const data = {
      parkingspace_id: spaceno,
      occupied: false,
      parkingdata:
      {
        entry_time: "",
        exit_time: ""
      }

    }
    const docref = await addDoc(collection(db, "parking_area1"), data)
    alert("Space has been successfully created")
    setSpaceno("")
    setAddspace(false)
  }
  const [addspace, setAddspace] = useState(false)

  return (
    <>
      <nav className='absolute w-full h-[50px] bg-[#191a1c] flex justify-center items-center '>
        <p className='text-[#EEEEEE] font-semibold'>
          Parking Management
        </p>
      </nav>
      <button className='px-3 py-1 bg-orange-500 text-xs lg:text-sm hover:bg-orange-400 duration-300 ease-in-out text-white rounded-r-full rounded-l-full absolute top-3 right-3' onClick={() => {
        setAddspace(true)

      }}>
        Add space
      </button>
      {
        addspace && (
          <div className='w-screen h-screen z-40 absolute top-0 left-0 flex justify-center items-center ' >
            <div className='w-[300px]  px-[80px] py-[80px] flex flex-col justify-start items-center bg-[rgba(247,247,247,0.87)] border rounded-xl backdrop-blur-sm z-50 relative'>
              <p className='w-full text-center text-xs '>New parking space.</p>
              <p className='w-full text-center text-lg font-semibold'>Space NO</p>
              <input className='w-full bg-white border rounded-lg px-3 py-2  active:outline-1 outline-orange-400 mt-2 parkingno' placeholder='eg,8005' value={spaceno} onChange={(e) => {
                const inputValue = e.target.value;
                const regex = /^\d{0,4}$/;
                if (regex.test(inputValue)) {
                  setSpaceno(inputValue);
                }
              }} />
              <button type='submit' className='bg-black text-white px-3 py-1 rounded-lg mt-4' onClick={() => {
                handlesenddata()
              }}>
                Add
              </button>
              <button className='px-1 py-1 text-white bg-[rgba(218,218,218,0.9)] border border-[rgb(150,150,150)] rounded-full absolute -top-1 -right-1' onClick={() => setAddspace(false)}>
                <IoMdClose />
              </button>
            </div>
          </div>
        )
      }
      <div className='w-full h-[300px]  bg-black flex flex-col justify-center items-center'>
        <div className='w-full flex justify-center items-center'>
          <p className='text-white flex flex-col lg:flex-row justify-center items-center gap-2'>
            <span>
              Total Spaces 
            </span>
            <span className='text-4xl lg:text-[30pt] text-white parkingno'>
              {totalspace}
            </span>
          </p>
        </div><div className='w-full flex justify-center items-center gap-[30px] mt-4'>
          <p className='text-white flex flex-col lg:flex-row justify-center items-center gap-2'>
            <span>
              Occupied Spaces 
            </span>
            <span className='text-4xl lg:text-[30pt] text-white parkingno flex flex-col lg:flex-row justify-center items-center relative'>
             <span>{occupied_spaces}</span><p className='scale-90 px-1 text-xs text-white bg-orange-400 border rounded-r-full rounded-l-full mt-2 '> occupied</p>
            </span>
          </p><p className='text-white flex flex-col lg:flex-row justify-center items-center gap-2'>
            <span>
              Available Spaces 
            </span>
            <span className='text-4xl lg:text-[30pt] text-white parkingno flex flex-col lg:flex-row justify-center items-center relative'>
             <span>{totalspace-occupied_spaces}</span><p className='scale-90 px-1 text-xs text-white bg-green-500 border rounded-r-full rounded-l-full mt-2 '> Available</p>
            </span>
          </p>
        </div>
      </div>
      <div className='w-full pt-[10px] pb-[40px]'>
        <div className='w-full h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3   justify-center items-center sm:px-2 xl:px-[60px] gap-[10px]'>
          {
            jsondata.map((data) => (
              <Carcomponent key={data.parkingspace_id} data={data} />
            ))

          }
        </div>
      </div></>
  )
}

export default App