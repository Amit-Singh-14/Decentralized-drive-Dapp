import "./App.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Model from "./components/Model";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modelOpen, setModelOpen] = useState(null);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const wallet = async () => {
      if (provider) {
        try {
          await provider.send("eth_requestAccounts", []);

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const signer = provider.getSigner();
          const address = await signer.getAddress();
          console.log(address);
          setAccount(address);

          const contractAddress = "0x07B071a222D083dd50dEab86164850BcFA38D4c5";
          const contract = new ethers.Contract(contractAddress, Upload.abi, signer);

          console.log(contract);
          setContract(contract);
          setProvider(provider);
        } catch (error) {}
      } else {
        alert("Metamask is not installed");
      }
    };

    provider && wallet();
  }, []);

  return (
    <>
      {!modelOpen && (
        <button className="share" onClick={() => setModelOpen(true)}>
          share
        </button>
      )}
      {modelOpen && <Model setModelOpen={setModelOpen} contract={contract} />}
      <div className="App">
        <div className="App">
          <h1 style={{ color: "white" }}>Decentralized Drive</h1>
          <div className="bg"></div>
          <div className="bg bg2"></div>
          <div className="bg bg3"></div>

          <p style={{ color: "white" }}>account : {account}</p>
          <FileUpload account={account} provider={provider} contract={contract}></FileUpload>
          <Display contract={contract} account={account}></Display>
        </div>
      </div>
    </>
  );
}

export default App;
