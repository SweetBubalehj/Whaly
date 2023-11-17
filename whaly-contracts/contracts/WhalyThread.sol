// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IERC {
    function balanceOf(address owner) external view returns (uint256);
}

contract WhalyThread is ReentrancyGuard {
    struct Comment {
        string content;
        uint likes;
        mapping(address => bool) likedBy;
    }

    mapping(address => Comment) public addressToComment;

    address[] public commentedAddresses;
    address public token;
    uint256 public whalyTokenId;

    constructor(address _token, uint256 _whalyTokenId, string memory _comment) {
        token = _token;
        whalyTokenId = _whalyTokenId;

        addressToComment[msg.sender].content = _comment;
        commentedAddresses.push(msg.sender);
    }

    function addComment(string memory _comment) public nonReentrant {
        require(!isEmptyString(_comment), "Empty comment");
        require(
            isEmptyString(addressToComment[msg.sender].content),
            "Already commented"
        );

        addressToComment[msg.sender].content = _comment;
        commentedAddresses.push(msg.sender);
    }

    function removeComment() public nonReentrant {
        require(
            !isEmptyString(addressToComment[msg.sender].content),
            "No comment"
        );

        removeAddressFromArray(msg.sender);
        delete addressToComment[msg.sender];
    }

    function likeComment(address _commentOwner) public nonReentrant {
        require(
            !addressToComment[_commentOwner].likedBy[msg.sender],
            "Already liked"
        );

        addressToComment[_commentOwner].likes++;
        addressToComment[_commentOwner].likedBy[msg.sender] = true;
    }

    function removeCommentLike(address _commentOwner) public nonReentrant {
        require(
            addressToComment[_commentOwner].likedBy[msg.sender],
            "Not liked"
        );

        addressToComment[_commentOwner].likes--;
        addressToComment[_commentOwner].likedBy[msg.sender] = false;
    }

    function removeAddressFromArray(address _userAddress) internal {
        uint indexToRemove;
        for (uint i = 0; i < commentedAddresses.length; i++) {
            if (commentedAddresses[i] == _userAddress) {
                indexToRemove = i;
                break;
            }
        }

        if (indexToRemove >= commentedAddresses.length) {
            return;
        }

        address[] memory newAddresses = new address[](
            commentedAddresses.length - 1
        );

        for (uint i = 0; i < indexToRemove; i++) {
            newAddresses[i] = commentedAddresses[i];
        }

        for (uint i = indexToRemove; i < newAddresses.length; i++) {
            newAddresses[i] = commentedAddresses[i + 1];
        }

        commentedAddresses = newAddresses;
    }

    function isEmptyString(string memory _string) internal pure returns (bool) {
        return bytes(_string).length == 0;
    }

    function getCommentsCount() public view returns (uint) {
        return commentedAddresses.length;
    }

    function getAddressesBalance() public view returns (uint[] memory) {
        uint[] memory balances = new uint[](commentedAddresses.length);

        for (uint i = 0; i < commentedAddresses.length; i++) {
            balances[i] = IERC(token).balanceOf(commentedAddresses[i]);
        }

        return balances;
    }
}
