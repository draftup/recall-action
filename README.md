Recall Bucket
=========

Centralised storage for callbacks.

## Installation

`npm install recall-bucket`

## Usage

```javascript
import createBucket from 'recall-bucket'

// create unit
const bucket = createBucket()

// pass function to bucket, returns { done } object
const listener1 = bucket((value) => {
  console.log(`listener1 logs ${value}`)
})

// any bucket call with typeof !== 'fucntion' argument will recall every attached listener with same argument
bucket(1)
//> listener1 logs 1

const listener2 = bucket((value) => {
  console.log(`listener2 logs ${value}`)
})

bucket('egg')
//> listener1 logs egg
//> listener2 logs egg

// call done method to remove listener from bucket
listener1.done()

bucket()
//> listener2 logs
listener2.done()
```
