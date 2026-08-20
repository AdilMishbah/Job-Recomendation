function JobCard({ job, isSaved, onToggleSave }) {
  return (
    <article className="job-card">

      <div className="company-logo">
        {job.logo}
      </div>
      <div className="job-main">

        <div className="job-title-row">
          <h2>{job.title}</h2>
        </div>

        <h3 className="company-name">
          {job.company}
          <span className="verified">✓</span>
        </h3>

        <p className="job-meta">
          {job.type} • {job.level}
        </p>

        <p className="job-location">
          🇮🇳 {job.location}
        </p>

      </div>

      <div className="job-details">

        <div className="job-tags">

          <span className="salary-tag">
            {job.salary}
          </span>

          <span className="type-tag">
            {job.type}
          </span>

          <span className={`workplace-badge badge-${job.workplaceType?.toLowerCase()}`}>
            {job.workplaceType}
          </span>

        </div>

        <div className="job-bottom">

          <span className="posted-time">
            Recently posted
          </span>

          <button
            type="button"
            className={`save-btn ${isSaved ? "saved" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
          >
            {isSaved ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#ef4444">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
          </button>

        </div>
        
      </div>

    </article>
  );
}

export default JobCard;