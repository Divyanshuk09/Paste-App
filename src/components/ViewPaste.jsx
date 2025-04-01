import React, { useEffect, useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import toast from "react-hot-toast";
const ViewPaste = ({ viewPaste, setViewPaste, handleCopy }) => {
  const [content, setContent] = useState(viewPaste.content);

  // Close modal on Esc key press
  useEffect(() => {
    const closeOnEsc = (e) => {
      if (e.key === "Escape") {
        setViewPaste(null);
      }
    };
    document.addEventListener("keydown", closeOnEsc);
    return () => document.removeEventListener("keydown", closeOnEsc);
  }, [setViewPaste]);

  return (
    <div onClick={()=>setViewPaste(null)} className="fixed inset-0 flex justify-center items-center bg-[#141414b4] bg-opacity-50">
      <div onClick={(e)=>e.stopPropagation()} className="bg-[#1e1e1e] flex flex-col rounded-lg shadow-lg w-[80%] h-[80%] overflow-hidden max-w-[90%] border border-gray-600">
        
        {/* VS Code Style Title Bar */}
        <div  className="flex justify-between px-4 py-2 bg-[#333] w-full border-b border-gray-600">
          <div className="flex gap-2">
            <button className="w-3 h-3 bg-red-500    rounded-full"></button>
            <button className="w-3 h-3 bg-yellow-500 rounded-full"></button>
            <button className="w-3 h-3 bg-green-500  rounded-full"></button>
          </div>
          <button
            onClick={() => {navigator.clipboard.writeText(viewPaste.content);
                toast.success("Content copied to clipboard!");}}
            className="text-white text-sm flex items-center gap-1 cursor-pointer hover:text-gray-300"
          >
            <MdOutlineContentCopy />
            <p>Copy</p>
          </button>
        </div>

        {/* Code Editor Area */}
        <textarea
          className="text-white bg-[#1e1e1e] w-full h-full p-4 outline-none resize-none font-mono text-md border-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          spellCheck="false"
          disabled
        />
      </div>
    </div>
  );
};

export default ViewPaste;
