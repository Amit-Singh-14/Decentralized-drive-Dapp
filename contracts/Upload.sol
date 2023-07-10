
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract Upload{
    
    // 0x07B071a222D083dd50dEab86164850BcFA38D4c5

    struct Access{
        address user;
        bool access;
    }


    mapping (address => string[]) value; // to store the url cid
    mapping (address => mapping (address => bool)) ownership;
    mapping (address => Access[]) accessList; // to give ownership
    mapping (address => mapping (address => bool)) previousData;

    /*
     Values stored in memory do not persist on the network after the transaction has been completed.
     calldata cannot be modified url ko change nhi kr sakte is liye 
    */
    /*
    The difference is because in public functions, Solidity immediately copies array arguments to memory, 
    while external functions can read directly from calldata. Memory allocation is expensive, whereas reading from calldata is cheap
    */
    function add(address _user, string calldata url) external {
        value[_user].push(url);
    }


    function allow(address user) external {
        ownership[msg.sender][user] = true;

        // user exit user
        if(previousData[msg.sender][user] == true){

            for(uint i = 0; i < accessList[msg.sender].length; i++){
                if(accessList[msg.sender][i].user == user){
                    accessList[msg.sender][i].access = true;
                }
            }
        }else{ // new user 
        accessList[msg.sender].push(Access(user,true));
        previousData[msg.sender][user] = true;
        }



    }

    function disallow(address user) external {
        ownership[msg.sender][user] = false;
        for(uint i = 0; i < accessList[msg.sender].length; i++){
            if(accessList[msg.sender][i].user == user){
                accessList[msg.sender][i].access = false;
            }
        }    
    }

    // a function that only reads but doesn't alter the state variables defined in the contract is called a View Function 
    
    function display(address _user) external view returns (string[] memory){
        // user own files or shared file
        require(_user == msg.sender || ownership[_user][msg.sender],"you don't have access");
        return value[_user];
    }

    function shareAccess() public view returns (Access[] memory){
        return accessList[msg.sender];
    }

}
