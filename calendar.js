// =========================
// DARK / LIGHT MODE
// =========================

const themeToggle = document.getElementById("theme");

const savedTheme = localStorage.getItem("theme");

// Restore saved theme
if (
    savedTheme === "dark" ||
    (
        !savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    )
) {
    themeToggle.checked = true;
}

// Save theme whenever it changes
themeToggle.addEventListener("change", function () {

    localStorage.setItem(
        "theme",
        this.checked ? "dark" : "light"
    );

});
const calendarGrid =
    document.getElementById("calendarGrid");

const monthTitle =
    document.getElementById("monthTitle");

const semesterLabel =
    document.getElementById("semesterLabel");

const upcomingEvents =
    document.getElementById("upcomingEvents");

const modal =
    document.getElementById("eventModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalDate =
    document.getElementById("modalDate");

const modalCategory =
    document.getElementById("modalCategory");

const modalDescription =
    document.getElementById("modalDescription");


const university =
    document.body.dataset.university || "aau";


const months = [

    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"

];


const categoryNames = {

    registration: "Registration",

    classes: "Classes",

    exam: "Exams",

    deadline: "Deadline",

    university: "University"

};


/* ================= UNIVERSITY DATA ================= */

const universityData = {

    aau: {

        name: "Addis Ababa University",

        logo: "images/aau-logo.png",

        description:
            "Stay updated with registration, classes, examinations, deadlines and important university activities.",

        startDate:
            new Date(2026, 8, 1)

    },


    hawassa: {

        name: "Hawassa University",

        logo: "images/hawassa-logo.png",

        description:
            "Stay updated with registration, classes, examinations, deadlines and important university activities.",

        startDate:
            new Date(2026, 8, 1)

    }

};


const universityInfo =
    universityData[university] ||
    universityData.aau;


/* ================= AAU EVENTS ================= */

const aauEvents = [

    {
        date: "2026-09-14",
        type: "university",
        title: "Academic Staff Report to Duty",
        description:
            "Academic staff report to duty for the 2026/27 academic year."
    },

    {
        date: "2026-09-16",
        type: "registration",
        title: "Graduate Student Registration",
        description:
            "Registration of Year I and above non-clinical graduate students."
    },

    {
        date: "2026-09-17",
        type: "registration",
        title: "Year II+ Undergraduate Registration",
        description:
            "Registration of Year II and above undergraduate regular students."
    },

    {
        date: "2026-09-19",
        type: "registration",
        title: "Continuing Program Registration",
        description:
            "Registration of Year II and above undergraduate continuing program students."
    },

    {
        date: "2026-09-21",
        type: "classes",
        title: "First Semester Classes Begin",
        description:
            "First semester classes begin for all regular and continuing undergraduate students."
    },

    {
        date: "2026-09-25",
        type: "registration",
        title: "Year II Undergraduate Registration",
        description:
            "Registration of Year II undergraduate regular students."
    },

    {
        date: "2026-09-28",
        type: "classes",
        title: "Year II Classes Begin",
        description:
            "First semester classes begin for Year II undergraduate students."
    },

    {
        date: "2026-09-28",
        type: "registration",
        title: "Late Registration",
        description:
            "Late registration period for continuing program students."
    },

    {
        date: "2026-10-01",
        type: "university",
        title: "University Senate Meeting",
        description:
            "Regular University Senate meeting."
    },

    {
        date: "2026-10-08",
        type: "university",
        title: "Class Schedule Report",
        description:
            "Registrar reports first semester class schedules to the Academic Vice President."
    },

    {
        date: "2026-11-09",
        type: "registration",
        title: "Add & Drop Begins",
        description:
            "Add and Drop period begins for regular and evening students."
    },

    {
        date: "2026-11-13",
        type: "registration",
        title: "Add & Drop Ends",
        description:
            "Last day of the Add and Drop period."
    },

    {
        date: "2026-12-01",
        type: "registration",
        title: "Graduate Admission Applications Open",
        description:
            "Applications for admission to the Graduate Program open for Semester II."
    },

    {
        date: "2026-12-11",
        type: "deadline",
        title: "Last Date for Dropping Courses",
        description:
            "Last date for dropping courses."
    },

    {
        date: "2026-12-16",
        type: "registration",
        title: "Make-up Examination Registration",
        description:
            "Registration for make-up examination."
    },

    {
        date: "2026-12-16",
        type: "registration",
        title: "First Round Readmission Applications",
        description:
            "First round applications for readmission for the second semester."
    },

    {
        date: "2026-12-22",
        type: "university",
        title: "Instructor Evaluation",
        description:
            "Students, colleagues and department/school/institute chairs complete instructor evaluations online."
    },

    {
        date: "2027-01-06",
        type: "classes",
        title: "First Semester Classes End",
        description:
            "End of first semester classes for regular and continuing education students."
    },

    {
        date: "2027-01-11",
        type: "exam",
        title: "First Semester Exams Begin",
        description:
            "First semester examination period begins."
    },

    {
        date: "2027-01-15",
        type: "deadline",
        title: "Second Semester Course Deadline",
        description:
            "Deadline for reporting second semester course offerings and class schedules."
    },

    {
        date: "2027-01-22",
        type: "exam",
        title: "First Semester Exams End",
        description:
            "Last day of the first semester examination period."
    },

    {
        date: "2027-01-23",
        type: "university",
        title: "Inter-Semester Break Begins",
        description:
            "Inter-semester break and AAU Sport Festival period begins."
    },

    {
        date: "2027-01-29",
        type: "deadline",
        title: "Grade Approval Deadline",
        description:
            "Last date for grade approval by academic unit heads and chairs."
    },

    {
        date: "2027-02-01",
        type: "university",
        title: "Program Orientation",
        description:
            "Orientation of students on specific academic programs."
    },

    {
        date: "2027-02-02",
        type: "university",
        title: "Program Preference Selection",
        description:
            "Students fill their program preferences on their portal."
    },

    {
        date: "2027-02-05",
        type: "exam",
        title: "Entrance Examinations",
        description:
            "Entrance examinations for MD, DDM, Pharmacy and Law programs."
    },

    {
        date: "2027-02-08",
        type: "registration",
        title: "Graduate Registration",
        description:
            "Registration of Year I and above non-clinical graduate students."
    },

    {
        date: "2027-02-09",
        type: "registration",
        title: "Undergraduate Registration",
        description:
            "Registration of all regular undergraduate students."
    },

    {
        date: "2027-02-11",
        type: "classes",
        title: "Second Semester Classes Begin",
        description:
            "Second semester classes begin."
    },

    {
        date: "2027-02-13",
        type: "registration",
        title: "Late Evening Registration",
        description:
            "Late registration period for evening students."
    },

    {
        date: "2027-02-16",
        type: "exam",
        title: "Graduating Student Re-examination",
        description:
            "Period of re-examination for graduating students begins."
    },

    {
        date: "2027-03-11",
        type: "university",
        title: "University Senate Meeting",
        description:
            "Regular University Senate meeting."
    },

    {
        date: "2027-03-22",
        type: "registration",
        title: "Add & Drop Begins",
        description:
            "Add and Drop period begins."
    },

    {
        date: "2027-03-26",
        type: "registration",
        title: "Add & Drop Ends",
        description:
            "Last day of the Add and Drop period."
    },

    {
        date: "2027-04-01",
        type: "university",
        title: "Academic Records Reconciliation",
        description:
            "Reconciliation of academic records of 2019 prospective graduates."
    },

    {
        date: "2027-04-15",
        type: "deadline",
        title: "Last Date for Dropping Courses",
        description:
            "Last date for dropping courses."
    },

    {
        date: "2027-05-10",
        type: "university",
        title: "AAU Research Week",
        description:
            "Addis Ababa University Research Week and AAU Job Fair Week."
    },

    {
        date: "2027-05-28",
        type: "classes",
        title: "Second Semester Classes End",
        description:
            "End of second semester classes for regular and evening students."
    },

    {
        date: "2027-05-31",
        type: "exam",
        title: "Second Semester Exams Begin",
        description:
            "Second semester examination period begins."
    },

    {
        date: "2027-06-12",
        type: "exam",
        title: "Second Semester Exams End",
        description:
            "Last day of second semester examinations."
    },

    {
        date: "2027-06-21",
        type: "university",
        title: "Approval of All Grades",
        description:
            "Approval of all grades of non-graduating classes and academic commissions meet to approve graduation."
    },

    {
        date: "2027-06-24",
        type: "university",
        title: "University Senate Meeting",
        description:
            "Regular University Senate meeting."
    },

    {
        date: "2027-06-26",
        type: "university",
        title: "AAU Graduation Day",
        description:
            "2027 (2019 E.C.) Addis Ababa University Graduation Day."
    },

    {
        date: "2027-06-28",
        type: "university",
        title: "Graduated Students Clear Campus",
        description:
            "Graduated students clear from AAU campuses."
    }

];


/* ================= HAWASSA EVENTS ================= */

const hawassaEvents = [

    {
        date: "2026-09-14",
        type: "university",
        title: "Academic Staff Reporting Day",
        description:
            "Academic staff reporting day for Hawassa University."
    },

    {
        date: "2026-09-14",
        type: "university",
        title: "Thematic Projects Review Workshops",
        description:
            "Ongoing thematic projects review workshops. Scheduled for September 14–19, 2026."
    },

    {
        date: "2026-09-15",
        type: "university",
        title: "Annual Review Workshop",
        description:
            "Organizing the annual review workshop of completed research, community services and technology transfer projects. Scheduled for September 15–November 7, 2026."
    },

    {
        date: "2026-09-16",
        type: "university",
        title: "Staff General Assembly Day",
        description:
            "Staff General Assembly meeting."
    },

    {
        date: "2026-09-29",
        type: "university",
        title: "Research & Community Project Budget Allocation",
        description:
            "Budget allocation for new and ongoing research, community services and technology transfer projects. Scheduled for September 29–November 7, 2026."
    },

    {
        date: "2026-10-01",
        type: "registration",
        title: "Regular Undergraduate, ATE & Graduate Registration",
        description:
            "Registration of all Regular Undergraduate, ATE and Graduate Program students. Registration period: October 1–2, 2026."
    },

    {
        date: "2026-10-02",
        type: "registration",
        title: "Evening, Weekend UG & PGDT Registration",
        description:
            "Registration of all Evening, Weekend Undergraduate and PGDT Programs. Registration period: October 2–3, 2026."
    },

    {
        date: "2026-10-05",
        type: "classes",
        title: "Regular & Evening Classes Begin",
        description:
            "Classes begin for all Regular Programs and Evening Programs. Late registration period also begins."
    },

    {
        date: "2026-10-05",
        type: "deadline",
        title: "Application for Remarking",
        description:
            "Application period for remarking examinations. Scheduled for October 5–7, 2026."
    },

    {
        date: "2026-10-10",
        type: "classes",
        title: "Weekend Programs Begin",
        description:
            "Classes begin for all Weekend programs."
    },

    {
        date: "2026-10-12",
        type: "deadline",
        title: "NG & Grade Change Decisions Deadline",
        description:
            "Last date to submit decisions on NG and grade change cases to the Registrar."
    },

    {
        date: "2026-10-13",
        type: "registration",
        title: "Makeup & Supplementary Exam Registration",
        description:
            "Registration period for makeup and supplementary examinations. Scheduled for October 13–14, 2026."
    },

    {
        date: "2026-10-15",
        type: "exam",
        title: "Makeup / Supplementary Examination Period",
        description:
            "Makeup and supplementary examination period. Scheduled for October 15–16, 2026."
    },

    {
        date: "2026-10-15",
        type: "registration",
        title: "HDP Trainer Registration",
        description:
            "Registration of Higher Diploma Program (HDP) trainers. Scheduled for October 15–16, 2026."
    },

    {
        date: "2026-10-19",
        type: "classes",
        title: "Higher Diploma Program Classes Begin",
        description:
            "Classes begin for the Higher Diploma Program (HDP)."
    },

    {
        date: "2026-10-20",
        type: "deadline",
        title: "Extra Load Requests Deadline",
        description:
            "Last date to submit extra load requests to the AVP and Registrar."
    },

    {
        date: "2026-10-20",
        type: "deadline",
        title: "Makeup Exam Results Deadline",
        description:
            "Last day for reporting makeup and supplementary examination results to the Registrar."
    },

    {
        date: "2026-10-22",
        type: "registration",
        title: "Add & Drop Courses",
        description:
            "Add and Drop courses window for all programs. Scheduled for October 22–23, 2026."
    },

    {
        date: "2026-10-23",
        type: "registration",
        title: "Second Semester Readmission Deadline",
        description:
            "Last date for readmission application for the second semester."
    },

    {
        date: "2026-11-03",
        type: "deadline",
        title: "First Semester Enrollment Report",
        description:
            "Main Registrar reports first semester enrollment statistics and attrition rate to AVP-APD."
    },

    {
        date: "2026-11-09",
        type: "university",
        title: "Master's & PhD Thesis Defenses",
        description:
            "Master's and PhD thesis defense period. Scheduled for November 9–13, 2026."
    },

    {
        date: "2026-11-23",
        type: "university",
        title: "Course Progress Audits",
        description:
            "Conducting course progress audits for all programs. Scheduled for November 23–29, 2026."
    },

    {
        date: "2026-11-24",
        type: "university",
        title: "University Senate Meeting",
        description:
            "Regular University Senate meeting."
    },

    {
        date: "2026-12-11",
        type: "deadline",
        title: "Second Semester Course Offerings Deadline",
        description:
            "Departments and Schools submit second semester course offerings to APD and Registrar."
    },

    {
        date: "2026-12-28",
        type: "university",
        title: "Instructor Evaluation Week",
        description:
            "Instructor Evaluation Week for all programs. Scheduled for December 28–31, 2026."
    },

    {
        date: "2027-01-08",
        type: "classes",
        title: "First Semester Classes End",
        description:
            "First semester classes end for all Regular and Evening Programs."
    },

    {
        date: "2027-01-10",
        type: "classes",
        title: "Weekend Classes End",
        description:
            "First semester classes end for Weekend Programs."
    },

    {
        date: "2027-01-11",
        type: "exam",
        title: "Model Exit Exam Week",
        description:
            "Model Exit Exam Week. Scheduled for January 11–15, 2027."
    },

    {
        date: "2027-01-11",
        type: "exam",
        title: "First Semester Final Examinations",
        description:
            "First semester final examination period for all programs. Scheduled for January 11–22, 2027."
    },

    {
        date: "2027-01-22",
        type: "university",
        title: "First Semester Inter-Semester Break",
        description:
            "First semester inter-semester break. Scheduled for January 22–31, 2027."
    },

    {
        date: "2027-01-22",
        type: "exam",
        title: "National Exit & NGAT Examination Period",
        description:
            "National Exit and NGAT examination period. Scheduled for January 22–February 1, 2027."
    },

    {
        date: "2027-01-27",
        type: "deadline",
        title: "Grade Submission Deadline",
        description:
            "Last date for submission of grades of all programs to the system."
    },

    {
        date: "2027-01-30",
        type: "registration",
        title: "Weekend & Evening UG Registration",
        description:
            "Registration for Weekend, Evening UG Programs, ATE and PGDT Programs. Scheduled for January 30 and February 1–2, 2027."
    },

    {
        date: "2027-02-01",
        type: "registration",
        title: "Regular & Weekend Graduate Registration",
        description:
            "Registration for all Regular Programs and Weekend Graduate Programs. Scheduled for February 1–2, 2027."
    },

    {
        date: "2027-02-03",
        type: "classes",
        title: "Second Semester Classes Begin",
        description:
            "Second semester classes begin for all Regular Programs and Evening Programs. Late registration period also begins."
    },

    {
        date: "2027-02-03",
        type: "deadline",
        title: "Application for Remarking",
        description:
            "Application period for remarking examinations. Scheduled for February 3–5, 2027."
    },

    {
        date: "2027-02-05",
        type: "university",
        title: "Employability & Job Fair Training",
        description:
            "Employability, job creation training and Job Fairs for graduating class students. Scheduled for February 5–8, 2027."
    },

    {
        date: "2027-02-06",
        type: "classes",
        title: "Weekend Programs Begin",
        description:
            "Classes begin for all Weekend programs."
    },

    {
        date: "2027-02-12",
        type: "deadline",
        title: "NG & Grade Change Decisions Deadline",
        description:
            "Last date to submit decisions on NG and grade change cases for the first semester to the Registrar."
    },

    {
        date: "2027-02-15",
        type: "registration",
        title: "Makeup & Supplementary Exam Registration",
        description:
            "Registration for makeup and supplementary examinations. Scheduled for February 15–16, 2027."
    },

    {
        date: "2027-02-17",
        type: "exam",
        title: "Makeup & Supplementary Examinations",
        description:
            "Makeup and supplementary examination period. Scheduled for February 17–18, 2027."
    },

    {
        date: "2027-02-19",
        type: "deadline",
        title: "Extra Load Requests Deadline",
        description:
            "Last date to submit extra load requests to the AVP-Registrar."
    },

    {
        date: "2027-02-23",
        type: "deadline",
        title: "Makeup Exam Results Deadline",
        description:
            "Last day for reporting makeup and supplementary examination results to the Registrar."
    },

    {
        date: "2027-02-24",
        type: "registration",
        title: "Course Add & Drop Window",
        description:
            "Course Add and Drop window. Scheduled for February 24–25, 2027."
    },

    {
        date: "2027-02-26",
        type: "registration",
        title: "Summer & First Semester Readmission Deadline",
        description:
            "Last date for readmission application for Summer and First Semester of the 2027/2028 academic year."
    },

    {
        date: "2027-03-05",
        type: "deadline",
        title: "Second Semester Enrollment Report",
        description:
            "Main Registrar reports second semester enrollment statistics and attrition rate to AVP-APD."
    },

    {
        date: "2027-03-15",
        type: "university",
        title: "Master's & PhD Thesis Defense Period",
        description:
            "Master's and PhD thesis defense period. Scheduled for March 15–19, 2027."
    },

    {
        date: "2027-03-15",
        type: "university",
        title: "National Research Conferences",
        description:
            "Organizing national research conferences. Scheduled for March 15–May 21, 2027."
    },

    {
        date: "2027-03-29",
        type: "university",
        title: "Course Progress Audits",
        description:
            "Conducting course progress audits for all programs. Scheduled for March 29–April 4, 2027."
    },

    {
        date: "2027-03-30",
        type: "university",
        title: "University Senate Meeting",
        description:
            "Regular University Senate meeting."
    },

    {
        date: "2027-04-26",
        type: "university",
        title: "Research & Technology Transfer Proposals",
        description:
            "Announcing calls for research, community services and technology transfer proposals for 2020 E.C. Scheduled for April 26–May 14, 2027."
    },

    {
        date: "2027-05-07",
        type: "deadline",
        title: "Summer Course Offerings Deadline",
        description:
            "Departments and Schools submit Summer Semester Module/Course Offerings to APD and Registrar."
    },

    {
        date: "2027-05-17",
        type: "university",
        title: "Instructor Evaluation Week",
        description:
            "Instructor Evaluation Week. Scheduled for May 17–21, 2027."
    },

    {
        date: "2027-05-21",
        type: "deadline",
        title: "Honorary Doctorate Nominations Deadline",
        description:
            "Deadline for submitting nominations for honorary doctorate candidates."
    },

    {
        date: "2027-05-21",
        type: "classes",
        title: "Second Semester Classes End",
        description:
            "Second semester classes end for all Regular and Evening Programs."
    },

    {
        date: "2027-05-23",
        type: "classes",
        title: "Weekend Classes End",
        description:
            "Second semester classes end for all Weekend Programs."
    },

    {
        date: "2027-05-24",
        type: "exam",
        title: "Second Semester Final Examinations",
        description:
            "Second semester final examination period for all programs. Scheduled for May 24–June 4, 2027."
    },

    {
        date: "2027-05-31",
        type: "university",
        title: "Master's & PhD Thesis Defense Period",
        description:
            "Master's and PhD thesis defense period. Scheduled for May 31–June 4, 2027."
    },

    {
        date: "2027-06-07",
        type: "exam",
        title: "Model Exit Exam Week",
        description:
            "Model Exit Exam Week. Scheduled for June 7–9, 2027."
    },

    {
        date: "2027-06-09",
        type: "deadline",
        title: "Graduating Class Grade Submission",
        description:
            "Final date for graduating class grade submission."
    },

    {
        date: "2027-06-08",
        type: "university",
        title: "Non-Graduating Classes Clear Campus",
        description:
            "Non-graduating classes clear from campus."
    },

    {
        date: "2027-06-10",
        type: "exam",
        title: "National Exit Examination Period",
        description:
            "National Exit Examination period. Scheduled for June 10–20, 2027."
    },

    {
        date: "2027-06-11",
        type: "deadline",
        title: "Final Grades Deadline",
        description:
            "Deadline to submit final grades for non-graduating students to the system."
    },

    {
        date: "2027-06-11",
        type: "classes",
        title: "HDP Classes End",
        description:
            "Higher Diploma Program classes end."
    },

    {
        date: "2027-06-16",
        type: "deadline",
        title: "HDP Grades Submission Deadline",
        description:
            "Last date for submission of Higher Diploma Program grades to the Registrar."
    },

    {
        date: "2027-06-24",
        type: "university",
        title: "University Senate Meeting",
        description:
            "Regular University Senate meeting."
    },

    {
        date: "2027-06-26",
        type: "university",
        title: "Graduation Commencement Ceremony",
        description:
            "Graduation commencement ceremony at the Main Campus."
    },

    {
        date: "2027-06-29",
        type: "university",
        title: "Graduating Classes Clear Campus",
        description:
            "Graduating classes clear from campus."
    },

    {
        date: "2027-07-08",
        type: "registration",
        title: "Kiremt Program Registration",
        description:
            "Registration of all Kiremt Programs. Scheduled for July 8–9, 2027."
    },

    {
        date: "2027-07-09",
        type: "registration",
        title: "Weekend & Evening Summer Registration",
        description:
            "Registration of all Weekend and Evening Programs for the Summer Semester. Scheduled for July 9–10, 2027."
    },

    {
        date: "2027-07-12",
        type: "classes",
        title: "Kiremt & Evening Classes Begin",
        description:
            "Summer Semester classes begin for Kiremt and Evening Programs."
    },

    {
        date: "2027-07-16",
        type: "university",
        title: "Tutorial for Home Take Courses",
        description:
            "Tutorial for Home Take Courses. Scheduled for July 16–18, 2027."
    },

    {
        date: "2027-07-17",
        type: "classes",
        title: "Weekend Summer Classes Begin",
        description:
            "Summer Semester classes begin for Weekend Programs."
    },

    {
        date: "2027-07-21",
        type: "registration",
        title: "Make-up Examination / Add & Drop",
        description:
            "Make-up examination period and Add & Drop period. Scheduled for July 21–22, 2027."
    },

    {
        date: "2027-07-24",
        type: "exam",
        title: "Home Taken Courses Examination",
        description:
            "Examination date for Home Taken Courses. Scheduled for July 24–25, 2027."
    },

    {
        date: "2027-08-05",
        type: "exam",
        title: "NGAT Exam Period",
        description:
            "NGAT examination period. Scheduled for August 5–6, 2027."
    },

    {
        date: "2027-08-27",
        type: "classes",
        title: "Kiremt & Evening Classes End",
        description:
            "End of classes for Kiremt and Evening Programs."
    },

    {
        date: "2027-08-29",
        type: "classes",
        title: "Weekend Classes End",
        description:
            "End of classes for Weekend Programs."
    },

    {
        date: "2027-08-30",
        type: "exam",
        title: "Summer Final Examination Period",
        description:
            "Final examination period for Kiremt, Evening and Weekend students. Scheduled for August 30–September 5, 2027."
    },

    {
        date: "2027-09-07",
        type: "university",
        title: "Kiremt Students Clear Campus",
        description:
            "Kiremt students clear from campus."
    },

    {
        date: "2027-09-10",
        type: "deadline",
        title: "Summer Exam Results Deadline",
        description:
            "Last date for reporting final examination results to the Registrar for the Summer Semester."
    }

];


const events =
    university === "hawassa"
        ? hawassaEvents
        : aauEvents;


/* ================= VARIABLES ================= */

let currentDate =
    new Date(
        universityInfo.startDate
    );

let activeFilter = "all";


/* ================= UNIVERSITY DISPLAY ================= */

const universityTitle =
    document.getElementById(
        "universityTitle"
    );

const universityDescription =
    document.getElementById(
        "universityDescription"
    );

const universityLogo =
    document.getElementById(
        "universityLogo"
    );


if (universityTitle) {

    universityTitle.innerHTML =
        `${universityInfo.name}<br>Academic Calendar`;

}


if (universityDescription) {

    universityDescription.textContent =
        universityInfo.description;

}


if (universityLogo) {

    universityLogo.src =
        universityInfo.logo;

    universityLogo.alt =
        `${universityInfo.name} Logo`;

}


/* ================= DATE FUNCTIONS ================= */

function dateKey(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


function formatDate(dateString) {

    const date =
        new Date(
            dateString + "T12:00:00"
        );

    return date.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );

}


/* ================= SEMESTER ================= */

function getSemester(date) {

    const year =
        date.getFullYear();

    const month =
        date.getMonth();


    if (
        (year === 2026 && month >= 8) ||
        (year === 2027 && month === 0)
    ) {

        return "First Semester";

    }


    if (
        year === 2027 &&
        month >= 1 &&
        month <= 5
    ) {

        return "Second Semester";

    }


    if (
        year === 2027 &&
        month >= 6
    ) {

        return "Summer / Kiremt Semester";

    }


    return "Academic Calendar";

}


/* ================= GET EVENTS ================= */

function getEvents(date) {

    return events.filter(
        event =>
            event.date === date
    );

}


/* ================= RENDER CALENDAR ================= */

function renderCalendar() {

    calendarGrid.innerHTML = "";


    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();


    monthTitle.textContent =
        `${months[month]} ${year}`;


    semesterLabel.textContent =
        getSemester(currentDate);


    const firstDay =
        new Date(
            year,
            month,
            1
        );


    const lastDay =
        new Date(
            year,
            month + 1,
            0
        );


    const startDay =
        firstDay.getDay();


    const days =
        lastDay.getDate();


    const totalCells =
        Math.ceil(
            (startDay + days) / 7
        ) * 7;


    const previousLastDay =
        new Date(
            year,
            month,
            0
        ).getDate();


    for (
        let i = 0;
        i < totalCells;
        i++
    ) {

        let dayNumber;

        let date;

        let otherMonth = false;


        if (i < startDay) {

            dayNumber =
                previousLastDay -
                startDay +
                i +
                1;

            date =
                new Date(
                    year,
                    month - 1,
                    dayNumber
                );

            otherMonth = true;

        }

        else if (
            i >= startDay + days
        ) {

            dayNumber =
                i -
                (startDay + days) +
                1;

            date =
                new Date(
                    year,
                    month + 1,
                    dayNumber
                );

            otherMonth = true;

        }

        else {

            dayNumber =
                i -
                startDay +
                1;

            date =
                new Date(
                    year,
                    month,
                    dayNumber
                );

        }


        const key =
            dateKey(date);


        const dayEvents =
            getEvents(key);


        const day =
            document.createElement(
                "div"
            );


        day.className =
            "day";


        if (otherMonth) {

            day.classList.add(
                "other-month"
            );

        }


        const today =
            new Date();


        if (
            key === dateKey(today)
        ) {

            day.classList.add(
                "today"
            );

        }


        const number =
            document.createElement(
                "div"
            );


        number.className =
            "day-number";


        number.textContent =
            dayNumber;


        day.appendChild(number);


        let visibleEvents;


        if (
            activeFilter === "all"
        ) {

            visibleEvents =
                dayEvents;

        }

        else {

            visibleEvents =
                dayEvents.filter(
                    event =>
                        event.type ===
                        activeFilter
                );

        }


        visibleEvents
            .slice(0, 3)
            .forEach(event => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.className =
                    `event ${event.type}`;


                button.textContent =
                    event.title;


                button.addEventListener(
                    "click",
                    () =>
                        openEvent(event)
                );


                day.appendChild(
                    button
                );

            });


        if (
            visibleEvents.length > 3
        ) {

            const more =
                document.createElement(
                    "div"
                );


            more.className =
                "more-events";


            more.textContent =
                `+ ${visibleEvents.length - 3} more`;


            day.appendChild(
                more
            );

        }


        calendarGrid.appendChild(
            day
        );

    }

}


/* ================= OPEN EVENT ================= */

function openEvent(event) {

    modalTitle.textContent =
        event.title;


    modalDate.textContent =
        formatDate(event.date);


    modalCategory.textContent =
        categoryNames[event.type];


    modalDescription.textContent =
        event.description;


    modal.classList.add(
        "open"
    );

}


/* ================= CLOSE EVENT ================= */

function closeEvent() {

    modal.classList.remove(
        "open"
    );

}


/* ================= UPCOMING EVENTS ================= */

function renderUpcoming() {

    upcomingEvents.innerHTML = "";


    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    const upcoming =
        events
            .filter(event => {

                const eventDate =
                    new Date(
                        event.date +
                        "T12:00:00"
                    );

                return eventDate >= today;

            })
            .sort((a, b) => {

                return a.date.localeCompare(
                    b.date
                );

            })
            .slice(0, 6);


    if (
        upcoming.length === 0
    ) {

        upcomingEvents.innerHTML = `
            <div class="no-upcoming">
                No upcoming events.
            </div>
        `;

        return;

    }


    upcoming.forEach(event => {

        const date =
            new Date(
                event.date +
                "T12:00:00"
            );


        const item =
            document.createElement(
                "button"
            );


        item.className =
            "upcoming-item";


        item.innerHTML = `

            <div class="upcoming-date">

                <strong>
                    ${date.getDate()}
                </strong>

                <span>
                    ${months[
                date.getMonth()
            ].slice(0, 3)
            }
                </span>

            </div>


            <div class="upcoming-content">

                <strong>
                    ${event.title}
                </strong>

                <span>
                    ${categoryNames[event.type]}
                </span>

            </div>

        `;


        item.addEventListener(
            "click",
            () => {

                currentDate =
                    new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        1
                    );

                renderCalendar();

                openEvent(event);

            }
        );


        upcomingEvents.appendChild(
            item
        );

    });

}


/* ================= MONTH NAVIGATION ================= */

document
    .getElementById("prevMonth")
    .addEventListener(
        "click",
        () => {

            currentDate =
                new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    1
                );

            renderCalendar();

        }
    );


document
    .getElementById("nextMonth")
    .addEventListener(
        "click",
        () => {

            currentDate =
                new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    1
                );

            renderCalendar();

        }
    );


/* ================= TODAY ================= */

document
    .getElementById("todayBtn")
    .addEventListener(
        "click",
        () => {

            const today =
                new Date();


            currentDate =
                new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    1
                );


            renderCalendar();

        }
    );


/* ================= FILTERS ================= */

document
    .querySelectorAll(".filter")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".filter"
                    )
                    .forEach(btn =>
                        btn.classList.remove(
                            "active"
                        )
                    );


                button.classList.add(
                    "active"
                );


                activeFilter =
                    button.dataset.filter;


                renderCalendar();

            }
        );

    });


/* ================= SEARCH ================= */

const searchPanel =
    document.getElementById(
        "searchPanel"
    );


const searchInput =
    document.getElementById(
        "eventSearch"
    );


const searchResults =
    document.getElementById(
        "searchResults"
    );


document
    .getElementById("searchToggle")
    .addEventListener(
        "click",
        () => {

            searchPanel.classList.toggle(
                "open"
            );


            if (
                searchPanel.classList.contains(
                    "open"
                )
            ) {

                searchInput.focus();

            }

        }
    );


searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();


        searchResults.innerHTML =
            "";


        if (!query) {

            return;

        }


        const results =
            events.filter(event => {

                return (

                    event.title
                        .toLowerCase()
                        .includes(query)

                    ||

                    event.description
                        .toLowerCase()
                        .includes(query)

                    ||

                    categoryNames[
                        event.type
                    ]
                        .toLowerCase()
                        .includes(query)

                );

            });


        if (
            results.length === 0
        ) {

            searchResults.innerHTML = `
                <div class="no-search-results">
                    No events found.
                </div>
            `;

            return;

        }


        results
            .slice(0, 10)
            .forEach(event => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.className =
                    "search-result";


                button.innerHTML = `

                    <strong>
                        ${event.title}
                    </strong>

                    <span>
                        ${formatDate(event.date)}
                        ·
                        ${categoryNames[event.type]}
                    </span>

                `;


                button.addEventListener(
                    "click",
                    () => {

                        currentDate =
                            new Date(
                                event.date +
                                "T12:00:00"
                            );


                        renderCalendar();

                        openEvent(event);

                    }
                );


                searchResults.appendChild(
                    button
                );

            });

    });


document
    .getElementById("clearSearch")
    .addEventListener(
        "click",
        () => {

            searchInput.value =
                "";

            searchResults.innerHTML =
                "";

            searchInput.focus();

        }
    );


/* ================= MODAL ================= */

document
    .getElementById("modalClose")
    .addEventListener(
        "click",
        closeEvent
    );


modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            closeEvent();

        }

    }
);


/* ================= KEYBOARD ================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeEvent();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            document
                .getElementById(
                    "prevMonth"
                )
                .click();

        }


        if (
            event.key === "ArrowRight"
        ) {

            document
                .getElementById(
                    "nextMonth"
                )
                .click();

        }

    }
);


/* ================= MOBILE MENU ================= */

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


const nav =
    document.querySelector(
        ".main-nav"
    );


if (
    mobileMenu &&
    nav
) {

    mobileMenu.addEventListener(
        "click",
        () => {

            nav.classList.toggle(
                "open"
            );

        }
    );

}


/* ================= LUCIDE ================= */

if (
    window.lucide
) {

    lucide.createIcons();

}


/* ================= START ================= */

renderCalendar();

renderUpcoming();