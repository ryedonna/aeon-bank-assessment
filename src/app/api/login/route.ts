import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username, encryptedPassword } = await request.json()

    // Validate required fields
    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      )
    }

    if (!encryptedPassword || typeof encryptedPassword !== 'string') {
      return NextResponse.json(
        { error: 'Encrypted password is required' },
        { status: 400 }
      )
    }

    // Validate that password is actually encrypted (should be a hex string)
    const isValidHash = /^[a-f0-9]{64}$/i.test(encryptedPassword)
    if (!isValidHash) {
      return NextResponse.json(
        { error: 'Invalid password format' },
        { status: 400 }
      )
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // In a real application, it should perform this:
    // 1. Look up the user in a database
    // 2. Compare the hashed password with stored hash
    // 3. Generate a JWT token or session
    // 4. Return appropriate user data

    // For this mock API, we'll just return success for any valid input
    console.log(`Login attempt for user: ${username}`)
    console.log(`Encrypted password received: ${encryptedPassword.substring(0, 10)}...`)

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        username,
        loginTime: new Date().toISOString()
      },
      // In a real app, return a token here
      // token: 'jwt-token-would-go-here'
    })

  } catch (error) {
    console.error('Error in login API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST for login.' },
    { status: 405 }
  )
}