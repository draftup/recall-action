/* eslint-env mocha */

const assert = require('assert')
let createAction
if (process.env.TYPE === 'src') {
  createAction = require('../src')
} else {
  createAction = require('../build')
}

describe('create recall action without arguments', () => {
  it('throws an error', () => {
    try {
      createAction()
    } catch (e) {
      return true
    }
  })
})

describe('create recall action with non-function argument', () => {
  it('throws an error', () => {
    try {
      createAction([])
    } catch (e) {
      return true
    }
  })
})

describe('create recall action with function argument', () => {
  it('returns a function', () => {
    const isFn = typeof createAction(() => {}) === 'function'
    if (!isFn) {
      throw new Error('A function should be returned.')
    }
  })
})

describe('pass function to recall action', () => {
  it('returns { done } object', () => {
    const action = createAction(() => {})
    const listener = action(() => {})
    const key = Object.keys(listener)[0]
    assert.equal(key, 'done')
  })
})

describe('pass nothing to recall action', () => {
  it('returns default value', () => {
    const action = createAction((payload) => {
      const value = 5
      if (payload) {
        return value + payload
      }
      return value
    })
    const returnedValue = action()
    if (returnedValue !== 5) {
      throw new Error(`Expected 5, returned ${returnedValue}.`)
    }
  })
  it('do not recalls listeners', () => {
    const action = createAction(() => {})
    action((value, init) => {
      if (!init) {
        throw new Error("Listener shouldn't be called.")
      }
    })
    action()
  })
})

describe('pass value from recall action to listener', () => {
  it('same value passed to listener', () => {
    const valueToPass = 5
    const action = createAction((value) => {
      return value*2
    })
    const listener = action((value, initial) => {
      if (!initial) {
        assert.equal(value, valueToPass * 2)
      }
    })
    action(valueToPass)
  })
})

describe('pass non-fucntion value to recall action', () => {
  it('value should match', () => {
    const valueToPass = 5
    const bucket = createAction((value) => {
      if (value !== valueToPass) {
        throw new Error('Value do not match.')
      }
    })
    bucket(valueToPass)
  })
})

describe('pass non-fucntion values to recall action', () => {
  it('all values should match', () => {
    const valuesToPass = [5, "str", true, null]
    const action = createAction((values) => {
      assert.deepEqual(values, valuesToPass)
    })
    action(valuesToPass)
  })
})