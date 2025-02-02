import { Contract, providers, Wallet } from 'ethers'
import { config } from '../config/config'
import { BULK_SEND_ABI } from '../constants/bulksendABI'
import 'dotenv/config'

export class Helpers {
  constructor() {
    // initialize some variables i.e provider, signers
    this._provider = new providers.JsonRpcProvider(config.JSON_RPC)
    this.signer = new Wallet(config.PRIVATE_KEY, this._provider)
    this.spender = config.SPENDER_ADDRESS
  }

  /**
   *
   * @param _tokenAddress the token address to get the allowance for
   * @returns
   */
  approveContract = async (tokenAddress, signer) => {
    return new Contract(
      tokenAddrapproveContractess,
      [
        'function approve(address _spender, uint256 _value) public returns (bool success)',
      ],
      signer,
    )
  }

  /**
   *
   * @param {*} signer
   * @returns an instance of the contract for batch transfer
   */

  sendContract = async () => {
    console.log('ABI', BULK_SEND_ABI)

    return new Contract(
      '0xc260e2Ade4CE2AB277cB192C7Ac49BECf3f5D9AA',
      [
        'function batchTransfer(address _tokenAddress, address[] memory _to, uint256[] memory _value) payable',
      ],
      this.signer,
    )
  }

  /**
   *
   * @param _params the params to send to the contract. this function approves the contract [spender] to spend the users tokens
   * @returns
   */
  approve = async ({ tokenAddress, overLoads, balanceToApprove, signer }) => {
    try {
      const contract = await this.approveContract(tokenAddress, signer)

      const tx = await contract.approve(
        this.spender,
        balanceToApprove,
        overLoads,
      )

      console.log('**'.repeat(20))
      console.log('******APPROVE TRANSACTION********', tx.hash)
      return { success: true, data: `${tx.hash}` }
    } catch (error) {
      console.log(`Error approve`, error)
    }
  }

  /**
   *
   * @param tokenAddress the token address to get the allowance for. This function does the magic of approving
   */
  actualApproval = async (tokenAddress, amount, _signer) => {
    try {
      let overLoads = {
        gasLimit: 1000000,
        gasPrice: 10 * 1e9,
      }
      // approve the contract to spend the users tokens
      await this.approve({
        tokenAddress,
        overLoads,
        balanceToApprove: amount,
        signer: _signer,
      })
    } catch (error) {
      console.log('Error approving contract', error)
    }
  }
}
