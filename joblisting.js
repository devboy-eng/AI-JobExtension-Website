// Job Listing Page JavaScript
// This file handles job data display, search, and pagination

// Configuration
const JOBS_PER_PAGE = 20;
let currentPage = 1;
let filteredJobs = [];

// Mock Data - Replace this with API call when backend is ready
const jobs = [
    {
        id: 1,
        company: "Google",
        role: "Senior Software Engineer",
        location: "Bangalore, India",
        type: "Full-time",
        description: "We are looking for a Senior Software Engineer to join our Cloud Platform team. You will be responsible for designing and implementing scalable distributed systems. Requirements include 5+ years of experience with Java, Python, or Go, and experience with cloud technologies like GCP, AWS, or Azure.",
        postedDate: "2026-01-15"
    },
    {
        id: 2,
        company: "Microsoft",
        role: "Product Manager",
        location: "Hyderabad, India",
        type: "Full-time",
        description: "Join Microsoft as a Product Manager for Azure DevOps. You will define product roadmap, work with engineering teams, and drive product strategy. Looking for candidates with 3+ years of PM experience and strong technical background.",
        postedDate: "2026-01-14"
    },
    {
        id: 3,
        company: "Amazon",
        role: "Frontend Developer",
        location: "Chennai, India",
        type: "Full-time",
        description: "Amazon is hiring Frontend Developers for our retail team. Build responsive web applications using React, TypeScript, and modern CSS. Must have experience with state management, testing frameworks, and performance optimization.",
        postedDate: "2026-01-14"
    },
    {
        id: 4,
        company: "Flipkart",
        role: "Data Scientist",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Looking for Data Scientists to work on recommendation systems and personalization. Experience with Python, ML frameworks (TensorFlow, PyTorch), and big data technologies required. PhD preferred but not mandatory.",
        postedDate: "2026-01-13"
    },
    {
        id: 5,
        company: "Swiggy",
        role: "Backend Engineer",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Build scalable microservices for India's leading food delivery platform. Tech stack includes Java, Spring Boot, Kafka, and PostgreSQL. Experience with high-throughput systems preferred.",
        postedDate: "2026-01-13"
    },
    {
        id: 6,
        company: "Razorpay",
        role: "DevOps Engineer",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Join our infrastructure team to build and maintain payment processing systems. Experience with Kubernetes, Docker, Terraform, and AWS required. Knowledge of security best practices is a plus.",
        postedDate: "2026-01-12"
    },
    {
        id: 7,
        company: "Zomato",
        role: "Mobile Developer (Android)",
        location: "Gurgaon, India",
        type: "Full-time",
        description: "Develop and maintain the Zomato Android app used by millions. Proficiency in Kotlin, Android SDK, and modern architecture patterns (MVVM, Clean Architecture) required.",
        postedDate: "2026-01-12"
    },
    {
        id: 8,
        company: "PhonePe",
        role: "Security Engineer",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Protect India's leading digital payments platform. Responsibilities include vulnerability assessment, security audits, and implementing security controls. CISSP or CEH certification preferred.",
        postedDate: "2026-01-11"
    },
    {
        id: 9,
        company: "Paytm",
        role: "Full Stack Developer",
        location: "Noida, India",
        type: "Full-time",
        description: "Build end-to-end features for Paytm's financial services. Tech stack: React, Node.js, MongoDB, and AWS. 2-4 years of experience required.",
        postedDate: "2026-01-11"
    },
    {
        id: 10,
        company: "Infosys",
        role: "Technical Lead",
        location: "Pune, India",
        type: "Full-time",
        description: "Lead a team of 8-10 developers on enterprise projects for global clients. Strong experience in Java/J2EE, microservices architecture, and agile methodologies required.",
        postedDate: "2026-01-10"
    },
    {
        id: 11,
        company: "TCS",
        role: "Cloud Architect",
        location: "Mumbai, India",
        type: "Full-time",
        description: "Design cloud solutions for enterprise clients. AWS/Azure/GCP certification required. Experience with migration strategies, cost optimization, and hybrid cloud setups preferred.",
        postedDate: "2026-01-10"
    },
    {
        id: 12,
        company: "Wipro",
        role: "QA Automation Engineer",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Build and maintain test automation frameworks. Experience with Selenium, Cypress, or Playwright required. Knowledge of CI/CD pipelines and API testing is a plus.",
        postedDate: "2026-01-09"
    },
    {
        id: 13,
        company: "Freshworks",
        role: "Site Reliability Engineer",
        location: "Chennai, India",
        type: "Full-time",
        description: "Ensure 99.99% uptime for SaaS products. Experience with monitoring tools (Prometheus, Grafana), incident management, and automation scripting required.",
        postedDate: "2026-01-09"
    },
    {
        id: 14,
        company: "Zoho",
        role: "UI/UX Designer",
        location: "Chennai, India",
        type: "Full-time",
        description: "Design intuitive interfaces for enterprise software. Proficiency in Figma, Adobe XD, and design systems required. Portfolio showcasing B2B SaaS designs preferred.",
        postedDate: "2026-01-08"
    },
    {
        id: 15,
        company: "Ola",
        role: "Machine Learning Engineer",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Build ML models for demand prediction, pricing, and route optimization. Experience with Python, TensorFlow, and real-time ML systems required.",
        postedDate: "2026-01-08"
    },
    {
        id: 16,
        company: "Myntra",
        role: "React Native Developer",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Develop cross-platform mobile features for fashion e-commerce. Experience with React Native, Redux, and native module integration required.",
        postedDate: "2026-01-07"
    },
    {
        id: 17,
        company: "CRED",
        role: "iOS Developer",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Build premium iOS experiences for CRED app. Swift, UIKit, and SwiftUI expertise required. Experience with complex animations and performance optimization preferred.",
        postedDate: "2026-01-07"
    },
    {
        id: 18,
        company: "Meesho",
        role: "Database Administrator",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Manage and optimize databases for high-scale e-commerce platform. Experience with MySQL, PostgreSQL, and NoSQL databases required. Performance tuning expertise needed.",
        postedDate: "2026-01-06"
    },
    {
        id: 19,
        company: "Dream11",
        role: "Golang Developer",
        location: "Mumbai, India",
        type: "Full-time",
        description: "Build high-performance backend systems for fantasy sports platform. Strong Go programming skills and experience with concurrent systems required.",
        postedDate: "2026-01-06"
    },
    {
        id: 20,
        company: "Unacademy",
        role: "Video Streaming Engineer",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Build and optimize live video streaming infrastructure. Experience with WebRTC, HLS, and CDN optimization required. Knowledge of video encoding and latency optimization preferred.",
        postedDate: "2026-01-05"
    },
    {
        id: 21,
        company: "Byju's",
        role: "Python Developer",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Develop backend services for ed-tech platform. Experience with Django/Flask, REST APIs, and PostgreSQL required. Background in education technology is a plus.",
        postedDate: "2026-01-05"
    },
    {
        id: 22,
        company: "Groww",
        role: "Blockchain Developer",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Build decentralized finance solutions. Experience with Solidity, Web3.js, and Ethereum required. Knowledge of DeFi protocols and smart contract security preferred.",
        postedDate: "2026-01-04"
    },
    {
        id: 23,
        company: "Zerodha",
        role: "System Programmer",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Build low-latency trading systems. Experience with C/C++, Linux internals, and network programming required. Understanding of financial markets is a plus.",
        postedDate: "2026-01-04"
    },
    {
        id: 24,
        company: "Juspay",
        role: "Haskell Developer",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Build payment processing systems using functional programming. Experience with Haskell, PureScript, or similar languages required. Strong type theory knowledge preferred.",
        postedDate: "2026-01-03"
    },
    {
        id: 25,
        company: "Postman",
        role: "API Developer Advocate",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Evangelize API development best practices. Create tutorials, documentation, and developer content. Strong communication skills and API expertise required.",
        postedDate: "2026-01-03"
    },
    {
        id: 26,
        company: "Atlassian",
        role: "Engineering Manager",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Lead engineering teams building collaboration tools. 8+ years of experience with 3+ years in management. Strong technical background and people skills required.",
        postedDate: "2026-01-02"
    },
    {
        id: 27,
        company: "Adobe",
        role: "Computer Vision Engineer",
        location: "Noida, India",
        type: "Full-time",
        description: "Build AI-powered creative tools. Experience with OpenCV, deep learning for image processing, and generative models required. PhD preferred.",
        postedDate: "2026-01-02"
    },
    {
        id: 28,
        company: "Intel",
        role: "Firmware Engineer",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Develop firmware for next-generation processors. Experience with C, assembly language, and hardware-software interaction required. Knowledge of UEFI/BIOS preferred.",
        postedDate: "2026-01-01"
    },
    {
        id: 29,
        company: "Nvidia",
        role: "CUDA Developer",
        location: "Pune, India",
        type: "Full-time",
        description: "Optimize deep learning frameworks for GPU. Experience with CUDA, C++, and parallel programming required. Background in HPC or ML frameworks preferred.",
        postedDate: "2026-01-01"
    },
    {
        id: 30,
        company: "Uber",
        role: "Platform Engineer",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Build and maintain internal developer platforms. Experience with Kubernetes, service mesh, and developer tooling required. Strong systems design skills needed.",
        postedDate: "2025-12-31"
    },
    {
        id: 31,
        company: "Salesforce",
        role: "Apex Developer",
        location: "Hyderabad, India",
        type: "Full-time",
        description: "Customize Salesforce platform for enterprise clients. Salesforce certification and experience with Apex, Lightning components required.",
        postedDate: "2025-12-31"
    },
    {
        id: 32,
        company: "Oracle",
        role: "Java Developer",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Develop enterprise Java applications. Experience with Java 17+, Spring Framework, and Oracle DB required. Knowledge of cloud-native development preferred.",
        postedDate: "2025-12-30"
    },
    {
        id: 33,
        company: "SAP",
        role: "ABAP Developer",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Develop custom SAP solutions. Experience with ABAP, SAP HANA, and Fiori required. S/4HANA experience preferred.",
        postedDate: "2025-12-30"
    },
    {
        id: 34,
        company: "Cisco",
        role: "Network Engineer",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Design and implement enterprise network solutions. CCNP/CCIE certification required. Experience with SD-WAN and network automation preferred.",
        postedDate: "2025-12-29"
    },
    {
        id: 35,
        company: "VMware",
        role: "Virtualization Engineer",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Build next-generation virtualization solutions. Experience with ESXi, vSphere, and NSX required. Strong systems programming skills needed.",
        postedDate: "2025-12-29"
    },
    {
        id: 36,
        company: "Red Hat",
        role: "Linux Kernel Developer",
        location: "Pune, India",
        type: "Full-time",
        description: "Contribute to Linux kernel development. Deep knowledge of C, kernel internals, and device drivers required. Open source contribution history preferred.",
        postedDate: "2025-12-28"
    },
    {
        id: 37,
        company: "MongoDB",
        role: "Database Engineer",
        location: "Gurgaon, India",
        type: "Full-time",
        description: "Build distributed database systems. Experience with C++, distributed systems, and database internals required. Knowledge of consensus algorithms preferred.",
        postedDate: "2025-12-28"
    },
    {
        id: 38,
        company: "Elastic",
        role: "Search Engineer",
        location: "Bangalore, India",
        type: "Remote",
        description: "Build and optimize search solutions. Experience with Elasticsearch, Lucene, and distributed systems required. Information retrieval background preferred.",
        postedDate: "2025-12-27"
    },
    {
        id: 39,
        company: "Snowflake",
        role: "Data Engineer",
        location: "Gurgaon, India",
        type: "Full-time",
        description: "Build data pipelines and analytics solutions. Experience with SQL, Python, and cloud data warehouses required. DBT and Airflow experience preferred.",
        postedDate: "2025-12-27"
    },
    {
        id: 40,
        company: "Databricks",
        role: "Solutions Architect",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Design data and AI solutions for enterprise clients. Experience with Spark, Delta Lake, and ML workflows required. Strong consulting skills needed.",
        postedDate: "2025-12-26"
    },
    {
        id: 41,
        company: "Stripe",
        role: "Payment Systems Engineer",
        location: "Bangalore, India",
        type: "Full-time",
        description: "Build global payment infrastructure. Experience with distributed systems, Ruby/Go, and financial systems required. PCI-DSS knowledge preferred.",
        postedDate: "2025-12-26"
    },
    {
        id: 42,
        company: "Shopify",
        role: "Ruby on Rails Developer",
        location: "Bangalore, India",
        type: "Remote",
        description: "Build e-commerce platform features. Strong Ruby on Rails, JavaScript, and MySQL experience required. Experience with high-scale systems preferred.",
        postedDate: "2025-12-25"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    filteredJobs = [...jobs];
    renderJobs();
    setupEventListeners();
    setupModalListeners();
});

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    // Search on button click
    searchBtn.addEventListener('click', handleSearch);

    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Mobile menu toggle
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// Setup modal and notification listeners
function setupModalListeners() {
    const modal = document.getElementById('jobModal');
    const notification = document.getElementById('notificationPopup');

    // Close modal on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close notification on overlay click
    notification.addEventListener('click', function(e) {
        if (e.target === notification) {
            closeNotification();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (notification.classList.contains('active')) {
                closeNotification();
            } else if (modal.classList.contains('active')) {
                closeModal();
            }
        }
    });
}

// Handle search
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

    if (searchTerm === '') {
        filteredJobs = [...jobs];
    } else {
        filteredJobs = jobs.filter(job =>
            job.company.toLowerCase().includes(searchTerm) ||
            job.role.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm) ||
            job.location.toLowerCase().includes(searchTerm)
        );
    }

    currentPage = 1;
    renderJobs();
}

// Render jobs to the grid
function renderJobs() {
    const jobsGrid = document.getElementById('jobsGrid');
    const resultsCount = document.getElementById('resultsCount');

    // Calculate pagination
    const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
    const endIndex = startIndex + JOBS_PER_PAGE;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

    // Update results count
    if (filteredJobs.length === 0) {
        resultsCount.textContent = 'No jobs found';
    } else {
        const showingEnd = Math.min(endIndex, filteredJobs.length);
        resultsCount.textContent = `Showing ${startIndex + 1}-${showingEnd} of ${filteredJobs.length} jobs`;
    }

    // Render jobs or empty state
    if (paginatedJobs.length === 0) {
        jobsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No jobs found</h3>
                <p>Try adjusting your search terms</p>
            </div>
        `;
    } else {
        jobsGrid.innerHTML = paginatedJobs.map(job => createJobCard(job)).join('');
    }

    // Render pagination
    renderPagination(totalPages);
}

// Create job card HTML
function createJobCard(job) {
    const companyInitial = job.company.charAt(0).toUpperCase();
    const formattedDate = formatDate(job.postedDate);

    return `
        <div class="job-card">
            <div class="job-card-header">
                <div class="company-logo">${companyInitial}</div>
                <div class="job-card-title">
                    <h3>${escapeHtml(job.role)}</h3>
                    <span class="company-name">${escapeHtml(job.company)}</span>
                </div>
            </div>
            <div class="job-card-meta">
                <span><i class="fas fa-map-marker-alt"></i> ${escapeHtml(job.location)}</span>
                <span><i class="fas fa-briefcase"></i> ${escapeHtml(job.type)}</span>
            </div>
            <p class="job-description">${escapeHtml(job.description)}</p>
            <div class="job-card-footer">
                <span class="job-date">Posted ${formattedDate}</span>
                <button class="view-job-btn" onclick="viewJobDetails(${job.id})">View Details</button>
            </div>
        </div>
    `;
}

// Render pagination
function renderPagination(totalPages) {
    const pagination = document.getElementById('pagination');

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    // Previous button
    paginationHTML += `
        <button onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;

    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
        paginationHTML += `<button onclick="goToPage(1)">1</button>`;
        if (startPage > 2) {
            paginationHTML += `<span class="page-info">...</span>`;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button onclick="goToPage(${i})" class="${i === currentPage ? 'active' : ''}">${i}</button>
        `;
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<span class="page-info">...</span>`;
        }
        paginationHTML += `<button onclick="goToPage(${totalPages})">${totalPages}</button>`;
    }

    // Next button
    paginationHTML += `
        <button onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

    pagination.innerHTML = paginationHTML;
}

// Go to specific page
function goToPage(page) {
    const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    renderJobs();

    // Scroll to top of job listings
    document.querySelector('.joblisting-section').scrollIntoView({ behavior: 'smooth' });
}

// View job details in modal
function viewJobDetails(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        // Populate modal with job data
        document.getElementById('modalLogo').textContent = job.company.charAt(0).toUpperCase();
        document.getElementById('modalRole').textContent = job.role;
        document.getElementById('modalCompany').textContent = job.company;
        document.getElementById('modalLocation').textContent = job.location;
        document.getElementById('modalType').textContent = job.type;
        document.getElementById('modalDate').textContent = formatDate(job.postedDate);
        document.getElementById('modalDescription').textContent = job.description;

        // Store current job ID for apply action
        document.getElementById('jobModal').dataset.jobId = jobId;

        // Show modal
        openModal();
    }
}

// Open modal
function openModal() {
    const modal = document.getElementById('jobModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('jobModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Apply with KUPOSU AI
function applyWithKuposu() {
    const modal = document.getElementById('jobModal');
    const jobId = modal.dataset.jobId;
    const job = jobs.find(j => j.id === parseInt(jobId));

    if (job) {
        // Update notification popup with job info
        document.getElementById('notifRole').textContent = job.role;
        document.getElementById('notifCompany').textContent = job.company;

        // Close job modal and show notification
        closeModal();
        setTimeout(() => {
            openNotification();
        }, 300);
    }
}

// Open notification popup
function openNotification() {
    const notification = document.getElementById('notificationPopup');
    notification.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close notification popup
function closeNotification() {
    const notification = document.getElementById('notificationPopup');
    notification.classList.remove('active');
    document.body.style.overflow = '';
}

// Utility: Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Utility: Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
