import axios from "axios";
import React, { useRef, useState } from "react";
import {
  Send,
  Paperclip,
  X,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

const Input = ({ setResults, files, setFiles }) => {
  const [textInput, setTextInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      // Append new files to existing ones, avoiding duplicates
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };
  const removeFile = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleUpload = async () => {
    if (files.length === 0 && !textInput.trim()) return; // Don't send empty

    setIsUploading(true);

    // 1. Handle Text (Optional - strictly based on your prompt, you might want to send this too)
    if (textInput.trim()) {
      setResults((prev) => [
        ...prev,
        { fileName: "User Message", data: textInput, status: "text" },
      ]);
      setTextInput("");
    }

    // 2. Handle Files
    const resultsArray = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        let responseData;

        const res = await axios.post(
          "http://127.0.0.1:8000/analyze",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        responseData = res.data;

        resultsArray.push({
          fileName: file.name,
          data: responseData,
          status: "success",
        });
      } catch (err) {
        console.error(err);
        resultsArray.push({
          fileName: file.name,
          data: `Failed to upload: ${err.message}`,
          status: "error",
        });
      }
    }

    setResults((prev) => [...prev, ...resultsArray]);
    setFiles([]); // Clear files after upload
    if (fileInputRef.current) fileInputRef.current.value = ""; // Reset hidden input
    setIsUploading(false);
  };

  return (
    <div className="flex flex-col gap-3 relative">
      <div className="absolute bottom-22">
        {/* File Preview Chips */}
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-1">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-teal-100 group"
              >
                <span className="truncate max-w-[150px]">{file.name}</span>
                <button
                  onClick={() => removeFile(idx)}
                  className="hover:bg-teal-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Input Bar */}
      <div className="flex items-end gap-3">
        <div className="flex-1 bg-gray-50 border-2 border-transparent focus-within:border-teal-500 focus-within:bg-white transition-all rounded-2xl flex items-center p-1.5 px-3">
          {/* Text Input */}
          <input
            type="text"
            className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-gray-700 placeholder-gray-400 py-2"
            placeholder="Type a message or add files..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && handleUpload()
            }
          />

          {/* Attachment Button */}
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors tooltip-trigger"
              title="Attach files"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            {files.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal-600 text-[10px] text-white">
                {files.length}
              </span>
            )}
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={handleUpload}
          disabled={isUploading || (files.length === 0 && !textInput.trim())}
          className={`h-[52px] w-[52px] rounded-full flex items-center justify-center shadow-lg transition-all duration-200 
            ${
              isUploading || (files.length === 0 && !textInput.trim())
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-teal-600 text-white hover:bg-teal-700 hover:scale-105 active:scale-95"
            }`}
        >
          {isUploading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Send className="w-6 h-6 ml-1" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Input;
