import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json()

    // Validate that username is provided
    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      )
    }

    // Simulate API delay (optional - makes it feel more realistic)
    await new Promise(resolve => setTimeout(resolve, 500))

    // Return static secure word (as per requirements)
    // In a real app, this might be generated or retrieved from a database
    const secureWord = 'Ryedonna :)'

    return NextResponse.json({
      success: true,
      secureWord,
      timestamp: new Date().toISOString(),
      username // Echo back the username for confirmation
    })

  } catch (error) {
    console.error('Error in getSecureWord API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}