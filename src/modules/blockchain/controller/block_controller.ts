import { Request, Response } from 'express';
import { blockTimestampValidator } from '../validator/block_validator';
import { BlockService } from '../services/block_service';
import { TimestampTransformer } from '../transformer/timestamp_transformer';
import { BlockTransformer } from '../transformer/block_transformer';

interface BlockByTimestampParams {
  timestamp: number;
  method?: 'BINARY_SEARCH' | 'AVG_BLOCK_TIME';
}

/**
 * Controller for /block routes
 *
 */
export class BlockController {
  private service: BlockService;
  constructor() {
    this.service = new BlockService();
  }

  /**
   * blockHeight get Ethereum last block
   *
   * @param {Request} req - endpoint request
   * @param {Request} res - endpoint response
   *
   */
  blockHeight = async (req: Request, res: Response) => {
    const height = await this.service.getHeight();
    res.send({ height });
  };

  /**
   * getTimestampForBlock get timestamp fro Ethereum Block
   *
   * @param {Request} req - endpoint request
   * @param {Request} res - endpoint response
   *
   */
  getTimestampForBlock = async (req: Request, res: Response) => {
    const block = await this.service.getBlock(+req.params.blockHeight);

    res.send(new TimestampTransformer(block.timestamp).transform());
  };

  /**
   * blockByTimestamp get Ethereum Block for blockHeight
   *
   * @param {Request} req - endpoint request
   * @param {Request} res - endpoint response
   *
   */
  blockByHeight = async (req: Request, res: Response) => {
    if (!req.params.blockHeight) {
      res.status(400).send({ message: 'missing params', code: 400 });
      return;
    }
    const block = await this.service.getBlock(+req.params.blockHeight);
    res.send(new BlockTransformer(block).transform());
  };

  /**
   * blockByTimestamp get Ethereum last block
   *
   * @param {Request} req - endpoint request
   * @param {Request} res - endpoint response
   *
   */
  blockByTimestamp = async (req: Request, res: Response) => {
    const validationErrors = blockTimestampValidator.validate(structuredClone(req.body));
    if (validationErrors.length !== 0) {
      res.status(400).send({ message: validationErrors.toString(), code: 400 });
      return;
    }
    const params: BlockByTimestampParams = req.body;

    let block;
    switch (params.method || 'BINARY_SEARCH') {
      case 'AVG_BLOCK_TIME':
        block = await this.service.findBlockByTimeAverage(params.timestamp);
        break;
      default:
        block = await this.service.findBlockByTimestampBisect(params.timestamp);
        break;
    }

    res.send({ block });
  };
}

export const blockController = new BlockController();