import { ethers } from 'ethers';
import { TimestampResponse, TimestampTransformer } from './timestamp_transformer';

interface BlockResponse {
  rawBlock: ethers.providers.Block;
  height: string;
  timestamp: TimestampResponse;
}

/**
 * Transformer for an Ethereum Block
 *
 */
export class BlockTransformer {
  private readonly block;

  /**
   * ctor
   *
   * @param {ethers.providers.Block} block - block to display
   *
   */
  constructor(block: ethers.providers.Block) {
    this.block = block;
  }

  /**
   * Transform a block to a blockResponse
   *
   */
  transform(): BlockResponse {
    return {
      timestamp: new TimestampTransformer(this.block.timestamp).transform(),
      height: this.block.number.toString(),
      rawBlock: this.block,
    };
  }
}
