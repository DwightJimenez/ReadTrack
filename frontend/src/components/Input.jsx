import axios from "axios";

const Input = ({ setResults, files, setFiles }) => {
  const handleChange = (e) => {
    setFiles(Array.from(e.target.files)); // convert FileList to array
  };

  const handleUpload = async () => {
    if (files.length === 0) return alert("Please select at least one file!");

    const resultsArray = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file); // must match FastAPI param

      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/analyze",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        // console.log("Result for", file.name, ":", res.data);
        resultsArray.push({ name: file.name, data: res.data });
      } catch (err) {
        console.error(err);
        alert(`Upload failed for ${file.name}`);
      }
    }

    setResults(resultsArray);
  };

  return (
    <div className="flex mb-4 items-center justify-center gap-10">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center w-full max-w-lg p-5 text-center bg-teal-light border-2 border-teal-dark border-dashed cursor-pointer rounded-xl"
      >
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          multiple // allow multiple selection
          onChange={handleChange}
        />

        <h2 className="mt-1 font-medium tracking-wide text-gray-700">
          {files.length > 0
            ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
            : "Upload Files"}
        </h2>

        <p className="mt-2 text-xs tracking-wide text-gray-500">
          Upload or drag & drop your files (JPEG, PNG, DOCX, PDF)
        </p>
      </label>

      <button
        onClick={handleUpload}
        className="rounded-full text-white bg-teal-dark size-14 flex items-center justify-center mx-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default Input;
