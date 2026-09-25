// ----------------------------------------
// SUPABASE CONNECTION
// ----------------------------------------

const SUPABASE_URL =
    "https://djoestsummensgfjdkyd.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_-q5zomIHZzBXT3wuRVvgbw_8tN7A89E";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ========================================
// COURSE DYNAMIC FIELDS
// ========================================

const course = document.getElementById("course");


if (course) {

    const levelContainer =
        document.getElementById("level-container");

    const sessionContainer =
        document.getElementById("session-container");

    const boardContainer =
        document.getElementById("board-container");

    const universityContainer =
        document.getElementById("university-container");


    const level =
        document.getElementById("level");

    const session =
        document.getElementById("session");

    const board =
        document.getElementById("board");

    const university =
        document.getElementById("university");


    levelContainer.style.display = "none";
    sessionContainer.style.display = "none";
    boardContainer.style.display = "none";
    universityContainer.style.display = "none";


    course.addEventListener("change", function () {

        const selectedCourse = course.value;


        // ----------------------------------------
        // RESET EVERYTHING
        // ----------------------------------------

        levelContainer.style.display = "none";
        sessionContainer.style.display = "none";
        boardContainer.style.display = "none";
        universityContainer.style.display = "none";


        level.value = "";
        session.value = "";
        board.value = "";
        university.value = "";


        // Restore February / March

        const febMarch =
            session.querySelector(
                'option[value="feb-march"]'
            );


        if (febMarch) {
            febMarch.disabled = false;
        }


        // ----------------------------------------
        // IGCSE & GCSE MATHEMATICS
        // ----------------------------------------

        if (
            selectedCourse ===
            "igcse-gcse-maths"
        ) {

            sessionContainer.style.display = "block";

            boardContainer.style.display = "block";

        }


        // ----------------------------------------
        // IGCSE ADDITIONAL MATHEMATICS
        // ----------------------------------------

        else if (
            selectedCourse ===
            "igcse-additional"
        ) {

            sessionContainer.style.display = "block";

            boardContainer.style.display = "block";

        }


        // ----------------------------------------
        // IGCSE & GCSE MATHEMATICS (US)
        // ----------------------------------------

        else if (
            selectedCourse ===
            "igcse-gcse-us"
        ) {

            sessionContainer.style.display = "block";

        }


        // ----------------------------------------
        // A LEVEL MATHEMATICS
        // ----------------------------------------

        else if (
            selectedCourse ===
            "a-level-maths"
        ) {

            levelContainer.style.display = "block";

            sessionContainer.style.display = "block";

            boardContainer.style.display = "block";

        }


        // ----------------------------------------
        // A LEVEL FURTHER MATHEMATICS
        // ----------------------------------------

        else if (
            selectedCourse ===
            "a-level-further"
        ) {

            levelContainer.style.display = "block";

            sessionContainer.style.display = "block";

            boardContainer.style.display = "block";

        }


        // ----------------------------------------
        // IB MATHEMATICS
        // ----------------------------------------

        else if (
            selectedCourse ===
            "ib-maths"
        ) {

            sessionContainer.style.display = "block";


            if (febMarch) {
                febMarch.disabled = true;
            }

        }


        // ----------------------------------------
        // UNIVERSITY MATHEMATICS
        // ----------------------------------------

        else if (
            selectedCourse ===
            "university-maths"
        ) {

            universityContainer.style.display = "block";

        }


        // ----------------------------------------
        // SAT / AP
        // ----------------------------------------

        else if (
            selectedCourse === "sat-maths" ||
            selectedCourse === "ap-maths"
        ) {

            // Nothing appears

        }

    });

}


// ========================================
// APPLICATION FORM + SUPABASE
// ========================================

const applicationForm =
    document.getElementById(
        "application-form"
    );


if (applicationForm) {

    applicationForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            if (!window.supabase) {

                alert(
                    "Supabase has not loaded. Please check your internet connection and try again."
                );

                console.error(
                    "Supabase JavaScript library was not loaded."
                );

                return;
            }


            // ----------------------------------------
            // GET FORM DATA
            // ----------------------------------------

            const name =
                document.getElementById(
                    "name"
                ).value;

            const email =
                document.getElementById(
                    "email"
                ).value;

            const age =
                document.getElementById(
                    "age"
                ).value;

            const selectedCourse =
                document.getElementById(
                    "course"
                ).value;

            const level =
                document.getElementById(
                    "level"
                ).value;

            const session =
                document.getElementById(
                    "session"
                ).value;

            const board =
                document.getElementById(
                    "board"
                ).value;

            const university =
                document.getElementById(
                    "university"
                ).value;

            const grade =
                document.getElementById(
                    "grade"
                ).value;

            const message =
                document.getElementById(
                    "message"
                ).value;


            // ----------------------------------------
            // SEND TO SUPABASE
            // ----------------------------------------

            const { error } =
                await supabaseClient
                    .from("applications")
                    .insert([
                        {
                            name: name,
                            email: email,
                            age: age,
                            course: selectedCourse,
                            level: level,
                            session: session,
                            board: board,
                            university: university,
                            grade: grade,
                            message: message
                        }
                    ]);


            if (error) {

                console.error(
                    "Supabase error:",
                    error
                );

                alert(
                    "Something went wrong. Your application was not submitted."
                );

                return;
            }


            alert(
                "Application submitted successfully!"
            );


            applicationForm.reset();


            if (course) {

                document
                    .getElementById(
                        "level-container"
                    )
                    .style.display = "none";

                document
                    .getElementById(
                        "session-container"
                    )
                    .style.display = "none";

                document
                    .getElementById(
                        "board-container"
                    )
                    .style.display = "none";

                document
                    .getElementById(
                        "university-container"
                    )
                    .style.display = "none";

            }

        }
    );

}


// ========================================
// TEACHER DASHBOARD
// ========================================

const applicationsContainer =
    document.getElementById(
        "applications-container"
    );


if (applicationsContainer) {

    loadApplications();

}


// ========================================
// APPLICATION DETAILS PAGE
// ========================================

const applicationDetails =
    document.getElementById(
        "application-details"
    );


if (applicationDetails) {

    loadApplicationDetails();

}


async function loadApplications() {

    // ----------------------------------------
    // CHECK TEACHER LOGIN
    // ----------------------------------------

    const { data: sessionData } =
        await supabaseClient.auth.getSession();


    if (!sessionData.session) {

        window.location.replace("login.html");

        return;
    }


    // ----------------------------------------
    // GET APPLICATIONS
    // ----------------------------------------

    const { data, error } =
        await supabaseClient
            .from("applications")
            .select("*")
            .order("created_at", {
                ascending: false
            });


    // ----------------------------------------
    // CHECK FOR ERROR
    // ----------------------------------------

    if (error) {

        console.error(
            "Supabase error:",
            error
        );

        applicationsContainer.innerHTML =
            "<p>Could not load applications.</p>";

        return;
    }


    // ----------------------------------------
    // STATISTICS
    // ----------------------------------------

    const totalApplications =
        document.getElementById(
            "total-applications"
        );


    if (totalApplications) {

        totalApplications.textContent =
            data.length;

    }


    let pendingCount = 0;
    let contactedCount = 0;
    let acceptedCount = 0;
    let rejectedCount = 0;


    data.forEach(function (application) {

        const status =
            application.status || "Pending";


        if (status === "Pending") {

            pendingCount++;

        }

        else if (status === "Contacted") {

            contactedCount++;

        }

        else if (status === "Accepted") {

            acceptedCount++;

        }

        else if (status === "Rejected") {

            rejectedCount++;

        }

    });


    document.getElementById(
        "pending-applications"
    ).textContent = pendingCount;


    document.getElementById(
        "contacted-applications"
    ).textContent = contactedCount;


    document.getElementById(
        "accepted-applications"
    ).textContent = acceptedCount;


    document.getElementById(
        "rejected-applications"
    ).textContent = rejectedCount;


    // ----------------------------------------
    // NO APPLICATIONS
    // ----------------------------------------

    if (!data || data.length === 0) {

        applicationsContainer.innerHTML =
            "<p>No applications yet.</p>";

        return;
    }


    // ----------------------------------------
    // DISPLAY APPLICATIONS
    // ----------------------------------------

    applicationsContainer.innerHTML = "";


    data.forEach(function (application) {

        const card =
            document.createElement("div");


        card.className =
            "application-card";


        card.innerHTML = `

            <div class="application-header">

                <div>

                    <h3>
                        ${application.name}
                    </h3>

                    <p>
                        ${application.course}
                    </p>

                </div>


                <span class="application-status">

                    ${application.status || "Pending"}

                </span>

            </div>


            <div class="application-summary">

                <p>
                    <strong>Email:</strong>
                    ${application.email}
                </p>

                <p>
                    <strong>Age:</strong>
                    ${application.age}
                </p>

                <p>
                    <strong>Level:</strong>
                    ${application.level || "N/A"}
                </p>

                <p>
                    <strong>Session:</strong>
                    ${application.session || "N/A"}
                </p>

                <p>
                    <strong>Board:</strong>
                    ${application.board || "N/A"}
                </p>

            </div>


            <button
                class="view-application"
                onclick="viewApplication('${application.id}')"
            >
                View Application
            </button>


            <button
                class="delete-application"
                onclick="deleteApplication('${application.id}')"
            >
                Delete Application
            </button>

        `;


        applicationsContainer.appendChild(card);

    });

}


// ========================================
// OPEN APPLICATION
// ========================================

function viewApplication(id) {

    window.location.href =
        "application.html?id=" + id;

}


// ========================================
// APPLICATION DETAILS
// ========================================

async function loadApplicationDetails() {

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const applicationId =
        urlParams.get("id");


    if (!applicationId) {

        applicationDetails.innerHTML =
            "<p>No application was selected.</p>";

        return;
    }


    const { data, error } =
        await supabaseClient
            .from("applications")
            .select("*")
            .eq("id", applicationId)
            .single();


    if (error) {

        console.error(
            "Supabase error:",
            error
        );

        applicationDetails.innerHTML =
            "<p>Could not load this application.</p>";

        return;
    }

    // ----------------------------------------
    // STUDENT ACCOUNT
    // ----------------------------------------

    const studentAccountSection =
        document.getElementById(
            "student-account-section"
        );

    const studentAccountStatus =
        document.getElementById(
            "student-account-status"
        );

    const createStudentAccountButton =
        document.getElementById(
            "create-student-account"
        );


    if (
        studentAccountSection &&
        studentAccountStatus &&
        createStudentAccountButton
    ) {

        if (data.status === "Accepted") {

            studentAccountSection.style.display =
                "block";


            if (data.student_user_id) {

                studentAccountStatus.textContent =
                    "A student account has already been created.";

                createStudentAccountButton.style.display =
                    "none";

            } else {

                studentAccountStatus.textContent =
                    "This student has been accepted and is ready for an account.";

                createStudentAccountButton.style.display =
                    "block";

            }

        } else {

            studentAccountSection.style.display =
                "none";

        }

    }


    applicationDetails.innerHTML = `

        <div class="application-detail">

            <strong>Full Name</strong>

            <input
                type="text"
                id="edit-name"
                value="${data.name}"
            >

        </div>


        <div class="application-detail">

            <strong>Email</strong>

            <input
                type="email"
                id="edit-email"
                value="${data.email}"
            >

        </div>


        <div class="application-detail">

            <strong>Age</strong>

            <input
                type="number"
                id="edit-age"
                value="${data.age}"
            >

        </div>


        <div class="application-detail">

            <strong>Course</strong>

            <input
                type="text"
                id="edit-course"
                value="${data.course}"
            >

        </div>


        <div class="application-detail">

            <strong>Level</strong>

            <input
                type="text"
                id="edit-level"
                value="${data.level || ""}"
            >

        </div>


        <div class="application-detail">

            <strong>Examination Session</strong>

            <input
                type="text"
                id="edit-session"
                value="${data.session || ""}"
            >

        </div>


        <div class="application-detail">

            <strong>Examination Board</strong>

            <input
                type="text"
                id="edit-board"
                value="${data.board || ""}"
            >

        </div>


        <div class="application-detail">

            <strong>University</strong>

            <input
                type="text"
                id="edit-university"
                value="${data.university || ""}"
            >

        </div>


        <div class="application-detail">

            <strong>Current Grade / Level</strong>

            <input
                type="text"
                id="edit-grade"
                value="${data.grade || ""}"
            >

        </div>


        <div class="application-detail">

            <strong>Message</strong>

            <textarea id="edit-message">${data.message || ""}</textarea>

        </div>


        <div class="application-detail">

            <strong>Status</strong>

            <span>${data.status || "Pending"}</span>

        </div>


        <button id="save-application">
            Save Changes
        </button>

    `;


    // ----------------------------------------
    // LOAD STATUS
    // ----------------------------------------

    const statusSelect =
        document.getElementById(
            "status"
        );


    if (statusSelect) {

        statusSelect.value =
            data.status || "Pending";

    }


    // ----------------------------------------
    // LOAD TEACHER NOTES
    // ----------------------------------------

    const teacherNotes =
        document.getElementById(
            "teacher-notes"
        );


    if (teacherNotes) {

        teacherNotes.value =
            data.teacher_notes || "";

    }


    // ----------------------------------------
    // SAVE BUTTON
    // ----------------------------------------

    const saveApplicationButton =
        document.getElementById(
            "save-application"
        );


    if (saveApplicationButton) {

        saveApplicationButton.addEventListener(
            "click",
            saveEditedApplication
        );

    }

}

// ========================================
// CREATE STUDENT ACCOUNT
// ========================================

const createStudentAccountButton =
    document.getElementById(
        "create-student-account"
    );


if (createStudentAccountButton) {

    createStudentAccountButton.addEventListener(
        "click",
        createStudentAccount
    );

}


async function createStudentAccount() {

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const applicationId =
        urlParams.get("id");


    if (!applicationId) {

        alert(
            "Could not find the application."
        );

        return;

    }


    const confirmed =
        confirm(
            "Create a student account for this applicant?"
        );


    if (!confirmed) {
        return;
    }


    createStudentAccountButton.disabled =
        true;

    createStudentAccountButton.textContent =
        "Creating Account...";


    try {

        const {
            data,
            error
        } =
            await supabaseClient.functions.invoke(
                "create-student-account",
                {
                    body: {
                        applicationId:
                            applicationId
                    }
                }
            );


        if (error) {

            console.error(
                "Edge Function error:",
                error
            );

            alert(
                "Could not create the student account."
            );

            createStudentAccountButton.disabled =
                false;

            createStudentAccountButton.textContent =
                "Create Student Account";

            return;

        }


        if (data.error) {

            console.error(
                "Account creation error:",
                data.error
            );

            alert(
                data.error
            );

            createStudentAccountButton.disabled =
                false;

            createStudentAccountButton.textContent =
                "Create Student Account";

            return;

        }


        alert(
            "Student account created successfully!"
        );


        await loadApplicationDetails();

    } catch (error) {

        console.error(
            "Unexpected error:",
            error
        );

        alert(
            "Something went wrong while creating the account."
        );

        createStudentAccountButton.disabled =
            false;

        createStudentAccountButton.textContent =
            "Create Student Account";

    }

}


// ========================================
// SAVE APPLICATION STATUS
// ========================================

const saveStatusButton =
    document.getElementById(
        "save-status"
    );


if (saveStatusButton) {

    saveStatusButton.addEventListener(
        "click",
        saveApplicationStatus
    );

}


async function saveApplicationStatus() {

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const applicationId =
        urlParams.get("id");


    const newStatus =
        document.getElementById(
            "status"
        ).value;


    const { error } =
        await supabaseClient
            .from("applications")
            .update({
                status: newStatus
            })
            .eq("id", applicationId);


    if (error) {

        console.error(
            "Supabase error:",
            error
        );

        alert(
            "Could not update the application status."
        );

        return;
    }


    alert(
        "Application status updated!"
    );


    await loadApplicationDetails();

}


// ----------------------------------------
// TEACHER LOGIN
// ----------------------------------------

const loginForm =
    document.getElementById(
        "login-form"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "login-email"
                ).value;


            const password =
                document.getElementById(
                    "login-password"
                ).value;


            const { data, error } =
                await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });


            if (error) {

                console.error(
                    "Login error:",
                    error
                );

                alert(
                    "Login failed: " +
                    error.message
                );

                return;
            }


            alert(
                "Login successful!"
            );


            window.location.href =
                "dashboard.html";

        }
    );

}


// ----------------------------------------
// PROTECT TEACHER DASHBOARD
// ----------------------------------------

async function protectDashboard() {

    const dashboard =
        document.getElementById(
            "dashboard"
        );


    if (!dashboard) {

        return;

    }


    const { data, error } =
        await supabaseClient.auth.getUser();


    if (error || !data.user) {

        window.location.href =
            "login.html";

        return;

    }

}


protectDashboard();


// ----------------------------------------
// TEACHER LOGOUT
// ----------------------------------------

const logoutButton =
    document.getElementById(
        "logout-button"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async function () {

            const { error } =
                await supabaseClient.auth.signOut();


            if (error) {

                console.error(
                    "Logout error:",
                    error
                );

                alert(
                    "Could not log out."
                );

                return;
            }


            window.location.href =
                "login.html";

        }
    );

}


// ----------------------------------------
// PROTECT APPLICATION PAGE
// ----------------------------------------

async function protectApplicationPage() {

    const applicationPage =
        document.getElementById(
            "application-page"
        );


    if (!applicationPage) {

        return;

    }


    const { data, error } =
        await supabaseClient.auth.getSession();


    if (error || !data.session) {

        window.location.replace(
            "login.html"
        );

        return;
    }

}


protectApplicationPage();


// ========================================
// APPLICATION FILTERS
// ========================================

const searchApplications =
    document.getElementById(
        "search-applications"
    );


const filterCourse =
    document.getElementById(
        "filter-course"
    );


const filterStatus =
    document.getElementById(
        "filter-status"
    );


const resetFilters =
    document.getElementById(
        "reset-filters"
    );


// ----------------------------------------
// FILTER APPLICATIONS
// ----------------------------------------

async function filterApplications() {

    const search =
        searchApplications.value
            .toLowerCase()
            .trim();


    const selectedCourse =
        filterCourse.value;


    const selectedStatus =
        filterStatus.value;


    const { data, error } =
        await supabaseClient
            .from("applications")
            .select("*")
            .order("created_at", {
                ascending: false
            });


    if (error) {

        console.error(
            "Filter error:",
            error
        );

        return;
    }


    const filteredApplications =
        data.filter(function (application) {

            const matchesSearch =
                application.name
                    .toLowerCase()
                    .includes(search)

                ||

                application.email
                    .toLowerCase()
                    .includes(search);


            const matchesCourse =
                selectedCourse === "" ||
                application.course === selectedCourse;


            const applicationStatus =
                application.status || "Pending";


            const matchesStatus =
                selectedStatus === "" ||
                applicationStatus === selectedStatus;


            return (
                matchesSearch &&
                matchesCourse &&
                matchesStatus
            );

        });


    displayFilteredApplications(
        filteredApplications
    );

}


// ----------------------------------------
// DISPLAY FILTERED APPLICATIONS
// ----------------------------------------

function displayFilteredApplications(
    applications
) {

    const container =
        document.getElementById(
            "applications-container"
        );


    if (applications.length === 0) {

        container.innerHTML =
            "<p>No applications match your filters.</p>";

        return;
    }


    container.innerHTML = "";


    applications.forEach(
        function (application) {

            const card =
                document.createElement("div");


            card.className =
                "application-card";


            card.innerHTML = `

                <div class="application-header">

                    <div>

                        <h3>
                            ${application.name}
                        </h3>

                        <p>
                            ${application.course}
                        </p>

                    </div>


                    <span class="application-status">

                        ${application.status || "Pending"}

                    </span>

                </div>


                <div class="application-summary">

                    <p>
                        <strong>Email:</strong>
                        ${application.email}
                    </p>

                    <p>
                        <strong>Age:</strong>
                        ${application.age}
                    </p>

                    <p>
                        <strong>Level:</strong>
                        ${application.level || "N/A"}
                    </p>

                    <p>
                        <strong>Session:</strong>
                        ${application.session || "N/A"}
                    </p>

                    <p>
                        <strong>Board:</strong>
                        ${application.board || "N/A"}
                    </p>

                </div>


                <button
                    class="view-application"
                    onclick="viewApplication('${application.id}')"
                >
                    View Application
                </button>

            `;


            container.appendChild(card);

        }
    );

}


// ----------------------------------------
// SEARCH
// ----------------------------------------

if (searchApplications) {

    searchApplications.addEventListener(
        "input",
        filterApplications
    );

}


// ----------------------------------------
// COURSE FILTER
// ----------------------------------------

if (filterCourse) {

    filterCourse.addEventListener(
        "change",
        filterApplications
    );

}


// ----------------------------------------
// STATUS FILTER
// ----------------------------------------

if (filterStatus) {

    filterStatus.addEventListener(
        "change",
        filterApplications
    );

}


// ----------------------------------------
// RESET FILTERS
// ----------------------------------------

if (resetFilters) {

    resetFilters.addEventListener(
        "click",
        function () {

            searchApplications.value = "";

            filterCourse.value = "";

            filterStatus.value = "";

            loadApplications();

        }
    );

}


// ========================================
// SAVE TEACHER NOTES
// ========================================

const saveNotesButton =
    document.getElementById(
        "save-notes"
    );


if (saveNotesButton) {

    saveNotesButton.addEventListener(
        "click",
        saveTeacherNotes
    );

}


async function saveTeacherNotes() {

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const applicationId =
        urlParams.get("id");


    const notes =
        document.getElementById(
            "teacher-notes"
        ).value;


    const { error } =
        await supabaseClient
            .from("applications")
            .update({
                teacher_notes: notes
            })
            .eq("id", applicationId);


    if (error) {

        console.error(
            "Supabase error:",
            error
        );

        alert(
            "Could not save the notes."
        );

        return;
    }


    alert(
        "Teacher notes saved!"
    );

}


// ========================================
// DELETE APPLICATION
// ========================================

async function deleteApplication(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this application?"
        );


    if (!confirmDelete) {

        return;

    }


    const { error } =
        await supabaseClient
            .from("applications")
            .delete()
            .eq("id", id);


    if (error) {

        console.error(
            "Delete error:",
            error
        );

        alert(
            "Could not delete this application."
        );

        return;

    }


    alert(
        "Application deleted successfully."
    );


    loadApplications();

}


// ========================================
// EDIT APPLICATION
// ========================================

const editApplicationButton =
    document.getElementById(
        "edit-application"
    );


if (editApplicationButton) {

    editApplicationButton.addEventListener(
        "click",
        enableApplicationEditing
    );

}


function enableApplicationEditing() {

    const editButton =
        document.getElementById("edit-application");

    if (!editButton) {
        return;
    }

    const editableFields =
        document.querySelectorAll(
            "#application-details input, #application-details select, #application-details textarea"
        );

    editableFields.forEach(function (field) {

        field.disabled = false;

    });

    editButton.textContent = "Cancel Editing";

    editButton.onclick = function () {

        location.reload();

    };

}


// ========================================
// SAVE EDITED APPLICATION
// ========================================

async function saveEditedApplication() {

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const applicationId =
        urlParams.get("id");


    const updatedApplication = {

        name:
            document.getElementById(
                "edit-name"
            ).value,

        email:
            document.getElementById(
                "edit-email"
            ).value,

        age:
            document.getElementById(
                "edit-age"
            ).value,

        course:
            document.getElementById(
                "edit-course"
            ).value,

        level:
            document.getElementById(
                "edit-level"
            ).value,

        session:
            document.getElementById(
                "edit-session"
            ).value,

        board:
            document.getElementById(
                "edit-board"
            ).value,

        university:
            document.getElementById(
                "edit-university"
            ).value,

        grade:
            document.getElementById(
                "edit-grade"
            ).value,

        message:
            document.getElementById(
                "edit-message"
            ).value

    };


    const { error } =
        await supabaseClient
            .from("applications")
            .update(updatedApplication)
            .eq("id", applicationId);


    if (error) {

        console.error(
            "Update error:",
            error
        );

        alert(
            "Could not save the changes."
        );

        return;
    }


    alert(
        "Application updated successfully!"
    );


    await loadApplicationDetails();

}


async function loadCourses() {

    const coursesList =
        document.getElementById("courses-list");

    if (!coursesList) {
        return;
    }

    const { data, error } =
        await supabaseClient
            .from("courses")
            .select("id, name, description")
            .order("id");

    if (error) {

        console.error("Course loading error:", error);

        coursesList.innerHTML =
            "<p>Could not load courses.</p>";

        return;
    }

    coursesList.innerHTML = "";

    data.forEach(function (course) {

        const card =
            document.createElement("div");

        card.className =
            "database-course-card";

        card.innerHTML = `
            <h3>${course.name}</h3>

            <p>
                ${course.description || ""}
            </p>
        `;

        card.addEventListener("click", function () {

            window.location.href =
                `course.html?id=${course.id}`;

        });

        coursesList.appendChild(card);

    });
}

loadCourses();


async function loadCoursePage() {

    const courseTitle =
        document.getElementById("course-title");

    const courseDescription =
        document.getElementById("course-description");

    const lessonsList =
        document.getElementById("lessons-list");

    if (!courseTitle || !lessonsList) {
        return;
    }

    const courseId =
        new URLSearchParams(window.location.search)
            .get("id");

    if (!courseId) {

        courseTitle.textContent =
            "Course not found.";

        return;
    }


    const { data: course, error: courseError } =
        await supabaseClient
            .from("courses")
            .select("*")
            .eq("id", courseId)
            .single();


    if (courseError) {

        console.error(courseError);

        courseTitle.textContent =
            "Could not load course.";

        return;
    }


    courseTitle.textContent =
        course.name;

    courseDescription.textContent =
        course.description || "";


    const { data: lessons, error: lessonsError } =
        await supabaseClient
            .from("lessons")
            .select("*")
            .eq("course_id", courseId)
            .order("id");


    if (lessonsError) {

        console.error(lessonsError);

        lessonsList.innerHTML =
            "<p>Could not load lessons.</p>";

        return;
    }


    lessonsList.innerHTML = "";


    if (lessons.length === 0) {

        lessonsList.innerHTML =
            "<p>No lessons available yet.</p>";

        return;
    }


   lessons.forEach(function (lesson) {

    const lessonCard =
        document.createElement("div");

    lessonCard.className =
        "lesson-card";


    lessonCard.innerHTML = `
        <h3>${lesson.title}</h3>

        <p>
            ${lesson.description || ""}
        </p>
    `;


    lessonCard.addEventListener("click", function () {

        window.location.href =
            `lesson.html?id=${lesson.id}`;

    });


    lessonsList.appendChild(lessonCard);

});

}


loadCoursePage();


async function updateAccountButton() {

    const accountButton =
        document.getElementById("account-button");

    if (!accountButton) {
        return;
    }

    const {
        data: { session },
        error: sessionError
    } = await supabaseClient.auth.getSession();

    if (sessionError) {
        console.error(
            "Session error:",
            sessionError
        );
        return;
    }

    // Nobody is logged in
    if (!session) {

        accountButton.textContent = "Log In";
        accountButton.href = "login.html";

        return;
    }


    // Get the user's profile
    const {
        data: profile,
        error: profileError
    } = await supabaseClient
        .from("profiles")
        .select("name, role")
        .eq("id", session.user.id)
        .single();


    if (profileError) {

        console.error(
            "Profile error:",
            profileError
        );

        accountButton.textContent =
            "My Account";

        accountButton.href =
            "dashboard.html";

        return;
    }


    // Teacher
    if (profile.role === "teacher") {

        accountButton.textContent =
            profile.name;

        accountButton.href =
            "dashboard.html";

    }


    // Student
    else if (profile.role === "student") {

        accountButton.textContent =
            profile.name;

        accountButton.href =
            "student-dashboard.html";

    }

}


updateAccountButton();


supabaseClient.auth.onAuthStateChange(
    function () {

        updateAccountButton();

    }
);


const setPasswordButton =
    document.getElementById("set-password-button");

if (setPasswordButton) {

    setPasswordButton.addEventListener(
        "click",
        setStudentPassword
    );

}


async function setStudentPassword() {

    const password =
        document.getElementById("new-password").value;

    const confirmPassword =
        document.getElementById("confirm-password").value;

    const message =
        document.getElementById("password-message");


    if (!password || !confirmPassword) {

        message.textContent =
            "Please fill in both password fields.";

        return;
    }


    if (password !== confirmPassword) {

        message.textContent =
            "The passwords do not match.";

        return;
    }


    if (password.length < 8) {

        message.textContent =
            "Password must be at least 8 characters.";

        return;
    }


    setPasswordButton.disabled = true;

    setPasswordButton.textContent =
        "Saving...";


    const { error } =
        await supabaseClient.auth.updateUser({
            password: password
        });


    if (error) {

        console.error(
            "Password update error:",
            error
        );

        message.textContent =
            "Could not set your password: " +
            error.message;

        setPasswordButton.disabled = false;

        setPasswordButton.textContent =
            "Set Password";

        return;
    }


    message.textContent =
        "Password created successfully!";


    setPasswordButton.textContent =
        "Password Set";


    setTimeout(function () {

        window.location.href =
            "student-dashboard.html";

    }, 1500);
}