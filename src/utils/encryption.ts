/**
 * Hash a password using the Web Crypto API (available in browsers)
 * This provides a secure way to hash passwords client-side
 */
export async function hashPassword(password: string): Promise<string> {
  // Convert password to ArrayBuffer
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  
  // Hash the password using SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  
  // Convert hash to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  
  return hashHex
}

/**
 * Alternative hash function using a simple salt
 * This adds an extra layer of security
 */
export async function hashPasswordWithSalt(password: string, salt: string = 'aeon-bank-salt'): Promise<string> {
  const saltedPassword = password + salt
  return await hashPassword(saltedPassword)
}