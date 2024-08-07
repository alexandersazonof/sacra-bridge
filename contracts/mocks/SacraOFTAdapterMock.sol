// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import {SacraOFTAdapter} from "../SacraOFTAdapter.sol";

// @dev WARNING: This is for testing purposes only
contract SacraOFTAdapterMock is SacraOFTAdapter {
    constructor(address _token, address _lzEndpoint, address _delegate) SacraOFTAdapter(_token, _lzEndpoint, _delegate) {}
}
