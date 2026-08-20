import { useState } from "react";
import JobCard from "./components/JobCard";
import LoginPage from "./components/LoginPage";
import "./App.css";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TCS",
    location: "Bengaluru",
    salary: "₹6 LPA - ₹10 LPA",
    type: "Full-time",
    level: "Mid Level",
    category: "Development",
    logo: "T",
    workplaceType: "On-site",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Infosys",
    location: "Hyderabad",
    salary: "₹7 LPA - ₹12 LPA",
    type: "Full-time",
    level: "Senior Level",
    category: "Design",
    logo: "I",
    workplaceType: "Hybrid",
  },
  {
    id: 3,
    title: "Customer Support Specialist",
    company: "Tech Mahindra",
    location: "Bhubaneswar",
    salary: "₹25,000 - ₹35,000 a month",
    type: "Internship",
    level: "Entry Level",
    category: "Customer Support",
    logo: "T",
    workplaceType: "On-site",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Wipro",
    location: "Delhi",
    salary: "₹35,000 - ₹50,000 a month",
    type: "Part-time",
    level: "Mid Level",
    category: "Design",
    logo: "W",
    workplaceType: "Remote",
  },
  {
    id: 5,
    title: "React Developer",
    company: "HCLTech",
    location: "Noida",
    salary: "₹8 LPA - ₹14 LPA",
    type: "Full-time",
    level: "Senior Level",
    category: "Development",
    logo: "H",
    workplaceType: "On-site",
  },
  {
    id: 6,
    title: "Digital Marketing Executive",
    company: "Zomato",
    location: "Mumbai",
    salary: "₹30,000 - ₹42,000 a month",
    type: "Part-time",
    level: "Entry Level",
    category: "Marketing",
    logo: "Z",
    workplaceType: "Remote",
  },
  {
    id: 7,
    title: "Data Analyst",
    company: "Accenture India",
    location: "Bengaluru",
    salary: "₹6 LPA - ₹11 LPA",
    type: "Full-time",
    level: "Mid Level",
    category: "Data Science",
    logo: "A",
    workplaceType: "On-site",
  },
  {
    id: 8,
    title: "Backend Developer",
    company: "Razorpay",
    location: "Bengaluru",
    salary: "₹9 LPA - ₹16 LPA",
    type: "Full-time",
    level: "Senior Level",
    category: "Development",
    logo: "R",
    workplaceType: "Hybrid",
  },
  {
    id: 9,
    title: "Content Writer",
    company: "Times Internet",
    location: "Delhi",
    salary: "₹20,000 - ₹30,000 a month",
    type: "Part-time",
    level: "Entry Level",
    category: "Marketing",
    logo: "T",
    workplaceType: "Remote",
  },
  {
    id: 10,
    title: "Product Manager",
    company: "Flipkart",
    location: "Bengaluru",
    salary: "₹15 LPA - ₹25 LPA",
    type: "Full-time",
    level: "Senior Level",
    category: "Product",
    logo: "F",
    workplaceType: "On-site",
  },
  {
    id: 11,
    title: "DevOps Engineer",
    company: "Cognizant",
    location: "Hyderabad",
    salary: "₹8 LPA - ₹14 LPA",
    type: "Full-time",
    level: "Mid Level",
    category: "Development",
    logo: "C",
    workplaceType: "Hybrid",
  },
  {
    id: 12,
    title: "Graphic Designer",
    company: "Deloitte India",
    location: "Mumbai",
    salary: "₹35,000 - ₹50,000 a month",
    type: "Part-time",
    level: "Mid Level",
    category: "Design",
    logo: "D",
    workplaceType: "On-site",
  },
  {
    id: 13,
    title: "SEO Specialist",
    company: "Myntra",
    location: "Bengaluru",
    salary: "₹5 LPA - ₹9 LPA",
    type: "Internship",
    level: "Mid Level",
    category: "Marketing",
    logo: "M",
    workplaceType: "On-site",
  },
  {
    id: 14,
    title: "Machine Learning Engineer",
    company: "Walmart Global Tech India",
    location: "Bengaluru",
    salary: "₹12 LPA - ₹22 LPA",
    type: "Full-time",
    level: "Senior Level",
    category: "Data Science",
    logo: "W",
    workplaceType: "On-site",
  },
  {
    id: 15,
    title: "Technical Support Engineer",
    company: "Mphasis",
    location: "Indore",
    salary: "₹30,000 - ₹45,000 a month",
    type: "Full-time",
    level: "Mid Level",
    category: "Customer Support",
    logo: "M",
    workplaceType: "On-site",
  },
  {
    id: 16,
    title: "JavaScript Developer",
    company: "Zoho",
    location: "Bengaluru",
    salary: "₹6 LPA - ₹11 LPA",
    type: "Contract",
    level: "Mid Level",
    category: "Development",
    logo: "Z",
    workplaceType: "Remote",
  },
  {
    id: 17,
    title: "UX Researcher",
    company: "Swiggy",
    location: "Hyderabad",
    salary: "₹40,000 - ₹55,000 a month",
    type: "Part-time",
    level: "Mid Level",
    category: "Design",
    logo: "S",
    workplaceType: "Hybrid",
  },
  {
    id: 18,
    title: "Social Media Manager",
    company: "Nykaa",
    location: "Mumbai",
    salary: "₹35,000 - ₹50,000 a month",
    type: "Part-time",
    level: "Mid Level",
    category: "Marketing",
    logo: "N",
    workplaceType: "Remote",
  },
  {
    id: 19,
    title: "Python Developer",
    company: "Persistent Systems",
    location: "Indore",
    salary: "₹7 LPA - ₹13 LPA",
    type: "Full-time",
    level: "Senior Level",
    category: "Development",
    logo: "P",
    workplaceType: "On-site",
  },
  {
    id: 20,
    title: "Recruiter",
    company: "TeamLease",
    location: "Mumbai",
    salary: "₹30,000 - ₹45,000 a month",
    type: "Part-time",
    level: "Mid Level",
    category: "HR",
    logo: "T",
    workplaceType: "On-site",
  },
  {
    id: 21,
    title: "QA Engineer",
    company: "LTIMindtree",
    location: "Kolkata",
    salary: "₹5 LPA - ₹9 LPA",
    type: "Contract",
    level: "Mid Level",
    category: "Development",
    logo: "L",
    workplaceType: "Hybrid",
  },
  {
    id: 22,
    title: "Business Analyst",
    company: "ICICI Bank",
    location: "Mumbai",
    salary: "₹6 LPA - ₹11 LPA",
    type: "Internship",
    level: "Mid Level",
    category: "Business",
    logo: "I",
    workplaceType: "On-site",
  },
  {
    id: 23,
    title: "Copywriter",
    company: "Hindustan Times",
    location: "Delhi",
    salary: "₹25,000 - ₹38,000 a month",
    type: "Part-time",
    level: "Entry Level",
    category: "Marketing",
    logo: "H",
    workplaceType: "Hybrid",
  },
  {
    id: 24,
    title: "Cloud Engineer",
    company: "Reliance Jio",
    location: "Mumbai",
    salary: "₹9 LPA - ₹16 LPA",
    type: "Full-time",
    level: "Senior Level",
    category: "Development",
    logo: "J",
    workplaceType: "Hybrid",
  },
  {
    id: 25,
    title: "Customer Success Manager",
    company: "Freshworks",
    location: "Bengaluru",
    salary: "₹7 LPA - ₹12 LPA",
    type: "Full-time",
    level: "Mid Level",
    category: "Customer Support",
    logo: "F",
    workplaceType: "On-site",
  },
  {
    id: 26,
    title: "Mobile App Developer",
    company: "PhonePe",
    location: "Bengaluru",
    salary: "₹8 LPA - ₹15 LPA",
    type: "Contract",
    level: "Senior Level",
    category: "Development",
    logo: "P",
    workplaceType: "Hybrid",
  },
  {
    id: 27,
    title: "Brand Designer",
    company: "Meesho",
    location: "Bengaluru",
    salary: "₹45,000 - ₹60,000 a month",
    type: "Part-time",
    level: "Mid Level",
    category: "Design",
    logo: "M",
    workplaceType: "Remote",
  },
  {
    id: 28,
    title: "Financial Analyst",
    company: "HDFC Bank",
    location: "Bhopal",
    salary: "₹5 LPA - ₹9 LPA",
    type: "Freelance",
    level: "Mid Level",
    category: "Finance",
    logo: "H",
    workplaceType: "Remote",
  },
  {
    id: 29,
    title: "Technical Writer",
    company: "IndiaMART",
    location: "Noida",
    salary: "₹30,000 - ₹45,000 a month",
    type: "Freelance",
    level: "Entry Level",
    category: "Writing",
    logo: "I",
    workplaceType: "On-site",
  },
  {
    id: 30,
    title: "AI Research Intern",
    company: "Tata Consultancy Services",
    location: "Kolkata",
    salary: "₹15,000 - ₹25,000 a month",
    type: "Internship",
    level: "Entry Level",
    category: "Data Science",
    logo: "T",
    workplaceType: "On-site",
  },
];

const parseSalaryToMonthly = (salaryStr) => {
  if (!salaryStr) return 0;
  const cleanStr = salaryStr.replace(/,/g, "");
  const numbers = cleanStr.match(/\d+/g);
  if (!numbers || numbers.length === 0) return 0;
  const firstNum = parseInt(numbers[0], 10);
  if (salaryStr.toUpperCase().includes("LPA")) {
    return Math.round((firstNum * 100000) / 12);
  }
  return firstNum;
};

function App() {
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  // Navigation View State ('jobs' | 'companies' | 'guide' | 'about')
  const [activeTab, setActiveTab] = useState("jobs");

  // Top Search Inputs
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("All Types");
  const [expLevel, setExpLevel] = useState("All Levels");
  const [location, setLocation] = useState("All Locations");

  // Sidebar Filter States
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedExpLevels, setSelectedExpLevels] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState(200000);

  // Sorting State
  const [sortBy, setSortBy] = useState("Newest First");

  // Applied Filters State (Search button trigger)
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    jobType: "All Types",
    expLevel: "All Levels",
    location: "All Locations",
    selectedJobTypes: [],
    selectedExpLevels: [],
    selectedCategories: [],
    selectedSalary: 200000,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 15;
  const [savedJobs, setSavedJobs] = useState([]);

  const handleToggleSave = (jobId) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const toggleArrayFilter = (setter, value) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleSearch = () => {
    setActiveTab("jobs");
    setAppliedFilters({
      search,
      jobType,
      expLevel,
      location,
      selectedJobTypes,
      selectedExpLevels,
      selectedCategories,
      selectedSalary,
    });
    setCurrentPage(1);
  };

  const handlePopularSearch = (term) => {
    setActiveTab("jobs");
    setSearch(term);
    setAppliedFilters((prev) => ({ ...prev, search: term }));
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSearch("");
    setJobType("All Types");
    setExpLevel("All Levels");
    setLocation("All Locations");
    setSelectedJobTypes([]);
    setSelectedExpLevels([]);
    setSelectedCategories([]);
    setSelectedSalary(200000);
    setAppliedFilters({
      search: "",
      jobType: "All Types",
      expLevel: "All Levels",
      location: "All Locations",
      selectedJobTypes: [],
      selectedExpLevels: [],
      selectedCategories: [],
      selectedSalary: 200000,
    });
    setCurrentPage(1);
  };

  // Filter Engine
  const filteredJobs = jobs.filter((job) => {
    const searchText = appliedFilters.search.toLowerCase().trim();
    const normalize = (str) => str?.toLowerCase().replace(/[\s-]/g, "") || "";

    const matchesSearch =
      !searchText ||
      job.title?.toLowerCase().includes(searchText) ||
      job.company?.toLowerCase().includes(searchText) ||
      job.category?.toLowerCase().includes(searchText);

    const matchesHeroType =
      appliedFilters.jobType === "All Types" ||
      normalize(job.type) === normalize(appliedFilters.jobType);
    const matchesSidebarType =
      !appliedFilters.selectedJobTypes ||
      appliedFilters.selectedJobTypes.length === 0 ||
      appliedFilters.selectedJobTypes.includes(job.type);

    const matchesHeroExp =
      appliedFilters.expLevel === "All Levels" ||
      normalize(job.level) === normalize(appliedFilters.expLevel);
    const matchesSidebarExp =
      !appliedFilters.selectedExpLevels ||
      appliedFilters.selectedExpLevels.length === 0 ||
      appliedFilters.selectedExpLevels.includes(job.level);

    const matchesLoc =
      appliedFilters.location === "All Locations" ||
      job.location?.toLowerCase().includes(appliedFilters.location.toLowerCase());

    const matchesCategory =
      !appliedFilters.selectedCategories ||
      appliedFilters.selectedCategories.length === 0 ||
      appliedFilters.selectedCategories.includes(job.category);

    const jobMonthlySalary = parseSalaryToMonthly(job.salary);
    const matchesSalary =
      !appliedFilters.selectedSalary ||
      appliedFilters.selectedSalary >= 200000 ||
      jobMonthlySalary <= appliedFilters.selectedSalary;

    return (
      matchesSearch &&
      matchesHeroType &&
      matchesSidebarType &&
      matchesHeroExp &&
      matchesSidebarExp &&
      matchesLoc &&
      matchesCategory &&
      matchesSalary
    );
  });

  // Sort Engine
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "Salary: High to Low") {
      return parseSalaryToMonthly(b.salary) - parseSalaryToMonthly(a.salary);
    }
    if (sortBy === "Salary: Low to High") {
      return parseSalaryToMonthly(a.salary) - parseSalaryToMonthly(b.salary);
    }
    return b.id - a.id;
  });

  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = sortedJobs.slice(startIndex, startIndex + jobsPerPage);

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!user) {
    return <LoginPage onLoginSuccess={(userData) => setUser(userData)} />;
  }

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="brand" onClick={() => { setActiveTab("jobs"); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ cursor: "pointer" }}>
          <span className="brand-icon">💼</span>
          <span>
            <span className="brand-blue">Jobs</span>
          </span>
        </div>

        {/* 5 Distinct Clickable Nav Buttons */}
        <nav className="nav-links">
          <button
            type="button"
            className={`nav-item-btn ${activeTab === "jobs" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("jobs");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Home
          </button>
          <button
            type="button"
            className="nav-item-btn"
            onClick={() => {
              setActiveTab("jobs");
              setTimeout(() => {
                document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" });
              }, 50);
            }}
          >
            Browse Jobs
          </button>
          <button
            type="button"
            className={`nav-item-btn ${activeTab === "companies" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("companies");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Companies
          </button>
          <button
            type="button"
            className={`nav-item-btn ${activeTab === "guide" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("guide");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Job Guide
          </button>
          <button
            type="button"
            className={`nav-item-btn ${activeTab === "about" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("about");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            About Us
          </button>
        </nav>

        <div className="nav-actions">
          <button type="button" className="theme-button">☾</button>
          <button type="button" className="post-job-button">Post a Job</button>
          <div className="profile-wrapper" style={{ position: "relative" }}>
            <button
              type="button"
              className="profile-button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              👤
            </button>

            {/* क्लिक करने पर खुलने वाला मेनू */}
            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="dropdown-user-info">
                  <div className="dropdown-avatar">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <h4>{user?.name || "User Name"}</h4>
                    <p>{user?.email || "user@example.com"}</p>
                  </div>
                </div>
                <hr className="dropdown-divider" />
                <button
                  type="button"
                  className="dropdown-logout-btn"
                  onClick={() => {
                    setUser(null);
                    setShowProfileMenu(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* VIEW 1: HOME & BROWSE JOBS VIEW */}
      {activeTab === "jobs" && (
        <>
          {/* HERO / SEARCH */}
          <section className="hero">
            <div className="hero-inner">
              <h1>Find Your Dream Job</h1>
              <p>Search from thousands of Job opportunities.</p>

              <div className="search-panel">
                <div className="search-field keyword-field">
                  <label>Job Title, Keywords, or Company</label>
                  <input
                    type="text"
                    placeholder="e.g. Frontend Developer"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="search-field">
                  <label>Job Type</label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                  >
                    <option value="All Types">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div className="search-field">
                  <label>Experience Level</label>
                  <select
                    value={expLevel}
                    onChange={(e) => setExpLevel(e.target.value)}
                  >
                    <option value="All Levels">All Levels</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior Level">Senior Level</option>
                  </select>
                </div>

                <div className="search-field">
                  <label>Location</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="All Locations">All Locations</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bhopal">Bhopal</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Bhubaneswar">Bhubaneswar</option>
                    <option value="Noida">Noida</option>
                    <option value="Indore">Indore</option>
                  </select>
                </div>

                <button type="button" className="search-button" onClick={handleSearch}>
                  🔍 Search Jobs
                </button>
              </div>

              <div className="popular-searches">
                <span>Popular:</span>
                <button type="button" onClick={() => handlePopularSearch("Developer")}>
                  Developer
                </button>
                <button type="button" onClick={() => handlePopularSearch("Designer")}>
                  Designers
                </button>
                <button type="button" onClick={() => handlePopularSearch("Marketing")}>
                  Marketing
                </button>
                <button type="button" onClick={() => handlePopularSearch("Customer Support")}>
                  Customer Support
                </button>
                <button type="button" onClick={() => handlePopularSearch("Data Science")}>
                  Data Science
                </button>
              </div>
            </div>
          </section>

          {/* MAIN CONTENT */}
          <main className="main-content" id="jobs">
            {/* SIDEBAR */}
            <aside className="sidebar">
              <div className="filter-header">
                <h3>Filters</h3>
                <button type="button" onClick={handleClear}>Clear</button>
              </div>

              {/* 1. Job Type */}
              <div className="filter-group">
                <h4>Job Type</h4>
                {["Full-time", "Part-time", "Contract", "Freelance", "Internship"].map((type) => (
                  <label key={type}>
                    <input
                      type="checkbox"
                      checked={selectedJobTypes.includes(type)}
                      onChange={() => toggleArrayFilter(setSelectedJobTypes, type)}
                    />
                    {type}
                  </label>
                ))}
              </div>

              {/* 2. Experience Level */}
              <div className="filter-group">
                <h4>Experience Level</h4>
                {["Entry Level", "Mid Level", "Senior Level"].map((level) => (
                  <label key={level}>
                    <input
                      type="checkbox"
                      checked={selectedExpLevels.includes(level)}
                      onChange={() => toggleArrayFilter(setSelectedExpLevels, level)}
                    />
                    {level}
                  </label>
                ))}
              </div>

              {/* 3. Salary Range */}
              <div className="filter-group">
                <h4>Salary Range</h4>
                <div className="salary-values">
                  <span>₹15,000</span>
                  <span>₹2,00,000+</span>
                </div>

                <input
                  className="salary-range"
                  type="range"
                  min="15000"
                  max="200000"
                  step="5000"
                  value={selectedSalary}
                  onChange={(e) => setSelectedSalary(Number(e.target.value))}
                />
                <div
                  style={{
                    marginTop: "4px",
                    fontWeight: "600",
                    color: "#2563eb",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                >
                  selected: ₹{selectedSalary.toLocaleString("en-IN")}
                </div>
              </div>

              {/* 4. Categories */}
              <div className="filter-group">
                <h4>Categories</h4>
                {[
                  "Development",
                  "Design",
                  "Marketing",
                  "Data Science",
                  "Customer Support",
                ].map((cat) => (
                  <label key={cat}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleArrayFilter(setSelectedCategories, cat)}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </aside>

            {/* JOB LIST */}
            <section className="jobs-section">
              <div className="jobs-topbar">
                <p>
                  Showing{" "}
                  <strong>
                    {sortedJobs.length === 0 ? 0 : startIndex + 1}
                  </strong>
                  -
                  <strong>
                    {Math.min(
                      startIndex + jobsPerPage,
                      sortedJobs.length
                    )}
                  </strong>{" "}
                  of <strong>{sortedJobs.length}</strong> jobs
                </p>

                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="Newest First">Sort by: Newest First</option>
                  <option value="Salary: High to Low">Salary: High to Low</option>
                  <option value="Salary: Low to High">Salary: Low to High</option>
                </select>
              </div>

              {currentJobs.length > 0 ? (
                currentJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={savedJobs.includes(job.id)}
                    onToggleSave={() => handleToggleSave(job.id)}
                  />
                ))
              ) : (
                <div className="no-results">
                  <h2>No jobs found</h2>
                  <p>Try another keyword or search term.</p>
                </div>
              )}

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    type="button"
                    className="pagination-button"
                    disabled={currentPage === 1}
                    onClick={() => changePage(currentPage - 1)}
                  >
                    ← Previous
                  </button>

                  <div className="page-numbers">
                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map((page) => (
                      <button
                        key={page}
                        type="button"
                        className={
                          currentPage === page
                            ? "page-number active"
                            : "page-number"
                        }
                        onClick={() => changePage(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="pagination-button"
                    disabled={currentPage === totalPages}
                    onClick={() => changePage(currentPage + 1)}
                  >
                    Next →
                  </button>
                </div>
              )}
            </section>
          </main>
        </>
      )}

      {/* VIEW 2: COMPANIES VIEW */}
      {activeTab === "companies" && (
        <section className="extra-page">
          <h2>Hiring Companies ({jobs.length})</h2>
          <p>Explore all companies and active listings available on this portal.</p>

          <div className="companies-grid">
            {jobs.map((job) => (
              <div key={job.id} className="company-card">
                <span className="company-badge">{job.category}</span>
                <h3>{job.company}</h3>
                <p>💼 {job.title}</p>
                <p>📍 {job.location} ({job.workplaceType})</p>
                <span className="open-count">1 Active Opening • {job.type}</span>
              </div>
            ))}
          </div>

          <button type="button" className="search-button" onClick={() => setActiveTab("jobs")}>
            ← Back to Job Search
          </button>
        </section>
      )}

      {/* VIEW 3: JOB GUIDE VIEW */}
      {activeTab === "guide" && (
        <section className="extra-page">
          <h2>Career & Job Seeker Guide</h2>
          <p>Step-by-step practical advice to crack technical rounds and land developer roles.</p>

          <div className="guide-list">
            <div className="guide-card">
              <h3>📄 1. ATS-Friendly Resume Building</h3>
              <p>Use single-column layouts, emphasize live project links, quantify impact, and list matching core tech stacks.</p>
            </div>

            <div className="guide-card">
              <h3>💻 2. Technical & Coding Prep</h3>
              <p>Master Data Structures, JavaScript fundamentals (Event Loop, Async/Await), React component lifecycle, and state management.</p>
            </div>

            <div className="guide-card">
              <h3>🌐 3. Mastering Remote Collaboration</h3>
              <p>Build strong async communication habits, document workflows clearly, and get familiar with Git branch management.</p>
            </div>

            <div className="guide-card">
              <h3>🚀 4. GitHub & Project Showcasing</h3>
              <p>Deploy full-stack projects with live demo URLs, write clean README documentation, and maintain regular commit histories.</p>
            </div>

            <div className="guide-card">
              <h3>🤝 5. Cold Outreach & Networking</h3>
              <p>Connect with hiring managers on LinkedIn. Share concise notes highlighting your core skills and project demo links.</p>
            </div>

            <div className="guide-card">
              <h3>💰 6. Salary Negotiation & Offers</h3>
              <p>Research market standards for freshers and mid-level roles, and evaluate learning curves before accepting offers.</p>
            </div>
          </div>

          <button type="button" className="search-button" onClick={() => setActiveTab("jobs")}>
            ← Back to Job Search
          </button>
        </section>
      )}

      {/* VIEW 4: ABOUT US VIEW */}
      {activeTab === "about" && (
        <section className="extra-page">
          <h2>About RemoteJobs Portal</h2>
          <p>
            A modern job discovery web application built to help job seekers find verified developer, design, and tech opportunities across top Indian tech hubs.
          </p>

          <div className="about-stats">
            <div className="stat-box">
              <h3>30</h3>
              <p>Curated Job Openings</p>
            </div>
            <div className="stat-box">
              <h3>8+</h3>
              <p>Tech Domains Covered</p>
            </div>
            <div className="stat-box">
              <h3>10+</h3>
              <p>Major Hiring Cities</p>
            </div>
          </div>

          <div style={{ textAlign: "left", maxWidth: "800px", margin: "0 auto 24px auto", color: "#4b5563", lineHeight: "1.6" }}>
            <p><strong>Key Highlights:</strong></p>
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li>⚡ Real-time multi-filter engine (Job type, Experience, Salary range, and Category).</li>
              <li>💼 Transparent salary breakdowns with flexible location filters.</li>
              <li>💾 Interactive bookmarking and save-job support for fast tracking.</li>
            </ul>
          </div>

          <button type="button" className="search-button" onClick={() => setActiveTab("jobs")}>
            ← Back to Job Search
          </button>
        </section>
      )}

      {/* VIEW 5: CONTACT US VIEW */}
      {activeTab === "contact" && (
        <section className="extra-page">
          <h2>Contact Support & Inquiries</h2>
          <p>Have questions, feedback, or want to post a job? Reach out to us directly.</p>

          <div style={{ maxWidth: "600px", margin: "0 auto 24px auto", textAlign: "left" }}>
            <div className="guide-card" style={{ marginBottom: "16px" }}>
              <h3>📍 Location & Coordinates</h3>
              <p><strong>HQ:</strong> Darbhanga / Bihar , India</p>
              <p><strong>Email:</strong> adilmishbah5@gmail.com</p>
              <p><strong>Phone:</strong> +91 6203465990</p>
              <p><strong>Working Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM IST</p>
            </div>

            <div className="guide-card">
              <h3>💬 Send Us a Message</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                  <input type="text" placeholder="Your Name" required style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #d1d5db" }} />
                  <input type="email" placeholder="Your Email" required style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #d1d5db" }} />
                  <textarea rows="4" placeholder="How can we help you?" required style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #d1d5db" }}></textarea>
                  <button type="submit" className="search-button" style={{ alignSelf: "flex-start", marginTop: "6px" }}>
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          <button type="button" className="search-button" onClick={() => setActiveTab("jobs")}>
            ← Back to Job Search
          </button>
        </section>
      )}

      {/* VIEW 6: PRIVACY POLICY VIEW */}
      {activeTab === "privacy" && (
        <section className="extra-page" style={{ textAlign: "left", maxWidth: "850px" }}>
          <h2 style={{ textAlign: "center" }}>Privacy Policy</h2>
          <p style={{ textAlign: "center" }}>Last Updated: August 2026</p>

          <div style={{ color: "#374151", lineHeight: "1.7", fontSize: "14px" }}>
            <h3 style={{ color: "#111827", marginTop: "16px" }}>1. Information We Collect</h3>
            <p>We respect your privacy. This portal does not store sensitive personal information without your explicit action. Basic session preferences and search queries are processed locally in your browser.</p>

            <h3 style={{ color: "#111827", marginTop: "16px" }}>2. Use of Job Data</h3>
            <p>All job listings displayed on RemoteJobs are indexed from verified public sources or direct employer submissions for open tech roles.</p>

            <h3 style={{ color: "#111827", marginTop: "16px" }}>3. Bookmarks & Local Storage</h3>
            <p>Saved jobs and customized filter states are held within client-side memory to provide a seamless browsing experience without requiring mandatory account registration.</p>

            <h3 style={{ color: "#111827", marginTop: "16px" }}>4. Third-Party Links</h3>
            <p>When applying to external career links or company sites, their respective privacy policies and tracking terms will apply.</p>
          </div>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <button type="button" className="search-button" onClick={() => setActiveTab("jobs")}>
              ← Back to Job Search
            </button>
          </div>
        </section>
      )}

      {/* VIEW 7: TERMS OF SERVICE VIEW */}
      {activeTab === "terms" && (
        <section className="extra-page" style={{ textAlign: "left", maxWidth: "850px" }}>
          <h2 style={{ textAlign: "center" }}>Terms of Service</h2>
          <p style={{ textAlign: "center" }}>Effective: 2026</p>

          <div style={{ color: "#374151", lineHeight: "1.7", fontSize: "14px" }}>
            <h3 style={{ color: "#111827", marginTop: "16px" }}>1. Platform Usage</h3>
            <p>RemoteJobs provides a curated interface to explore developer, design, and analytics roles. Users agree to use this directory for lawful job discovery purposes only.</p>

            <h3 style={{ color: "#111827", marginTop: "16px" }}>2. Accuracy of Listings</h3>
            <p>While we verify salary ranges and company details, candidates are encouraged to perform standard due diligence before attending external interview rounds.</p>

            <h3 style={{ color: "#111827", marginTop: "16px" }}>3. No Placement Guarantees</h3>
            <p>RemoteJobs serves as an indexing and showcase portal; interview scheduling and hiring decisions remain solely at the discretion of the recruiting organizations.</p>
          </div>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <button type="button" className="search-button" onClick={() => setActiveTab("jobs")}>
              ← Back to Job Search
            </button>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="brand" onClick={() => { setActiveTab("jobs"); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ cursor: "pointer" }}>
              <span className="brand-icon">💼</span>
              <span>
                Dream<span className="brand-blue">Jobs</span>
              </span>
            </div>

            <p>
              Find your next Job opportunity and build the career you want
              from anywhere.
            </p>

            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/adil-mishbah-b803ab2b"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>

              <a
                href="https://github.com/AdilMishbah"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>For Job Seekers</h4>
            <a href="#jobs" onClick={() => { setActiveTab("jobs"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Browse Jobs</a>
            <a href="#guide" onClick={() => { setActiveTab("guide"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Jobs Work Guide</a>
            <a href="#about" onClick={() => { setActiveTab("about"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Career Advice</a>
          </div>

          <div className="footer-column">
            <h4>For Employers</h4>
            <a href="#companies" onClick={() => { setActiveTab("companies"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Company Directory</a>
            <a href="#jobs" onClick={() => { setActiveTab("jobs"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Pricing & Plans</a>
            <a href="#guide" onClick={() => { setActiveTab("guide"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Hiring Guide</a>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <a href="#about" onClick={() => { setActiveTab("about"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>About Us</a>
            <a href="#contact" onClick={() => { setActiveTab("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Contact</a>
            <a href="#privacy" onClick={() => { setActiveTab("privacy"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Privacy Policy</a>
            <a href="#terms" onClick={() => { setActiveTab("terms"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Terms of Service</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 RemoteJobs. All rights reserved.</p>

          <div>
            <a href="#privacy" onClick={() => { setActiveTab("privacy"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Privacy Policy</a>
            <a href="#terms" onClick={() => { setActiveTab("terms"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Terms</a>
            <a href="#contact" onClick={() => { setActiveTab("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Contact</a>
          </div>
        </div>

      </footer>
    </div>
  );
}

export default App;