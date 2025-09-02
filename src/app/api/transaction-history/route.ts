import { NextRequest, NextResponse } from 'next/server'

export interface Transaction {
  id: string
  date: string
  referenceId: string
  to: string
  transactionType: string
  amount: string
  type: 'credit' | 'debit'
}

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Mock transaction data matching the table design
    const transactions: Transaction[] = [
      {
        id: '1',
        date: '24 Aug 2023',
        referenceId: '#814343343342',
        to: 'Bloom Enterprise Sdn Bhd\nRecipient references will go here',
        transactionType: 'DuitNow payment',
        amount: 'RM 1,200.00',
        type: 'debit' 
      },
      {
        id: '2',
        date: '16 Jul 2023',
        referenceId: '#814343343342',
        to: 'Muhammad Andy Azmoui\nRecipient references will go here',
        transactionType: 'DuitNow payment',
        amount: 'RM 54,810.16',
        type: 'debit' 
      },
      {
        id: '3',
        date: '12 Jul 2023',
        referenceId: '#814343343342',
        to: 'Utilities Company Sdn Bhd\nRecipient references will go here',
        transactionType: 'DuitNow payment',
        amount: 'RM 100.00',
        type: 'debit' 
      },
      {
        id: '4',
        date: '10 Jul 2023',
        referenceId: '#814343343342',
        to: 'Salary Credit\nMonthly salary payment',
        transactionType: 'DuitNow',
        amount: 'RM 8,500.00',
        type: 'credit'
      },
      {
        id: '5',
        date: '08 Jul 2023',
        referenceId: '#814343343342',
        to: 'Food Mart Sdn Bhd\nGrocery shopping payment',
        transactionType: 'DuitNow payment',
        amount: 'RM 245.50',
        type: 'debit' 
      },
      {
        id: '6',
        date: '05 Jul 2023',
        referenceId: '#814343343342',
        to: 'Online Transfer\nTransfer to savings account',
        transactionType: 'DuitNow payment',
        amount: 'RM 2,000.00',
        type: 'debit' 
      },
      {
        id: '7',
        date: '03 Jul 2023',
        referenceId: '#814343343343',
        to: 'Interest Credit\nMonthly interest payment',
        transactionType: 'DuitNow',
        amount: 'RM 125.75',
        type: 'credit'
      },
      {
        id: '8',
        date: '01 Jul 2023',
        referenceId: '#814343343344',
        to: 'Refund Processing\nPurchase refund',
        transactionType: 'DuitNow',
        amount: 'RM 89.90',
        type: 'credit'
      }
    ]

    return NextResponse.json({
      success: true,
      data: transactions,
      total: transactions.length,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error in transaction-history API:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch transaction history' 
      },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed. Use GET to fetch transaction history.' },
    { status: 405 }
  )
}