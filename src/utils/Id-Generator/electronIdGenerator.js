/**
 * ID generator optimized for Electron
 * Leverages both browser and Node.js APIs
 */

let counter = 0

/**
 * Detects if running in Electron
 * @returns {boolean}
 */
function isElectron() {
  return typeof window !== 'undefined' && window.process && window.process.type
}

/**
 * Generates an ID using Node.js crypto when available (Electron)
 * @returns {string} Unique ID using Node.js crypto
 */
function generateNodeCryptoId() {
  try {
    // In Electron, we can access require
    const crypto = window.require('crypto')
    return crypto.randomUUID()
  } catch (error) {
    // If it fails, use browser crypto or fallback
    return null
  }
}

/**
 * Generates a unique ID optimized for Electron
 * Priority: Node.js crypto > Browser crypto > Custom fallback
 * @returns {string} Unique ID
 */
export function generateElectronId() {
  // 1st option: Node.js crypto (more robust in Electron)
  if (isElectron()) {
    const nodeId = generateNodeCryptoId()
    if (nodeId) return nodeId
  }

  // 2nd option: Browser crypto API
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  // 3rd option: Custom fallback
  return generateCustomUUID()
}

/**
 * Generates a custom UUID v4 (same as original file)
 * @returns {string}
 */
function generateCustomUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Generates an ID with Electron-specific information
 * Includes process info when available
 * @returns {string}
 */
export function generateElectronSystemId() {
  const baseId = generateElectronId()

  if (isElectron()) {
    try {
      const process = window.require('process')
      const platform = process.platform
      const arch = process.arch

      return `${baseId}_${platform}_${arch}`
    } catch (error) {
      // If it fails, return only the base ID
      return baseId
    }
  }

  return baseId
}

/**
 * Hybrid version that uses the best available option
 * @returns {string}
 */
export function generateOptimalId() {
  if (isElectron()) {
    return generateElectronId()
  }

  // For normal browser, use functions from original file
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return generateCustomUUID()
}

/**
 * Generates an ID with precise timestamp (leverages performance.now() if available)
 * @returns {string}
 */
export function generateTimestampId() {
  const timestamp = typeof performance !== 'undefined' ? performance.now() : Date.now()

  const randomPart = generateOptimalId().slice(0, 8)
  counter = (counter + 1) % 10000

  return `note_${Math.floor(timestamp)}_${counter}_${randomPart}`
}

/**
 * Main function - automatically chooses the best option
 */
export default generateOptimalId
