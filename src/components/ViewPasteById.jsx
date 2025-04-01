import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MdOutlineContentCopy } from "react-icons/md";
import toast from "react-hot-toast";


const ViewPasteById = () => {
    const { pasteId } = useParams(); // This is an object with 'id'
  console.log("pasteId:", pasteId);

  const allpastes = useSelector((state) => state.paste.pastes);
  console.log("allpastes:", allpastes);

  const paste = allpastes.find((p) => p._id === pasteId);

  console.log("paste:", paste);

  if (!paste) {
    return <p className="text-white">Paste not found!</p>;
  }

  return (
    <div className="w-full sm:max-w-5xl mx-auto p-4 space-y-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row items-center w-full space-y-3 sm:space-y-0 sm:space-x-4">
        <input
          className="w-full sm:w-[100%] border border-gray-600 bg-black p-3 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
          type="text"
          value={paste.title}
          aria-label="Title Input"
          disabled
        />
      </div>

      <div className="border border-gray-600 w-full sm:w-[100%] ">
        {/* VS Code Style Title Bar */}
        <div className="flex justify-between px-4 py-2 bg-[#333] border-gray-600">
          <div className="flex gap-2">
            <button className="w-3 h-3 bg-red-500 hover:bg-red-300 cursor-pointer rounded-full"></button>
            <button className="w-3 h-3 bg-yellow-500 rounded-full"></button>
            <button className="w-3 h-3 bg-green-500 rounded-full"></button>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(content);
              toast.success("Content copied to clipboard!");
            }}
            className="text-white text-sm flex items-center gap-1 cursor-pointer hover:text-gray-300"
          >
            <MdOutlineContentCopy />
            <p>Copy</p>
          </button>
        </div>

        {/* Code Editor Area */}
        <textarea
          className="text-white bg-[#1e1e1e] w-full h-[60vh] sm:h-[80vh] p-4 outline-none resize-none font-mono text-md"
          placeholder="Enter content here..."
          value={paste.content}
          minLength={20}
          onChange={(e) => setContent(e.target.value)}
          aria-label="Content Input"
          disabled
        />
      </div>
    </div>
  );
};

export default ViewPasteById;
