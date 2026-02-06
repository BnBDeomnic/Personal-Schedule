import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex flex-col items-center text-center px-6 py-12 max-w-2xl">
        <div className="mb-8">
          <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-xl">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Create Your Weekly<br />Class Schedule
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Export high-quality images and PDFs of your academic week. Save, share, and access from anywhere.
          </p>
        </div>

        <div className="flex gap-4">
          <Link 
            href="/signup"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link 
            href="/login"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl border border-gray-200"
          >
            Sign In
          </Link>
        </div>

        <div className="mt-12 flex gap-6 text-sm text-gray-500 dark:text-gray-400">
          <span>✓ Cloud Storage</span>
          <span>✓ Multi-Device</span>
          <span>✓ High-Quality Export</span>
        </div>
      </main>
    </div>
  );
}
