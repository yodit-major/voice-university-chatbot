
// ==========================================
// LOGOUT
// ==========================================

const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("adminToken");
        window.location.href = "admin-login.html";
    });
}


// ==========================================
// API CONFIGURATION
// ==========================================

const API_URL = "/api/auth/login";
const OFFERING_API_URL = "/api/auth/login";

let courses = [];
let selectedCourseId = null;

let offerings = [];
let selectedDeleteType = "course";

const addCourseButton = document.getElementById("addCourseButton");
const courseTableBody = document.getElementById("courseTableBody");
const courseSearch = document.getElementById("courseSearch");

const courseModal = document.getElementById("courseModal");
const courseForm = document.getElementById("courseForm");
const deleteModal = document.getElementById("deleteModal");

const saveCourseButton = document.getElementById("saveCourseButton");
const confirmDeleteButton = document.getElementById("confirmDelete");


// ==========================================
// API HEADERS
// ==========================================

function getHeaders() {
    const headers = {
        "Content-Type": "application/json"
    };

    const token = localStorage.getItem("adminToken");

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
}

const offeringTableBody = document.getElementById("offeringTableBody");
const offeringSearch = document.getElementById("offeringSearch");

const offeringModal = document.getElementById("offeringModal");
const offeringForm = document.getElementById("offeringForm");
const saveOfferingButton = document.getElementById("saveOfferingButton");

const offeringCourseSelect = document.getElementById("offeringCourse");

async function loadCourseOfferings() {
    offeringTableBody.innerHTML = `
        <tr><td colspan="6" style="text-align:center;">
            Loading offerings...
        </td></tr>
    `;

    try {
        const response = await fetch(OFFERING_API_URL, {
            headers: getHeaders()
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to load offerings.");
        }

        if (!Array.isArray(data)) {
            throw new Error("The offerings API did not return a list.");
        }

        offerings = data;
        renderCourseOfferings();
    } catch (error) {
        console.error("Load offerings error:", error);

        offeringTableBody.innerHTML = `
            <tr><td colspan="6" style="text-align:center;">
                Could not load offerings. Check the backend.
            </td></tr>
        `;
    }
}

function renderCourseOfferings() {
    const searchTerm = offeringSearch.value.trim().toLowerCase();

    const filtered = offerings.filter(offering =>
        [
            offering.offering_id,
            offering.course_id,
            offering.course_code,
            offering.course_name,
            offering.academic_year,
            offering.semester,
            offering.year_level
        ].join(" ").toLowerCase().includes(searchTerm)
    );

    if (filtered.length === 0) {
        offeringTableBody.innerHTML = `
            <tr><td colspan="6" style="text-align:center;">
                No course offerings found.
            </td></tr>
        `;
        return;
    }

    offeringTableBody.innerHTML = filtered.map(offering => `
        <tr>
            <td>${escapeHTML(offering.offering_id)}</td>
            <td>${escapeHTML(
                offering.course_name || offering.course_code || offering.course_id
            )}</td>
            <td>${escapeHTML(offering.academic_year)}</td>
            <td>${escapeHTML(offering.semester)}</td>
            <td>${escapeHTML(offering.year_level ?? "—")}</td>
            <td>
                <button type="button" class="table-action"
                    data-offering-action="edit"
                    data-id="${escapeHTML(offering.offering_id)}">
                    Edit
                </button>
                <button type="button" class="table-action delete"
                    data-offering-action="delete"
                    data-id="${escapeHTML(offering.offering_id)}">
                    Delete
                </button>
            </td>
        </tr>
    `).join("");
}

function populateOfferingCourses(selectedId = "") {
    offeringCourseSelect.innerHTML = `
        <option value="">Select a course</option>
        ${courses.map(course => `
            <option value="${escapeHTML(course.course_id)}"
                ${String(course.course_id) === String(selectedId) ? "selected" : ""}>
                ${escapeHTML(course.course_code)} - ${escapeHTML(course.course_name)}
            </option>
        `).join("")}
    `;
}

function openAddOfferingModal() {
    offeringForm.reset();
    document.getElementById("offeringId").value = "";

    populateOfferingCourses();

    document.getElementById("offeringModalTitle").textContent =
        "Add Course Offering";
    document.getElementById("offeringModalDescription").textContent =
        "Enter the course offering information.";
    document.getElementById("offeringFormMessage").textContent = "";

    saveOfferingButton.textContent = "Save Offering";
    saveOfferingButton.disabled = false;
    offeringModal.hidden = false;
}

function openEditOfferingModal(offering) {
    offeringForm.reset();

    document.getElementById("offeringId").value = offering.offering_id;
    populateOfferingCourses(offering.course_id);

    document.getElementById("offeringAcademicYear").value =
        offering.academic_year || "";

    document.getElementById("offeringSemester").value =
        offering.semester || "";

    document.getElementById("offeringYearLevel").value =
        offering.year_level ?? "";

    document.getElementById("offeringModalTitle").textContent =
        "Edit Course Offering";
    document.getElementById("offeringModalDescription").textContent =
        "Update the offering information.";
    document.getElementById("offeringFormMessage").textContent = "";

    saveOfferingButton.textContent = "Save Changes";
    saveOfferingButton.disabled = false;
    offeringModal.hidden = false;
}

function closeOfferingModal() {
    offeringModal.hidden = true;
    offeringForm.reset();
    document.getElementById("offeringFormMessage").textContent = "";
}

offeringForm.addEventListener("submit", async event => {
    event.preventDefault();

    const offeringId = document.getElementById("offeringId").value;
    const courseId = offeringCourseSelect.value;
    const academicYear =
        document.getElementById("offeringAcademicYear").value.trim();
    const semester =
        document.getElementById("offeringSemester").value;
    const yearLevelValue =
        document.getElementById("offeringYearLevel").value.trim();

    const message = document.getElementById("offeringFormMessage");

    const payload = {
        course_id: Number(courseId),
        academic_year: academicYear,
        semester,
        year_level: yearLevelValue ? Number(yearLevelValue) : null
    };

    if (!courseId || !academicYear || !semester) {
        message.textContent =
            "Please select a course and enter the academic year and semester.";
        return;
    }

    if (
        yearLevelValue &&
        (!Number.isInteger(payload.year_level) || payload.year_level < 1)
    ) {
        message.textContent = "Year level must be a positive whole number.";
        return;
    }

    saveOfferingButton.disabled = true;
    saveOfferingButton.textContent = "Saving...";
    message.textContent = "";

    try {
        const response = await fetch(
            offeringId
                ? `${OFFERING_API_URL}/${encodeURIComponent(offeringId)}`
                : OFFERING_API_URL,
            {
                method: offeringId ? "PUT" : "POST",
                headers: getHeaders(),
                body: JSON.stringify(payload)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to save offering.");
        }

        closeOfferingModal();
        await loadCourseOfferings();
    } catch (error) {
        console.error("Save offering error:", error);
        message.textContent = error.message;
    } finally {
        saveOfferingButton.disabled = false;
        saveOfferingButton.textContent = "Save Offering";
    }
});

offeringTableBody.addEventListener("click", event => {
    const button = event.target.closest("button[data-offering-action]");
    if (!button) return;

    const offering = offerings.find(
        item => String(item.offering_id) === button.dataset.id
    );

    if (!offering) return;

    if (button.dataset.offeringAction === "edit") {
        openEditOfferingModal(offering);
    }

    if (button.dataset.offeringAction === "delete") {
        selectedDeleteType = "offering";
        selectedCourseId = offering.offering_id;

        document.getElementById("deleteModalTitle").textContent =
            "Delete Course Offering?";

        document.getElementById("deleteModalDescription").textContent =
            `Delete the offering for ${offering.course_name || offering.course_code}, ${offering.academic_year}, ${offering.semester}?`;

        document.getElementById("deleteFormMessage").textContent = "";
        confirmDeleteButton.disabled = false;
        confirmDeleteButton.textContent = "Yes, Delete";
        deleteModal.hidden = false;
    }
});

offeringSearch.addEventListener("input", renderCourseOfferings);

document.getElementById("closeOfferingModal")
    .addEventListener("click", closeOfferingModal);

document.getElementById("cancelOfferingModal")
    .addEventListener("click", closeOfferingModal);

offeringModal.addEventListener("click", event => {
    if (event.target === offeringModal) closeOfferingModal();
});

// ==========================================
// SAFE HTML DISPLAY
// ==========================================

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}


// ==========================================
// LOAD COURSES FROM BACKEND
// ==========================================

async function loadCourses() {
    courseTableBody.innerHTML = `
        <tr>
            <td colspan="7" style="text-align:center;">
                Loading courses...
            </td>
        </tr>
    `;

    try {
        const response = await fetch(API_URL, {
            headers: getHeaders()
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to load courses.");
        }

        if (!Array.isArray(data)) {
            throw new Error("The courses API did not return a list.");
        }

        courses = data;
        renderCourses();

    } catch (error) {
        console.error("Load courses error:", error);

        courseTableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
                    Could not load courses. Check your backend and database connection.
                </td>
            </tr>
        `;
    }
}


// ==========================================
// RENDER COURSES
// ==========================================

function renderCourses() {
    const searchTerm = courseSearch.value.trim().toLowerCase();

    const filteredCourses = courses.filter(course => {
        const searchableText = [
            course.course_id,
            course.course_code,
            course.course_name,
            course.department_name,
            course.department_id,
            course.program_name,
            course.program_id,
            course.credit_hours
        ].join(" ").toLowerCase();

        return searchableText.includes(searchTerm);
    });

    if (filteredCourses.length === 0) {
        courseTableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
                    No courses found.
                </td>
            </tr>
        `;
        return;
    }

    courseTableBody.innerHTML = filteredCourses.map(course => `
        <tr>
            <td>${escapeHTML(course.course_id)}</td>
            <td>${escapeHTML(course.course_code)}</td>
            <td>${escapeHTML(course.course_name)}</td>
            <td>${escapeHTML(course.department_name || course.department_id)}</td>
            <td>${escapeHTML(course.program_name || course.program_id || "—")}</td>
            <td>${escapeHTML(course.credit_hours ?? "—")}</td>
            <td>
                <button
                    type="button"
                    class="table-action"
                    data-action="edit"
                    data-id="${escapeHTML(course.course_id)}">
                    Edit
                </button>

                <button
                    type="button"
                    class="table-action delete"
                    data-action="delete"
                    data-id="${escapeHTML(course.course_id)}">
                    Delete
                </button>
            </td>
        </tr>
    `).join("");
}


// ==========================================
// OPEN ADD COURSE MODAL
// ==========================================

function openAddModal() {
    courseForm.reset();

    document.getElementById("courseId").value = "";

    document.getElementById("courseModalTitle").textContent = "Add Course";

    document.getElementById("courseModalDescription").textContent =
        "Enter the course information below.";

    document.getElementById("courseFormMessage").textContent = "";

    saveCourseButton.textContent = "Save Course";
    saveCourseButton.disabled = false;

    courseModal.hidden = false;

    document.getElementById("courseCode").focus();
}


// ==========================================
// OPEN EDIT COURSE MODAL
// ==========================================

function openEditModal(course) {
    courseForm.reset();

    document.getElementById("courseId").value = course.course_id;
    document.getElementById("courseCode").value = course.course_code ?? "";
    document.getElementById("courseName").value = course.course_name ?? "";

    document.getElementById("courseDepartment").value =
        course.department_id ?? "";

    document.getElementById("courseProgram").value =
        course.program_id ?? "";

    document.getElementById("courseCredits").value =
        course.credit_hours ?? "";

    document.getElementById("courseDescription").value =
        course.description ?? "";

    document.getElementById("coursePrerequisites").value =
        course.prerequisites ?? "";

    document.getElementById("courseModalTitle").textContent = "Edit Course";

    document.getElementById("courseModalDescription").textContent =
        "Update the course information below.";

    document.getElementById("courseFormMessage").textContent = "";

    saveCourseButton.textContent = "Save Changes";
    saveCourseButton.disabled = false;

    courseModal.hidden = false;

    document.getElementById("courseCode").focus();
}


// ==========================================
// CLOSE COURSE MODAL
// ==========================================

function closeCourseModal() {
    courseModal.hidden = true;
    courseForm.reset();

    document.getElementById("courseFormMessage").textContent = "";
}


// ==========================================
// ADD OR UPDATE COURSE
// ==========================================

courseForm.addEventListener("submit", async event => {
    event.preventDefault();

    const courseId = document.getElementById("courseId").value;

    const departmentValue =
        document.getElementById("courseDepartment").value.trim();

    const programValue =
        document.getElementById("courseProgram").value.trim();

    const creditsValue =
        document.getElementById("courseCredits").value.trim();

    const payload = {
        course_code: document.getElementById("courseCode").value.trim(),
        course_name: document.getElementById("courseName").value.trim(),
        department_id: Number(departmentValue),
        program_id: programValue ? Number(programValue) : null,
        credit_hours: creditsValue ? Number(creditsValue) : null,
        description:
            document.getElementById("courseDescription").value.trim() || null,
        prerequisites:
            document.getElementById("coursePrerequisites").value.trim() || null
    };

    const message = document.getElementById("courseFormMessage");

    if (
        !payload.course_code ||
        !payload.course_name ||
        !departmentValue ||
        !Number.isInteger(payload.department_id) ||
        payload.department_id < 1
    ) {
        message.textContent =
            "Enter a course code, course name, and valid Department ID.";
        return;
    }

    if (
        programValue &&
        (!Number.isInteger(payload.program_id) || payload.program_id < 1)
    ) {
        message.textContent = "Enter a valid Program ID.";
        return;
    }

    if (
        creditsValue &&
        (!Number.isInteger(payload.credit_hours) || payload.credit_hours < 0)
    ) {
        message.textContent = "Credit hours must be a non-negative whole number.";
        return;
    }

    saveCourseButton.disabled = true;
    saveCourseButton.textContent = "Saving...";
    message.textContent = "";

    try {
        const url = courseId
            ? `${API_URL}/${encodeURIComponent(courseId)}`
            : API_URL;

        const response = await fetch(url, {
            method: courseId ? "PUT" : "POST",
            headers: getHeaders(),
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to save course.");
        }

        closeCourseModal();
        await loadCourses();

    } catch (error) {
        console.error("Save course error:", error);
        message.textContent = error.message;

    } finally {
        saveCourseButton.disabled = false;

        saveCourseButton.textContent =
            document.getElementById("courseId").value
                ? "Save Changes"
                : "Save Course";
    }
});


// ==========================================
// OPEN DELETE CONFIRMATION MODAL
// ==========================================

function openDeleteModal(course) {
    selectedDeleteType = "course";
    selectedCourseId = course.course_id;

    document.getElementById("deleteModalTitle").textContent =
        `Delete ${course.course_code}?`;

    document.getElementById("deleteModalDescription").textContent =
        `Are you sure you want to delete "${course.course_name}"? This action cannot be undone.`;

    document.getElementById("deleteFormMessage").textContent = "";

    confirmDeleteButton.disabled = false;
    confirmDeleteButton.textContent = "Yes, Delete";

    deleteModal.hidden = false;
}


// ==========================================
// CLOSE DELETE MODAL
// ==========================================

function closeDeleteModal() {
    deleteModal.hidden = true;
    selectedCourseId = null;

    document.getElementById("deleteFormMessage").textContent = "";
}


// ==========================================
// CONFIRM DELETE COURSE
// ==========================================


confirmDeleteButton.addEventListener("click", async () => {
    if (selectedCourseId === null) return;

    const message = document.getElementById("deleteFormMessage");
    const isOffering = selectedDeleteType === "offering";

    const endpoint = isOffering
        ? OFFERING_API_URL
        : API_URL;

    confirmDeleteButton.disabled = true;
    confirmDeleteButton.textContent = "Deleting...";
    message.textContent = "";

    try {
        const response = await fetch(
            `${endpoint}/${encodeURIComponent(selectedCourseId)}`,
            {
                method: "DELETE",
                headers: getHeaders()
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to delete item.");
        }

        closeDeleteModal();

        if (isOffering) {
            await loadCourseOfferings();
        } else {
            await loadCourses();
        }
    } catch (error) {
        console.error("Delete error:", error);
        message.textContent = error.message;
    } finally {
        confirmDeleteButton.disabled = false;
        confirmDeleteButton.textContent = "Yes, Delete";
    }
});


// ==========================================
// COURSE TABLE EDIT AND DELETE BUTTONS
// ==========================================

courseTableBody.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const course = courses.find(
        item => String(item.course_id) === button.dataset.id
    );

    if (!course) return;

    if (button.dataset.action === "edit") {
        openEditModal(course);
    }

    if (button.dataset.action === "delete") {
        openDeleteModal(course);
    }
});


// ==========================================
// MODAL CLOSE BUTTONS
// ==========================================

document.getElementById("closeCourseModal")
    .addEventListener("click", closeCourseModal);

document.getElementById("cancelCourseModal")
    .addEventListener("click", closeCourseModal);

document.getElementById("cancelDelete")
    .addEventListener("click", closeDeleteModal);

courseModal.addEventListener("click", event => {
    if (event.target === courseModal) {
        closeCourseModal();
    }
});

deleteModal.addEventListener("click", event => {
    if (event.target === deleteModal) {
        closeDeleteModal();
    }
});


// ==========================================
// SEARCH COURSES
// ==========================================

courseSearch.addEventListener("input", renderCourses);


// ==========================================
// TABS
// ==========================================

const tabs = document.querySelectorAll(".management-tab");
const tabContents = document.querySelectorAll(".tab-content");

const addButtonLabels = {
    courses: "Add Course",
    offerings: "Add Offering",
    sections: "Add Section",
    instructors: "Add Instructor",
    schedule: "Add Schedule"
};

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const target = tab.dataset.tab;

        tabs.forEach(item => {
            item.classList.remove("active");
            item.setAttribute("aria-selected", "false");
        });

        tabContents.forEach(content => {
            content.classList.remove("active");
        });

        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");

        const targetContent = document.getElementById(target);

        if (targetContent) {
            targetContent.classList.add("active");
        }

        addCourseButton.querySelector("span").textContent =
            addButtonLabels[target] || "Add Item";
        if (target === "offerings") {
    loadCourseOfferings();
}
    });
});


// ==========================================
// ADD BUTTON
// ==========================================


addCourseButton.addEventListener("click", () => {
    const activeTab = document.querySelector(".management-tab.active");
    if (!activeTab) return;

    if (activeTab.dataset.tab === "courses") {
        openAddModal();
    } else if (activeTab.dataset.tab === "offerings") {
        populateOfferingCourses();
        openAddOfferingModal();
    } else {
        const names = {
            sections: "Course Section",
            instructors: "Instructor",
            schedule: "Weekly Schedule"
        };

        const name = names[activeTab.dataset.tab];
        if (name) {
            console.info(`${name} management is not implemented yet.`);
        }
    }
});


// ==========================================
// INITIALIZE
// ==========================================

loadCourses();
loadCourseOfferings();
if (window.lucide) {
    window.lucide.createIcons();
}

