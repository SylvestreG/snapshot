import * as validate from 'validate';

export const blockTimestampValidator = new validate({
  timestamp: {
    type: Number,
    required: true,
    use: {
      statusEnum: (val: number) => val > 0 && val <= Date.now(),
    },
  },
  method: {
    type: String,
    required: false,
    enum: ['BINARY_SEARCH', 'AVG_BLOCK_TIME'],
  },
});

blockTimestampValidator.message({
  statusEnum: (path: string) => `${path} isn't a valid timestamp.`,
});
