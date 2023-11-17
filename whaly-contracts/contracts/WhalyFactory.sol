// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./WhalyThread.sol";

interface IWhalyThread {
    function getCommentsCount() external view returns (uint);
}

/**
 * @title WhalyFactory
 * @dev A contract for creating and managing Whaly threads associated with ERC721 tokens.
 */
contract WhalyFactory is ERC721, ReentrancyGuard, Ownable {
    mapping(address => bool) public isTokenThreaded;
    mapping(address => uint) public nftTokenIdToThreadToken;
    mapping(address => address) public tokenToThreadAddress;
    address[] public threadTokens;
    address[] public threadAddresses;

    // ipfs://.../
    string ipfsBaseURI;

    event MintThread(address indexed token, uint256 indexed threadId);

    /**
     * @dev Initializes the WhalyFactory contract.
     * @param _ipfsURI The base URI for IPFS metadata.
     */
    constructor(string memory _ipfsURI) ERC721("Whaly", "WHALY") {
        ipfsBaseURI = _ipfsURI;
    }

    /**
     * @dev Checks if the given address is an ERC721 token.
     * @param _token The address of the token to check.
     * @return A boolean indicating whether the address is an ERC721 token.
     */
    function isERC(address _token) public view returns (bool) {
        try IERC(_token).name() returns (string memory) {
            return true;
        } catch {}

        try IERC(_token).symbol() returns (string memory) {
            return true;
        } catch {}

        try IERC(_token).balanceOf(address(0)) returns (uint256) {
            return true;
        } catch {}

        return false;
    }

    /**
     * @dev Checks if the given string is empty.
     * @param _string The string to check.
     * @return A boolean indicating whether the string is empty.
     */
    function isEmptyString(string memory _string) internal pure returns (bool) {
        return bytes(_string).length == 0;
    }

    /**
     * @dev Mints a new WhalyThread associated with an ERC721 token.
     * @param _token The address of the ERC721 token.
     * @param comment The comment for the thread.
     */
    function mintThread(
        address _token,
        string memory comment
    ) public nonReentrant {
        require(isERC(_token), "Not ERC");
        require(!isTokenThreaded[_token], "Already minted");
        require(!isEmptyString(comment), "Empty comment");

        WhalyThread thread = new WhalyThread(
            _token,
            threadTokens.length,
            comment
        );

        isTokenThreaded[_token] = true;
        nftTokenIdToThreadToken[_token] = threadTokens.length;
        tokenToThreadAddress[_token] = address(thread);
        threadTokens.push(_token);
        threadAddresses.push(address(thread));

        _safeMint(msg.sender, threadTokens.length);

        emit MintThread(_token, threadTokens.length);
    }

    /**
     * @dev Returns the base URI for IPFS metadata.
     * @return The base URI for IPFS metadata.
     */
    function _baseURI() internal view override returns (string memory) {
        return ipfsBaseURI;
    }

    /**
     * @dev Returns the token URI for a given token ID.
     * @param tokenId The ID of the token.
     * @return The token URI.
     */
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireMinted(tokenId);
        return _baseURI();
    }

    /**
     * @dev Changes the base URI for IPFS metadata.
     * @param _newBaseURI The new base URI.
     */
    function changeBaseURI(string memory _newBaseURI) public onlyOwner {
        ipfsBaseURI = _newBaseURI;
    }

    /**
     * @dev Returns the count of thread tokens.
     * @return The count of thread tokens.
     */
    function getThreadTokenCount() public view returns (uint) {
        return threadTokens.length;
    }

    /**
     * @dev Returns an array of comment counts for each thread address.
     * @return An array of comment counts.
     */
    function getThreadAddressesCommentCounts()
        public
        view
        returns (uint[] memory)
    {
        uint[] memory commentCounts = new uint[](threadAddresses.length);

        for (uint i = 0; i < threadAddresses.length; i++) {
            commentCounts[i] = IWhalyThread(threadAddresses[i])
                .getCommentsCount();
        }

        return commentCounts;
    }
}
