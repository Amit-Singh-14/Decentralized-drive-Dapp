import { useState } from "react";
import "./display.css";

function Display({ contract, account }) {
  const [data, setData] = useState("");

  const getData = async () => {
    let dataArray;
    const otherAddress = document.querySelector(".address").value;
    try {
      if (otherAddress) {
        dataArray = await contract.display(otherAddress);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (error) {
      console.log(error);
    }

    console.log(dataArray);
    const isEmpty = dataArray.length == 0;
    if (!isEmpty) {
      const image = dataArray.map((item, i) => {
        return (
          <a href={item} key={`a-${i}`} target="_blank" rel="noopener noreferrer">
            <img key={`img-${i}`} src={item} alt="new" className="image-list" />
          </a>
        );
      });

      setData(image);
    } else {
      alert("no images to show");
    }
  };

  return (
    <>
      <div className="image-list">{data}</div>
      <input type="text" placeholder="Enter Address" className="address"></input>
      <button className="center button" onClick={getData}>
        Get Data
      </button>
    </>
  );
}

export default Display;
