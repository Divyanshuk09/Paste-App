import React, { useState } from "react";
import { CiEdit, CiSearch, CiShare2 } from "react-icons/ci";
import { MdDelete, MdOutlineContentCopy, MdRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes, updateToPastes } from "../features/pasteSlice";
import toast from "react-hot-toast";
import ViewPaste from "./ViewPaste";
import { NavLink } from "react-router";

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [viewPaste, setViewPaste] = useState(null);

  const dispatch = useDispatch();

  const [searchItem, setSearchItem] = useState("");
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  function handleDelete(pasteId) {
    console.log("handleDel clicked");
    dispatch(removeFromPastes(pasteId));
  }
  function handleShare(paste) {
    console.log("handleshare clicked");
    navigator.clipboard.writeText(
      `${window.location.origin}/pastes/${paste._id}`
    );
    toast.success("Shareable link copied!");
  }

  function handleCopy(paste) {
    navigator.clipboard.writeText(paste.content);
    toast.success("Content copied to clipboard!");
  }

  return (
    <>
      {/* Search Bar */}
      <div className="flex gap-2 border border-gray-800 py-2 px-4 items-center rounded-lg md:w-[50%] sm:w-[90%] mx-auto bg-black">
        <CiSearch className="text-white text-xl" />
        <input
          className="w-full border-none outline-none bg-transparent text-white text-lg placeholder-gray-400"
          type="text"
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Search the paste here..."
        />
      </div>

      {/* List of All Pastes */}
      <div className="listofallpastes rounded-lg mt-5 md:w-[50%] sm:w-[90%] mx-auto">
        <h1 className="text-xl bg-black p-2 border border-gray-600">
          All Pastes
        </h1>

        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="flex flex-row justify-between bg-black p-4 border border-gray-600 mt-2 h-30 overflow-y-auto scrollbar-thick scrollbar-thumb-gray-500 scrollbar-track-transparent"
            >
              {/* Left Section (TITLE and CONTENT) */}
              <div className="sm:w-[70%] gap-1 flex flex-col">
                <p className="text-white font-mono font-bold">
                  {paste.title.toUpperCase()}
                </p>
                <p className="text-gray-300 text-sm font-mono">
                  {paste.content}
                </p>
              </div>

              {/* Right Section (Actions and Date) */}
              <div className="flex flex-col items-center">
                <ul className="flex gap-2 text-white text-[24px] sm:text-[28px] mb-2 sm:mb-0">
                  <NavLink to={`/?pasteId=${paste?._id}`}>
                    <CiEdit className="cursor-pointer border rounded p-1.5 hover:bg-blue-300  hover:text-black hover:border-black" />
                  </NavLink>
                  <div onClick={() => handleDelete(paste?._id)}>
                    <MdDelete className="cursor-pointer border rounded p-1.5 hover:bg-red-400  hover:text-black hover:border-black" />
                  </div>
                  <div onClick={() => handleShare(paste)}>
                    <CiShare2 className="cursor-pointer border rounded p-1.5 hover:bg-lime-800 hover:text-black hover:border-black" />
                  </div>
                  <div onClick={() => setViewPaste(paste)}>
                    <MdRemoveRedEye className="cursor-pointer border rounded p-1.5 hover:bg-green-300 hover:text-black hover:border-black" />
                  </div>
                  <div onClick={() => handleCopy(paste)}>
                    <MdOutlineContentCopy className="cursor-pointer border rounded p-1.5 hover:bg-violet-300 hover:text-black hover:border-black" />
                  </div>
                </ul>
                <div className="text-gray-400 text-sm">{paste.createdAt}</div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white p-4">No pastes found.</p>
        )}
        {viewPaste && (
          <ViewPaste viewPaste={viewPaste} setViewPaste={setViewPaste} />
        )}
      </div>
    </>
  );
};

export default Pastes;
