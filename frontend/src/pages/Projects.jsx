import { useState } from "react"

function Projects() {

  const [formData, setFormData] = useState({
    project_name: "",
    location: "",
    ecosystem_type: "Mangrove",
    area_hectares: "",
    start_date: "",
    status: "Active"
  })

  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    setMessage("Registering project...")

    try {

      const response = await fetch(
        "http://blue-carbon-project.onrender.com//api/projects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      )

      const data = await response.json()

      if (response.ok) {

        setMessage(
          `Project registered successfully! ID: ${data.project_id}`
        )

        setFormData({
          project_name: "",
          location: "",
          ecosystem_type: "Mangrove",
          area_hectares: "",
          start_date: "",
          status: "Active"
        })

      } else {

        setMessage(data.error)

      }

    } catch (error) {

      setMessage(
        "Backend connection failed. Make sure Flask server is running."
      )

    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-green-800">
        Blue Carbon Projects
      </h1>

      <p className="mt-2 text-gray-600">
        Register and manage blue carbon projects
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 max-w-3xl rounded-lg bg-white p-6 shadow"
      >

        <h2 className="mb-6 text-xl font-bold">
          Register New Project
        </h2>

        <div className="space-y-5">

          <div>
            <label>Project Name</label>

            <input
              name="project_name"
              value={formData.project_name}
              onChange={handleChange}
              className="mt-2 w-full rounded border p-3"
              placeholder="Mangrove Restoration Project"
              required
            />
          </div>

          <div>
            <label>Location</label>

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-2 w-full rounded border p-3"
              placeholder="Tamil Nadu"
              required
            />
          </div>

          <div>
            <label>Ecosystem Type</label>

            <select
              name="ecosystem_type"
              value={formData.ecosystem_type}
              onChange={handleChange}
              className="mt-2 w-full rounded border p-3"
            >
              <option>Mangrove</option>
              <option>Seagrass</option>
              <option>Salt Marsh</option>
              <option>Coastal Wetland</option>
            </select>
          </div>

          <div>
            <label>Area (hectares)</label>

            <input
              name="area_hectares"
              value={formData.area_hectares}
              onChange={handleChange}
              type="number"
              step="0.01"
              className="mt-2 w-full rounded border p-3"
              placeholder="100"
              required
            />
          </div>

          <div>
            <label>Start Date</label>

            <input
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              type="date"
              className="mt-2 w-full rounded border p-3"
              required
            />
          </div>

          <button
            type="submit"
            className="rounded bg-green-700 px-6 py-3 font-semibold text-white"
          >
            Register Project
          </button>

          {message && (
            <p className="font-semibold text-green-700">
              {message}
            </p>
          )}

        </div>

      </form>

    </div>
  )
}

export default Projects