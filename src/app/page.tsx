export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Aeon Bank
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Challenge 1
        </p>
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-700 mb-6">
            Basic Navbar implementation. The navbar above includes:
          </p>
          <ul className="text-left list-disc list-inside space-y-2 text-gray-700">
            <li>Responsive design that works on desktop and mobile</li>
            <li>Collapsible mobile menu with hamburger icon toggle</li>
            <li>Search input field (non-functional as requested)</li>
            <li>Login button that navigates to Challenge 2</li>
          </ul>
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              Try resizing the browser using inspect element to see the collapsible navbar in action :)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

