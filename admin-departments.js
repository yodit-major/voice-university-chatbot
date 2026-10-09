
const API_URL = "http://localhost:3000/api";
const tableBody = document.getElementById("departmentTableBody");
const addButton = document.getElementById("addDepartmentButton");
const searchInput = document.getElementById("departmentSearch");

let departments = [];

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function getAdminHeaders() {
    const token = localStorage.getItem("adminToken");

    if (!token) {
        alert("Please log in as an admin first.");
        window.location.href = "admin-login.html";
        return null;
    }

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };
}

// Load departments from the database
async function loadDepartments() {
    tableBody.innerHTML =
        '<tr><td colspan="7">Loading departments...</td></tr>';

    try {
        const response = await fetch(`${API_URL}/departments`);

        if (!response.ok) {
            throw new Error("Could not load departments.");
        }

        departments = await response.json();
        renderDepartments(departments);
    } catch (error) {
        console.error(error);
        tableBody.innerHTML =
            '<tr><td colspan="7">Failed to load departments. Check that your backend is running.</td></tr>';
    }
}

// Display departments in the table
function renderDepartments(data) {
    if (!data.length) {
        tableBody.innerHTML =
            '<tr><td colspan="7">No departments found.</td></tr>';
        return;
    }

    tableBody.innerHTML = data.map(department => {
        const id = Number(department.department_id);

        return `
            <tr>
                <td>${id}</td>
                <td>${escapeHTML(department.department_name)}</td>
                <td>${escapeHTML(department.university_name ?? department.university_id ?? "—")}</td>
                <td>${escapeHTML(department.campus_name ?? department.campus_id ?? "—")}</td>
                <td>${escapeHTML(department.head_name ?? "—")}</td>
                <td>${escapeHTML(department.contact_phone ?? department.contact_email ?? "—")}</td>
                <td>
                    <button type="button" class="edit-button" data-id="${id}">
                        Edit
                    </button>
                    <button type="button" class="delete-button" data-id="${id}">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    }).join("");
}

// Add a department
addButton.addEventListener("click", async () => {
    const departmentName = prompt("Enter department name:");
    if (departmentName === null) return;

    if (!departmentName.trim()) {
        alert("Department name is required.");
        return;
    }

    const description = prompt("Enter department description:");
    if (description === null) return;

    if (!description.trim()) {
        alert("Department description is required.");
        return;
    }

    const headers = getAdminHeaders();
    if (!headers) return;

    try {
        const response = await fetch(`${API_URL}/department`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                department_name: departmentName.trim(),
                description: description.trim()
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to add department.");
        }

        alert("Department added successfully!");
        await loadDepartments();
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});

// Handle Edit and Delete buttons
tableBody.addEventListener("click", async event => {
    const editButton = event.target.closest(".edit-button");
    const deleteButton = event.target.closest(".delete-button");

    if (editButton) {
        const id = Number(editButton.dataset.id);
        const department = departments.find(
            item => Number(item.department_id) === id
        );

        if (!department) return;

        const departmentName = prompt(
            "Edit department name:",
            department.department_name
        );

        if (departmentName === null) return;

        if (!departmentName.trim()) {
            alert("Department name is required.");
            return;
        }

        const description = prompt(
            "Edit department description:",
            department.description ?? ""
        );

        if (description === null) return;

        if (!description.trim()) {
            alert("Department description is required.");
            return;
        }

        const headers = getAdminHeaders();
        if (!headers) return;

        try {
            const response = await fetch(`${API_URL}/department/${id}`, {
                method: "PUT",
                headers,
                body: JSON.stringify({
                    department_name: departmentName.trim(),
                    description: description.trim()
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to update department.");
            }

            alert("Department updated successfully!");
            await loadDepartments();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    if (deleteButton) {
        const id = Number(deleteButton.dataset.id);
        const confirmed = confirm(
            "Are you sure you want to delete this department?"
        );

        if (!confirmed) return;

        const headers = getAdminHeaders();
        if (!headers) return;

        try {
            const response = await fetch(`${API_URL}/department/${id}`, {
                method: "DELETE",
                headers
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to delete department.");
            }

            alert("Department deleted successfully!");
            await loadDepartments();
        } catch (error) {
            console.error(error);
            alert(
                error.message +
                "\n\nIf this department has related programs or courses, the database may prevent its deletion."
            );
        }
    }
});

// Search departments
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    const filtered = departments.filter(department =>
        String(department.department_name ?? "")
            .toLowerCase()
            .includes(searchTerm)
    );

    renderDepartments(filtered);
});

// Load data when the page opens
loadDepartments();