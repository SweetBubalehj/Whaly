// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IERC {
    function balanceOf(address owner) external view returns (uint256);

    function name() external view returns (string memory);

    function symbol() external view returns (string memory);
}

contract WhalyThread is ReentrancyGuard {
    struct Comment {
        string content;
        uint time;
        uint likes;
        mapping(address => bool) likedBy;
    }

    mapping(address => Comment) public addressToComment;

    address[] public commentedAddresses;
    address public token;
    uint256 public whalyTokenId;

    /**
     * @dev Constructor function that initializes the contract.
     * @param _token The address of the token contract.
     * @param sender The address of the sender.
     * @param _whalyTokenId The ID of the Whaly token.
     * @param _comment The initial comment for the sender.
     */
    constructor(
        address _token,
        address sender,
        uint256 _whalyTokenId,
        string memory _comment
    ) {
        token = _token;
        whalyTokenId = _whalyTokenId;

        addressToComment[sender].content = _comment;
        commentedAddresses.push(sender);
    }

    /**
     * @dev Adds a comment to the contract.
     * @param _comment The content of the comment.
     */
    function addComment(string memory _comment) public nonReentrant {
        require(!isEmptyString(_comment), "Empty comment");
        require(
            isEmptyString(addressToComment[msg.sender].content),
            "Already commented"
        );

        addressToComment[msg.sender].content = _comment;
        addressToComment[msg.sender].time = block.timestamp;
        commentedAddresses.push(msg.sender);
    }

    /**
     * @dev Removes the comment of the sender.
     */
    function removeComment() public nonReentrant {
        require(
            !isEmptyString(addressToComment[msg.sender].content),
            "No comment"
        );

        removeAddressFromArray(msg.sender);
        delete addressToComment[msg.sender];
    }

    /**
     * @dev Changes the comment of the sender.
     * @param _comment The new content of the comment.
     */
    function changeComment(string memory _comment) public nonReentrant {
        require(!isEmptyString(_comment), "Empty comment");
        require(
            !isEmptyString(addressToComment[msg.sender].content),
            "No comment"
        );

        addressToComment[msg.sender].content = _comment;
        addressToComment[msg.sender].time = block.timestamp;
    }

    /**
     * @dev Likes a comment.
     * @param _commentOwner The address of the comment owner.
     */
    function likeComment(address _commentOwner) public nonReentrant {
        require(
            !addressToComment[_commentOwner].likedBy[msg.sender],
            "Already liked"
        );

        addressToComment[_commentOwner].likes++;
        addressToComment[_commentOwner].likedBy[msg.sender] = true;
    }

    /**
     * @dev Removes a like from a comment.
     * @param _commentOwner The address of the comment owner.
     */
    function removeCommentLike(address _commentOwner) public nonReentrant {
        require(
            addressToComment[_commentOwner].likedBy[msg.sender],
            "Not liked"
        );

        addressToComment[_commentOwner].likes--;
        addressToComment[_commentOwner].likedBy[msg.sender] = false;
    }

    /**
     * @dev Removes an address from the commentedAddresses array.
     * @param _userAddress The address to be removed.
     */
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

    /**
     * @dev Checks i    f a string is empty.
     * @param _string The string to check.
     * @return A boolean indicating whether the string is empty or not.
     */
    function isEmptyString(string memory _string) internal pure returns (bool) {
        return bytes(_string).length == 0;
    }

    /**
     * @dev Gets the number of comments in the contract.
     * @return The number of comments.
     */
    function getCommentsCount() public view returns (uint) {
        return commentedAddresses.length;
    }

    /**
     * @dev Gets the addresses that have commented.
     * @return An array of addresses.
     */
    function getCommentedAddresses() public view returns (address[] memory) {
        return commentedAddresses;
    }

    /**
     * @dev Gets the balances of the addresses that have commented.
     * @return An array of balances.
     */
    function getAddressesBalance() public view returns (uint[] memory) {
        uint[] memory balances = new uint[](commentedAddresses.length);

        for (uint i = 0; i < commentedAddresses.length; i++) {
            balances[i] = IERC(token).balanceOf(commentedAddresses[i]);
        }

        return balances;
    }

    /**
     * @dev Gets the total balance of the addresses that have commented.
     * @return The total balance.
     */
    function getTotalBalance() public view returns (uint) {
        uint totalBalance = 0;

        for (uint i = 0; i < commentedAddresses.length; i++) {
            totalBalance += IERC(token).balanceOf(commentedAddresses[i]);
        }

        return totalBalance;
    }

    /**
     * @dev Gets the address with the highest balance.
     * @return The address with the highest balance.
     */
    function getTopAddress() public view returns (address) {
        address topAddress = commentedAddresses[0];
        uint topBalance = IERC(token).balanceOf(topAddress);

        for (uint i = 1; i < commentedAddresses.length; i++) {
            address currentAddress = commentedAddresses[i];
            uint currentBalance = IERC(token).balanceOf(currentAddress);

            if (currentBalance > topBalance) {
                topAddress = currentAddress;
                topBalance = currentBalance;
            }
        }

        return topAddress;
    }
}
