import React, { useState } from "react";
import "../styles/JobForm.css";

const JobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
    applicationLink: "",
    status: "Applied",
  }); //initial state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: "dummyUserId1234567890abcdef", // TEMP solution, will be dynamic after auth
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Job added successfully!");
        setFormData({
          title: "",
          company: "",
          location: "",
          description: "",
          salary: "",
          applicationLink: "",
          status: "Applied",
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to add job.");
    }
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <h2>Add New Job</h2>

      <label htmlFor="title">Job Title</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="company">Company</label>
      <input
        type="text"
        id="company"
        name="company"
        value={formData.company}
        onChange={handleChange}
        required
      />

      <label htmlFor="location">Location</label>
      <input
        type="text"
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label htmlFor="salary">Salary (optional)</label>
      <input
        type="number"
        id="salary"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
      />

      <label htmlFor="applicationLink">Application Link</label>
      <input
        type="url"
        id="applicationLink"
        name="applicationLink"
        value={formData.applicationLink}
        onChange={handleChange}
      />

      <label htmlFor="status">Status</label>
      <select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="Applied">Applied</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <button type="submit">Add Job</button>
    </form>
  );
};

export default JobForm;