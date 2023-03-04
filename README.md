# Snapshot

Simple API that takes a timestamp in seconds as an input and returns the closest
Ethereum block number that was created after the input timestamp.

## Routes

To solve this problem, we are providing multiple routes, some toaddress
the problem directly and others to help check our resultsmore conveniently.

To find a block by timestamp, we provide two different algorithms.The first
one is the more obvious and we call it the `Bisect` method.The other one will
be named here the `Block Averaging` method.

The `Bisect` method is quite simple. We start by finding the correctblock
between block 1 and the latest block. We look at the block just
between them, and if its timestamp is later than the one we are looking
for, we continue the same way with the lower sample. If not, we continue
with the upper sample, and we repeat this process until we find the
correct block. This method complexity should be `O(log n)`.

The `Block Averaging` method is more heuristic. The aim of this method
is to start with an average second-by-block time, obtain the timestamp
of the last block, find the difference between the target time and the
last block time, and estimate the number of blocks between these two
timestamps. Then, we continue the same way using the same timestamp
until we find the correct block. The problem with this solution is that
block times are not consistent, so the average time needs to be
recomputed each time... I think this solution will often be faster,
but may not outperform the "Bisect" method in the worst-case scenario.

### GET /block/height

Get last block number on ethereum.

#### output

```json
{
  "height": 172772
}
```
#### curl example

```bash
➜  snapshot git:(main) ✗ curl 127.0.0.1:3000/block/height | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    19  100    19    0     0    108      0 --:--:-- --:--:-- --:--:--   113
{
  "height": 16754419
}
```

### GET /block/:blockHeight

Get the blockHeight block

#### output
```json
{
  "timestamp": {
    "timestamp": 1438847903,
    "humanReadableDate": "2015-08-06T07:58:23.000Z"
  },
  "height": "42000",
  "rawBlock": "block provided by etherjs"
}
```

#### curl example
```bash
curl 127.0.0.1:3000/block/42000 | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   654  100   654    0     0   2811      0 --:--:-- --:--:-- --:--:--  2843
{
  "timestamp": {
    "timestamp": 1438847903,
    "humanReadableDate": "2015-08-06T07:58:23.000Z"
  },
  "height": "42000",
  "rawBlock": {
    "hash": "0x0e80e7a94dacc31c4cc6e376befc60ef73ef3d19d26f329adfc020eeded2753b",
    "parentHash": "0x8ff8459d06630b4b61cf60b5578480a63a94fcbf825e44a85ac8c70f89aeda6c",
    "number": 42000,
    "timestamp": 1438847903,
    "nonce": "0x0f0995e66e93b6bd",
    "difficulty": 1367265090026,
    "gasLimit": {
      "type": "BigNumber",
      "hex": "0x13e8"
    },
    "gasUsed": {
      "type": "BigNumber",
      "hex": "0x00"
    },
    "miner": "0x55bAf64fc9eAccFFd7Cc643BB61142E1C6ac093e",
    "extraData": "0x476574682f76312e302e302f6c696e75782f676f312e342e32",
    "transactions": [],
    "_difficulty": {
      "type": "BigNumber",
      "hex": "0x013e575999ea"
    }
  }
}
```

### GET /block/:blockHeight/time

Get timestamp information about a given block.


### POST /block/by-timestamp

Find the last block on Ethereum for given timestamp.

#### input

```json
    {
      "timestamp": 1447875361,
      "method": "AVG_BLOCK_TIME"
    }
```
- timestamp is the timestamp we are looking a block for.
- method is the method use to find the block it can be
  - AVG_BLOCK_TIME for average method
  - BINARY_SEARCH for bisect method.

We agree that this method should be a GET with params.
However, for the purpose of demonstrating how I would implement
a POST, I am using a POST method here.

#### output

```json
{
  "block": {
    "height": 561203,
    "nbLookup": 10
  }
}
```

- height is the block wanted
- nbLookup is the number of getBlock needed to find the
solution.

#### curl example

```bash
curl -d '{"timestamp": 1447875361, "method": "AVG_BLOCK_TIME" }' -H "Content-Type: application/json" -X POST 127.0.0.1:3000/block/by-timestamp | jq

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    95  100    41  100    54     15     20  0:00:02  0:00:02 --:--:--    35
{
  "block": {
    "height": 561203,
    "nbLookup": 10
  }
}
```

## Commands

### yarn cs

##### Purpose

Lint and format the code to have consistency into the code base.

##### Usage
```bash
➜  snapshot git:(main) yarn cs
```

### yarn dev:watch

##### Purpose
Launch the api server on localhost using port 3000.

##### Usage
```bash
➜  snapshot git:(main) yarn dev:watch
yarn run v1.22.19
$ nodemon --watch 'src/**/*' -e ts,tsx --exec 'NODE_PATH=./src ts-node --files' ./src/server.ts
[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src/**/*
[nodemon] watching extensions: ts,tsx
[nodemon] starting `NODE_PATH=./src ts-node --files ./src/server.ts`
2023-03-04 09:42:35.953 INFO    /src/server.ts:14       Listen on port 3000
```

### yarn test

##### Purpose
Launch the test suite

##### Usage
```bash
➜  snapshot git:(master) ✗ yarn test
yarn run v1.22.19
$ NODE_PATH=./src jest
 PASS  src/modules/blockchain/test/block.test.ts
  blockchain » block
    ✓ Last height work (890 ms)
    ✓ Get Block works (582 ms)
    ✓ Get Invalid Block (1 ms)
    ✓ Get Invalid Block number negative (2 ms)
    ✓ Get Invalid Block number too big (466 ms)
    ✓ Get Block timestamp works (853 ms)
    ✓ trying without timestamp (17 ms)
    ✓ trying with wrong method (3 ms)

 PASS  src/modules/blockchain/test/non-regression.test.ts (13.636 s)
  blockchain » block » non-regress
    ✓ Get block by bisect for avg  (8198 ms)
    ✓ Get block by bisect for ts  (4132 ms)

Test Suites: 2 passed, 2 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        13.808 s, estimated 16 s
Ran all test suites.
✨  Done in 14.33s.
```