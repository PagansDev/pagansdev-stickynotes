/**
 * Index file to facilitate imports of utility functions
 */

// Re-exports all functions from the standard ID generator
export {
  generateUniqueId,
  generateSimpleId,
  generateShortId,
  generateIdWithPrefix,
  isValidId,
} from './idGenerator.js'

// Re-exports Electron-optimized functions
export {
  generateElectronId,
  generateElectronSystemId,
  generateOptimalId,
  generateTimestampId,
} from './electronIdGenerator.js'

// Default export of the main ID generation function
export { default as generateId } from './idGenerator.js'
