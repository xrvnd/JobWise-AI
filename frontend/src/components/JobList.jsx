import React, { useEffect, useState } from "react";
import "../styles/JobList.css";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;
  if (jobs.length === 0) return <p>No jobs found.</p>;

  return (
    <div className="job-list">
      <h2>All Jobs</h2>
      {jobs.map((job) => (
        <div key={job._id} className="job-card">
          <h3>
            {job.title} @ {job.company}
          </h3>
          <p>
            <strong>Status:</strong> {job.status}
          </p>
          <p>
            <strong>Location:</strong> {job.location || "—"}
          </p>
          <p>
            <strong>Description:</strong> {job.description}
          </p>
          <a
            href={job.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply Link
          </a>
        </div>
      ))}
    </div>
  );
};

export default JobList;
