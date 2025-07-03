import { useState } from "react";
// import { MARKETPLACE_ADDRESS, MARKETPLACE_ABI, NFT_COLLECTION_ADDRESS } from "../constants";
// import { ethers } from "ethers";

const List = () => {
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");

  const listNFT = async () => {
    // Bu fonksiyon ABI'yi ekleyen kişi tarafından doldurulacak
    setStatus("📦 Listing NFT... (not yet connected to blockchain)");

    // TODO: Add blockchain interaction here
  };

  return (
    <div>
      <h2>📤 List Your NFT for Sale</h2>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 400, gap: 10 }}>
        <input
          type="text"
          placeholder="Token ID (e.g. 1)"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price in AVAX (e.g. 0.1)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={listNFT}>List NFT</button>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default List;
