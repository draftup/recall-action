Recall Action
=========

Subscribable function

## Installation

```bash
> npm install recall-action
```

## Usage

```javascript
import createAction from 'recall-action'

// create action
const action = createAction((value1, value2) => {
  return value1 + value2
})

// pass function to bucket, returns { done } object
const listener1 = action((receivedValue) => {
  console.log(`listener1 logs ${receivedValue}`)
})

// any action call with typeof !== 'fucntion' first argument will recall every listener with returned value passed as a first argument
action(2,3)
//> listener1 logs 5

const listener2 = action((receivedValue) => {
  console.log(`listener2 logs ${receivedValue}`)
})

action('java', 'script')
//> listener1 logs javascript
//> listener2 logs javascript

// call done method to remove listener from action
listener1.done()

bucket()
//> listener2 logs
listener2.done()
```
