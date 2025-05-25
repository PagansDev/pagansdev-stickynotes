/**
 * Unique ID generator for notes
 * Uses timestamp, random numbers and counter to ensure uniqueness
 */

let counter = 0

/**
 * Generates a unique ID using crypto.randomUUID() if available,
 * otherwise uses a custom implementation
 * @returns {string} Unique ID in UUID v4 format
 */
export function generateUniqueId() {
  // Check if crypto.randomUUID is available (modern browsers)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  // Fallback for browsers that don't support crypto.randomUUID
  return generateCustomUUID()
}

/**
 * Generates a custom UUID v4
 * @returns {string} UUID in format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 */
function generateCustomUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Generates a simpler unique ID based on timestamp and counter
 * Useful for cases where a complete UUID is not necessary
 * @returns {string} ID in format note_timestamp_counter_random
 */
export function generateSimpleId() {
  const timestamp = Date.now()
  const randomPart = Math.random().toString(36).substr(2, 9)
  counter = (counter + 1) % 10000 // Reset counter every 10000

  return `note_${timestamp}_${counter}_${randomPart}`
}

/**
 * Generates a short ID for notes (more readable)
 * @returns {string} Short ID in format nt_xxxxxxxxx
 */
export function generateShortId() {
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).substr(2, 5)

  return `nt_${timestamp}_${randomPart}`
}

/**
 * Validates if an ID is valid (not empty and with proper format)
 * @param {string} id - ID to be validated
 * @returns {boolean} true if the ID is valid
 */
export function isValidId(id) {
  if (!id || typeof id !== 'string') {
    return false
  }

  // Check if it's a UUID v4
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  if (uuidRegex.test(id)) {
    return true
  }

  // Check if it's a simple or short ID
  const simpleIdRegex = /^(note_|nt_)\d+_\d+_[a-z0-9]+$/i
  return simpleIdRegex.test(id)
}

/**
 * Creates a note ID with custom prefix
 * @param {string} prefix - Prefix for the ID (default: 'note')
 * @returns {string} ID with custom prefix
 */
export function generateIdWithPrefix(prefix = 'note') {
  const uuid = generateUniqueId()
  return `${prefix}_${uuid}`
}

// Default export of the main function
export default generateUniqueId
