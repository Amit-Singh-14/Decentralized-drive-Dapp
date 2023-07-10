import { useState } from "react";
import "./fileUpload.css";
import axios from "axios";

function FileUpload({ account, contract }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "your_api_key",
            pinata_secret_api_key: "your_secert_key",
            "Content-type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        // console.log(ImgHash);
        contract.add(account, ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const retrieveFile = (event) => {
    // get the file data
    const data = event.target.files[0];
    // read the file
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);

    // end tak read krene ke baad
    reader.onloadend = () => {
      setFile(event.target.files[0]);
    };
    setFileName(event.target.files[0].name);
    event.preventDefault();
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label className="choose" htmlFor="file-upload">
          choose image
        </label>
        <input
          type="file"
          id="file-upload"
          disabled={!account}
          name="data"
          onChange={retrieveFile}
        />

        <span className="textArea"> Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
}

export default FileUpload;
