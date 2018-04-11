import {
  applySpec,
  pathOr,
} from 'ramda'

const getApiKey = env => pathOr('', ['api_key', env])

const encryptionKey = env => pathOr('', ['encryption_key', env])

const getApiKeys = env => applySpec({
  apiKey: getApiKey(env),
  encryptionKey: encryptionKey(env),
})

export default applySpec({
  live: getApiKeys('live'),
  test: getApiKeys('test'),
})

