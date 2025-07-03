
const dummyListings = [
  {
    id: 1,
    image: "https://placekitten.com/300/300",
    name: "Cozy Cat",
    price: "0.2 AVAX"
  },
  {
    id: 2,
    image: "https://placebear.com/300/300",
    name: "Bearish NFT",
    price: "0.35 AVAX"
  }
];

const Buy = () => {
  const buyNFT = (id: number) => {
    alert(`🛒 Buying NFT ID ${id}... (simulate only)`);
    // TODO: Real buy transaction goes here
  };

  return (
    <div>
      <h2>🛒 Browse NFTs</h2>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {dummyListings.map((nft) => (
          <div key={nft.id} style={{ border: "1px solid #ccc", padding: 10, width: 200 }}>
            <img src={nft.image} alt={nft.name} style={{ width: "100%" }} />
            <h4>{nft.name}</h4>
            <p>{nft.price}</p>
            <button onClick={() => buyNFT(nft.id)}>Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buy;
