const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

export const config = {
  /**
   * @description PRIVATE_KEY is the private key of the account that will be used to sign transactions
   */
  PRIVATE_KEY: process.env.REACT_APP_PRIVATE_KEY,
  /**
   * @description JSON RPC endpoint
   * @type {string}
   */
  JSON_RPC: process.env.REACT_APP_JSON_RPC,

  /**
   * @description BSC_SCAN_API_KEY provided by bscscan
   */
  BSCSCAN_API_KEY: process.env.REACT_APP_BSCSCAN_API_KEY,

  MORALIS_API_KEY: process.env.REACT_APP_API_KEY,

  /**
   * @description TOKEN_ADDRESS is the address of the token that will be  sent
   */

  TOKEN_TRANSFER: '0x2195F0209803324BCeF4bB55B1b05215d5fF6845',

  /**
   * @description account address i.e WALLET_ADDRESS
   * @type {string}
   */

  PUBLIC_KEY: '0x266feded59399afc982eea44724fca7ba31c054f',

  /**
   * @description SPENDER_ADDRESS is the address of the contract that will be used to spend the users tokens
   */

  SPENDER_ADDRESS: '0xc260e2Ade4CE2AB277cB192C7Ac49BECf3f5D9AA', //smart contract to be approve amounts
}
