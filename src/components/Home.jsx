import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../features/pasteSlice";
import { MdOutlineContentCopy } from "react-icons/md";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const allpastes = useSelector((state) => state.paste.pastes);

  function createPaste() {

    if (!title.trim() || !content.trim()) {
        toast.error("Title and Content cannot be empty!");
        return;
      }

    const paste = {
      title: title,
      content: content,
      _id: pasteId || Date.now().toString(10),
      createdAt: new Date().toLocaleString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setContent("");
    setSearchParams({});
    navigate('/pastes')
  }

  useEffect(() => {
    if (pasteId) {
      const paste = allpastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setContent(paste.content);
    }
  }, [pasteId]);

  return (
    <div className="w-full sm:max-w-5xl mx-auto p-4 space-y-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row items-center w-full space-y-3 sm:space-y-0 sm:space-x-4">
        <input
          className="w-full sm:w-[80%] border border-gray-600 bg-black p-3 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
          type="text"
          placeholder="Enter title here..."
          value={title}
          minLength={5}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Title Input"
        />
        <button
          to={"/pastes"}
          onClick={createPaste}
          className="w-full sm:w-[20%] px-6 py-3 text-center rounded-lg shadow-md cursor-pointer transition-all bg-blue-600 hover:bg-blue-700"
        >
          {pasteId ? "Update Post" : "Create Post"}
        </button>
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
          value={content}
          minLength={20}
          onChange={(e) => setContent(e.target.value)}
          aria-label="Content Input"
        />
      </div>
    </div>
  );
};

export default Home;
