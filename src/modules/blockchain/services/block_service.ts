import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import { logger } from 'core/logger/logger';

const AVG_BLOCK_TIME = 13;

/**
 * Service for /block routes
 *
 */
export class BlockService {
  private client: ethers.providers.BaseProvider;

  constructor() {
    this.client = new ethers.providers.JsonRpcProvider('https://virginia.rpc.blxrbdn.com');
  }

  /**
   * @return {number} last block Number
   */
  async getHeight(): Promise<number> {
    return await this.client.getBlockNumber();
  }

  /**
   * return the block for the given block number
   *
   * @param {number} block
   * @return {ethers.providers.Block}
   */
  async getBlock(block: number): Promise<ethers.providers.Block> {
    return this.client.getBlock(block);
  }

  private findAvgTime(blockA: ethers.providers.Block, blockB: ethers.providers.Block): BigNumber {
    const maxBlock = new BigNumber(Math.max(blockA.number, blockB.number));
    const minBlock = new BigNumber(Math.min(blockA.number, blockB.number));
    const maxTs = new BigNumber(Math.max(blockA.timestamp, blockB.timestamp));
    const minTs = new BigNumber(Math.min(blockA.timestamp, blockB.timestamp));

    logger.debug(maxBlock.toString(), ' - ', minBlock.toString(), ' / ', maxTs.toString(), ' - ', minTs.toString());
    return maxTs.minus(minTs).dividedBy(maxBlock.minus(minBlock));
  }

  /**
   * return the block for the given block number using block
   * duration averaging solution
   *
   * this is a private method
   *
   * @param {ethers.providers.Block} block
   * @param {number} timestamp
   * @param {BigNumber} avgTime
   * @param {number} nbLookup
   * @return {{height: number, nbLookup: number}}
   */
  private async lookingForBlockAvg(
    block: ethers.providers.Block,
    timestamp: number,
    avgTime: BigNumber,
    nbLookup = 0
  ): Promise<{ height: number; nbLookup: number }> {
    nbLookup++;
    const up = block.timestamp > timestamp;

    let deltaSecond;
    if (up) {
      deltaSecond = block.timestamp - timestamp;
    } else {
      deltaSecond = timestamp - block.timestamp;
    }

    const deltaBlock = +new BigNumber(deltaSecond).dividedBy(avgTime).toFixed(0);

    logger.debug('ds', deltaSecond, 'db', deltaBlock);

    let newBlockNumber;
    if (up) {
      newBlockNumber = block.number - deltaBlock;
      newBlockNumber = newBlockNumber < 1 ? 1 : newBlockNumber;
    } else {
      newBlockNumber = block.number + deltaBlock;
    }

    const newBlock = await this.client.getBlock(newBlockNumber);
    avgTime = this.findAvgTime(block, newBlock);
    logger.debug('new block ', newBlockNumber, '( ', avgTime.toString(), 's/block)');

    if (newBlockNumber !== block.number) {
      return this.lookingForBlockAvg(newBlock, timestamp, avgTime, nbLookup);
    }

    if (newBlock.timestamp > timestamp) {
      return {
        height: newBlock.number - 1,
        nbLookup,
      };
    } else {
      return {
        height: newBlock.number,
        nbLookup,
      };
    }
  }

  /**
   * return the block for the given block number using binary
   * search algorithm.
   *
   * this is a private method
   *
   * @param {BigNumber} lowestBlock
   * @param {BigNumber} highestBlock
   * @param {number} timestamp
   * @param {number} nbLookup
   * @return {{height: number, nbLookup: number}}
   */
  private async lookingForBlockBisect(
    lowestBlock: BigNumber,
    highestBlock: BigNumber,
    timestamp: number,
    nbLookup = 0
  ): Promise<{ height: number; nbLookup: number }> {
    const delta = +highestBlock.minus(lowestBlock).div(2).toFixed(0);

    const newHeight = lowestBlock.plus(delta);
    nbLookup += 1;

    const block = await this.client.getBlock(newHeight.toNumber());
    if (!newHeight.eq(lowestBlock) && !newHeight.eq(highestBlock)) {
      if (block.timestamp > timestamp) {
        return await this.lookingForBlockBisect(lowestBlock, newHeight, timestamp, nbLookup);
      } else {
        return await this.lookingForBlockBisect(newHeight, highestBlock, timestamp, nbLookup);
      }
    }

    if (block.timestamp > timestamp) {
      return {
        height: newHeight.minus(1).toNumber(),
        nbLookup,
      };
    } else {
      return {
        height: newHeight.toNumber(),
        nbLookup,
      };
    }
  }

  /**
   * boiler plate for lookingForBlockAvg
   *
   * @param {number} timestamp
   * @return {{height: number, nbLookup: number}}
   *
   */
  async findBlockByTimeAverage(timestamp: number): Promise<{ height: number; nbLookup: number }> {
    if (timestamp >= Date.now()) {
      return { height: await this.getHeight(), nbLookup: 0 };
    }

    return this.lookingForBlockAvg(await this.getBlock(await this.getHeight()), timestamp, new BigNumber(AVG_BLOCK_TIME), 1);
  }

  /**
   * boiler plate for lookingForBlockBisect
   *
   * @param {number} timestamp
   * @return {{height: number, nbLookup: number}}
   *
   */
  async findBlockByTimestampBisect(timestamp: number): Promise<{ height: number; nbLookup: number }> {
    if (timestamp >= Date.now()) {
      return { height: await this.getHeight(), nbLookup: 0 };
    }

    return this.lookingForBlockBisect(new BigNumber(1), new BigNumber(await this.getHeight()), timestamp);
  }
}
