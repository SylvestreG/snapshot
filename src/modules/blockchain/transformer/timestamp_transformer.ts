export interface TimestampResponse {
  timestamp: number;
  humanReadableDate: string;
}

/**
 * Transformer for a Timestamp
 *
 */
export class TimestampTransformer {
  private readonly timestamp;

  /**
   * ctor
   *
   * @param {number} timestamp - timestamp to display
   *
   */
  constructor(timestamp: number) {
    this.timestamp = timestamp;
  }

  /**
   * Transform a timestamp to a TimestampResponse
   *
   */
  transform(): TimestampResponse {
    return {
      timestamp: this.timestamp,
      humanReadableDate: new Date(this.timestamp * 1000).toISOString(),
    };
  }
}
