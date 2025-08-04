export default function TestPage() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Test Page</h1>
        <p className="text-lg text-gray-700 mb-8">
          This is a test page to verify that Next.js and Tailwind CSS are working correctly.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Features Test</h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Next.js 14 App Router
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Tailwind CSS Styling
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              TypeScript Support
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
