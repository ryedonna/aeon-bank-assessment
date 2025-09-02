# Aeon Bank Assessment Project

A Next.js application demonstrating a responsive navbar, multi-step login flow with password encryption, and a transaction history dashboard.

## Features Implemented

### Challenge 1: Responsive Navbar
- Clean, modern navbar with AEON branding
- Responsive design that collapses to a hamburger menu on mobile
- Search input field (non-functional as requested)
- Login button that navigates to the login page

### Challenge 2: Multi-Step Login Flow
- Username input step with validation
- Secure word retrieval from mock API
- Password input with encryption before submission
- Success confirmation with auto-redirect
- Password encryption using SHA-256 hashing

### Challenge 3: Transaction History Dashboard
- Data fetching from mock API endpoint
- Clean, responsive table design
- Transaction categorization (inflow/outflow) with color coding
- Loading states and error handling

## Technology Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Security**: Web Crypto API for password hashing

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── getSecureWord/route.ts      # Returns static secure word
│   │   ├── login/route.ts              # Accepts encrypted credentials
│   │   └── transaction-history/route.ts # Mock transaction data
│   ├── dashboard/
│   │   └── page.tsx                    # Transaction table
│   ├── login/
│   │   └── page.tsx                    # Multi-step login form
│   ├── layout.tsx                      # Root layout with navbar logic
│   ├── page.tsx                        # Home page
│   └── globals.css                     # Global styles
├── components/
│   ├── ClientWrapper.tsx               # Navbar visibility control
│   └── Navbar.tsx                      # Responsive navbar component
└── utils/
    └── encryption.ts                   # Password hashing utilities
```

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. Clone or download the project files
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

```bash
npm run build
```

### Starting Production Server

```bash
npm start
```

## Usage

1. **Home Page**: Navigate to the root URL to see the responsive navbar and introduction
2. **Login Flow**: Click the "Login" button to start the multi-step authentication process
   - Step 1: Enter any username
   - Step 2: View the secure word returned from the API
   - Step 3: Enter any password (will be encrypted before submission)
   - Step 4: See success message and auto-redirect to dashboard
3. **Dashboard**: View transaction history table with mock data

## API Endpoints

- `POST /api/getSecureWord` - Returns a static secure word for any username
- `POST /api/login` - Accepts encrypted credentials and returns success
- `GET /api/transaction-history` - Returns mock transaction data

## Security Notes

- Passwords are hashed client-side using SHA-256 before being sent to the server
- This is a demonstration system with mock APIs - not suitable for production
- In a real application, you would add server-side validation, database storage, and proper session management

## Assessment Requirements Checklist

- ✅ Responsive navbar with collapsible mobile menu
- ✅ Search input field (non-functional)
- ✅ Login button navigation
- ✅ Multi-step login form
- ✅ Mock API endpoints
- ✅ Password encryption before submission
- ✅ Transaction history table with data fetching
- ✅ Clean UI with proper styling

## Demo Credentials

This is a demonstration system, so any credentials will work:
- Username: Any text value
- Password: Any text value

The system will always return a successful login for demonstration purposes.
