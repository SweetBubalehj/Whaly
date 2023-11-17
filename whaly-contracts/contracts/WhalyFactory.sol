// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./WhalyThread.sol";

interface IERC {
    function balanceOf(address owner) external view returns (uint256);

    function name() external view returns (string memory);

    function symbol() external view returns (string memory);
}

contract WlahyFactory is ERC721, ReentrancyGuard, Ownable {
    mapping(address => bool) public isTokenThreaded;
    mapping(address => uint) public nftTokenIdToThreadToken;
    mapping(address => address) public tokenToThreadAddress;
    address[] public threadTokens;
    address[] public threadAddresses;

    // ipfs://.../
    string ipfsBaseURI;

    event MintThread(address indexed token, uint256 indexed threadId);

    constructor(string memory _ipfsURI) ERC721("Whaly", "WHALY") {
        ipfsBaseURI = _ipfsURI;
    }

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

    function isEmptyString(string memory _string) internal pure returns (bool) {
        return bytes(_string).length == 0;
    }

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
     * @dev See {ERC721-_baseURI}.
     */
    function _baseURI() internal view override returns (string memory) {
        return ipfsBaseURI;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireMinted(tokenId);
        return _baseURI();
    }

    /**
     * @dev Function for changing base URI value.
     * @param _newBaseURI new base URI value
     */
    function changeBaseURI(string memory _newBaseURI) public onlyOwner {
        ipfsBaseURI = _newBaseURI;
    }
}
