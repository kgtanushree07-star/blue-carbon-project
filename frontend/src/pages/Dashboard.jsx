function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-green-800">
        Blue Carbon Registry
      </h1>

      <p className="mt-2 text-gray-600">
        Blockchain-based Blue Carbon Registry & MRV System
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-4">

        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-gray-500">Total Projects</p>
          <h2 className="mt-2 text-3xl font-bold">12</h2>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-gray-500">Verified Projects</p>
          <h2 className="mt-2 text-3xl font-bold">8</h2>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-gray-500">Carbon Credits</p>
          <h2 className="mt-2 text-3xl font-bold">1,250</h2>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-gray-500">Pending Verification</p>
          <h2 className="mt-2 text-3xl font-bold">4</h2>
        </div>

      </div>

    </div>
  )
}

export default Dashboard