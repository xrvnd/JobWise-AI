import React, { useEffect, useState } from "react";
import "../styles/JobBoard.css";

const statuses = ["Applied", "Interviewing", "Offer", "Rejected"];

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="job-board">
      {statuses.map((status) => (
        <div key={status} className="job-column">
          <h2>{status}</h2>
          {jobs
            .filter((job) => job.status === status)
            .map((job) => (
              <div key={job._id} className="job-card">
                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <p>{job.location || "-"}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default JobBoard;
