// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is ReentrancyGuard, Ownable {
    struct Listing {
        address seller;
        uint256 price;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;

    event NFTListed(address indexed nftAddress, uint256 indexed tokenId, address seller, uint256 price);
    event NFTSold(address indexed nftAddress, uint256 indexed tokenId, address buyer, uint256 price);
    event ListingCancelled(address indexed nftAddress, uint256 indexed tokenId);

    function listNFT(address nftAddress, uint256 tokenId, uint256 price) external {
        require(price > 0, "Price must be greater than zero");
        IERC721 nft = IERC721(nftAddress);
        require(nft.ownerOf(tokenId) == msg.sender, "You are not the owner of this NFT");
        require(nft.isApprovedForAll(msg.sender, address(this)), "Marketplace is not approved");

        listings[nftAddress][tokenId] = Listing(msg.sender, price);
        emit NFTListed(nftAddress, tokenId, msg.sender, price);
    }

    function buyNFT(address nftAddress, uint256 tokenId) external payable nonReentrant {
        Listing memory item = listings[nftAddress][tokenId];
        require(item.price > 0, "NFT is not listed for sale");
        require(msg.value >= item.price, "Insufficient payment");

        payable(item.seller).transfer(item.price);
        IERC721(nftAddress).safeTransferFrom(item.seller, msg.sender, tokenId);

        delete listings[nftAddress][tokenId];
        emit NFTSold(nftAddress, tokenId, msg.sender, item.price);
    }

    function cancelListing(address nftAddress, uint256 tokenId) external {
        Listing memory item = listings[nftAddress][tokenId];
        require(item.seller == msg.sender, "Only the seller can cancel the listing");

        delete listings[nftAddress][tokenId];
        emit ListingCancelled(nftAddress, tokenId);
    }

    function getListing(address nftAddress, uint256 tokenId) public view returns (Listing memory) {
        return listings[nftAddress][tokenId];
    }
}
