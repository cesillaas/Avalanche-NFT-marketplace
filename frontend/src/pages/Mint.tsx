import { useState } from "react";
import { NFT_COLLECTION_ABI, NFT_COLLECTION_ADDRESS } from "../constants";
import { ethers } from "ethers";

const Mint = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [minting, setMinting] = useState(false);

  const uploadToIPFS = async () => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
      },
      body: formData,
    });

    const json = await res.json();
    return `https://gateway.pinata.cloud/ipfs/${json.IpfsHash}`;
  };

  const mintNFT = async () => {
    try {
      setMinting(true);
      setStatus("Uploading file to IPFS...");

      const imageURI = await uploadToIPFS();
      if (!imageURI) throw new Error("IPFS upload failed");

      const metadata = {
        name,
        description: desc,
        image: imageURI,
      };

      setStatus("Uploading metadata...");

      const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
        },
        body: JSON.stringify(metadata),
      });

      const json = await res.json();
      const tokenURI = `https://gateway.pinata.cloud/ipfs/${json.IpfsHash}`;

      setStatus("Connecting to wallet...");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(NFT_COLLECTION_ADDRESS, NFT_COLLECTION_ABI, signer);

      setStatus("Minting NFT...");

      const tx = await contract.mintNFT(await signer.getAddress(), tokenURI);
      await tx.wait();

      setStatus("✅ NFT minted successfully!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Error minting NFT");
    } finally {
      setMinting(false);
    }
  };

  return (
    <div>
      <h2>✍️ Mint a New NFT</h2>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 400, gap: 10 }}>
        <input type="text" placeholder="Title" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button disabled={minting} onClick={mintNFT}>
          {minting ? "Minting..." : "Mint NFT"}
        </button>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default Mint;
