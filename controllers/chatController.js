import pool from "../config/database.js";
import ai from "../config/gemini.js";

export const chat = async (req, res, next) => {
    try {
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                message: "Question is required"
            });
        }

        const question = message.toLowerCase();
        console.log("CHAT QUESTION:", question);

        let contextParts = [];
        let sources = [];

        // --------------------------------------------------
        // 1. Department retrieval
        // --------------------------------------------------

        if (
            question.includes("department") ||
            question.includes("faculty")
            ) {
            const [departments] = await pool.query(`
                SELECT
                    department_id,
                    department_name,
                    description
                FROM department
                WHERE university_id IS NOT NULL
            `);

            if (departments.length > 0) {
                contextParts.push(
                    "DEPARTMENTS:\n" +
                    departments
                        .map(
                            (department) =>
                                `ID: ${department.department_id}\n` +
                                `Name: ${department.department_name}\n` +
                                `Description: ${department.description}`
                        )
                        .join("\n\n")
                );

                departments.forEach((department) => {
                    sources.push({
                        type: "department",
                        id: department.department_id,
                        name: department.department_name
                    });
                });
            }
        }

        // --------------------------------------------------
        // 2. Program retrieval
        // --------------------------------------------------

        if (
            question.includes("program") ||
            question.includes("degree") ||
            question.includes("study")
        ) {
            const [programs] = await pool.query(`
                SELECT
                    p.program_id,
                    p.program_name,
                    p.program_code,
                    p.degree_type,
                    p.duration_years,
                    d.department_name
                FROM program p
                JOIN department d
                    ON p.department_id = d.department_id
            `);

            if (programs.length > 0) {
                contextParts.push(
                    "PROGRAMS:\n" +
                    programs
                        .map(
                            (program) =>
                                `ID: ${program.program_id}\n` +
                                `Program: ${program.program_name}\n` +
                                `Code: ${program.program_code}\n` +
                                `Degree: ${program.degree_type}\n` +
                                `Duration: ${program.duration_years} years\n` +
                                `Department: ${program.department_name}`
                        )
                        .join("\n\n")
                );

                programs.forEach((program) => {
                    sources.push({
                        type: "program",
                        id: program.program_id,
                        name: program.program_name
                    });
                });
            }
        }

        // --------------------------------------------------
        // 3. Course retrieval
        // --------------------------------------------------

        if (
    question.includes("course") ||
    question.includes("subject") ||
    question.includes("class")
) {
    let courses;

    // Check if the question mentions a specific program
    const [programMatches] = await pool.query(`
    SELECT
        program_id,
        program_name,
        department_id
    FROM program
    WHERE LOWER(?) LIKE CONCAT('%', LOWER(program_name), '%')
`, [question]);

    if (programMatches.length > 0) {
        const program = programMatches[0];

        [courses] = await pool.query(`
            SELECT
                c.course_id,
                c.course_code,
                c.course_name,
                c.credit_hours,
                d.department_name
            FROM course c
            JOIN department d
                ON c.department_id = d.department_id
            WHERE c.department_id = ?
        `, [program.department_id]);

        sources.push({
            type: "program",
            id: program.program_id,
            name: program.program_name
        });

    } else {
        [courses] = await pool.query(`
            SELECT
                c.course_id,
                c.course_code,
                c.course_name,
                c.credit_hours,
                d.department_name
            FROM course c
            JOIN department d
                ON c.department_id = d.department_id
        `);
    }

    if (courses.length > 0) {
        contextParts.push(
            "COURSES:\n" +
            courses
                .map(
                    (course) =>
                        `ID: ${course.course_id}\n` +
                        `Code: ${course.course_code}\n` +
                        `Course: ${course.course_name}\n` +
                        `Credits: ${course.credit_hours}\n` +
                        `Department: ${course.department_name}`
                )
                .join("\n\n")
        );

        courses.forEach((course) => {
            sources.push({
                type: "course",
                id: course.course_id,
                name: course.course_name
            });
        });
    }
}

        // --------------------------------------------------
        // 4. FAQ retrieval
        // --------------------------------------------------

        if (
    !question.includes("event") &&
    !question.includes("workshop") &&
    !question.includes("seminar") &&
    !question.includes("schedule") &&
    (
        question.includes("how") ||
        question.includes("where") ||
        question.includes("when") ||
        question.includes("registration") ||
        question.includes("admission") ||
        question.includes("library") ||
        question.includes("advis")
    )
) {
            const [faqs] = await pool.query(`
                SELECT
                    faq_id,
                    question,
                    answer,
                    category
                FROM faq
            `);

            if (faqs.length > 0) {
                contextParts.push(
                    "FAQS:\n" +
                    faqs
                        .map(
                            (faq) =>
                                `ID: ${faq.faq_id}\n` +
                                `Question: ${faq.question}\n` +
                                `Answer: ${faq.answer}\n` +
                                `Category: ${faq.category}`
                        )
                        .join("\n\n")
                );

                faqs.forEach((faq) => {
                    sources.push({
                        type: "faq",
                        id: faq.faq_id,
                        name: faq.question
                    });
                });
            }
        }

        // --------------------------------------------------
        // 5. Event retrieval
        // --------------------------------------------------

        if (
            question.includes("event") ||
            question.includes("workshop") ||
            question.includes("seminar") ||
            question.includes("schedule")
        ) {
            const [events] = await pool.query(`
    SELECT
        e.event_id,
        e.title,
        e.description,
        e.event_date,
        e.start_time,
        e.end_time,
        e.organizer,
        e.target_students,
        e.registration_required,
        c.campus_name,
        b.building_name,
        r.room_number
    FROM event e
    JOIN campus c
        ON e.campus_id = c.campus_id
    JOIN building b
        ON e.building_id = b.building_id
    JOIN room r
        ON e.room_id = r.room_id
`);

            if (events.length > 0) {
                contextParts.push(
                    "EVENTS:\n" +
                    events
                        .map(
                            (event) =>
                                `ID: ${event.event_id}\n` +
                                `Title: ${event.title}\n` +
                                `Description: ${event.description}\n` +
                                `Date: ${event.event_date}\n` +
                                `Start: ${event.start_time}\n` +
                                `End: ${event.end_time}\n` +
                                `Organizer: ${event.organizer}\n` +
                                `Target students: ${event.target_students}\n` +
                                `Registration required: ${event.registration_required}\n` +
                                `Campus: ${event.campus_name}\n` +
                                `Building: ${event.building_name}\n` +
                                `Room: ${event.room_number}`
                            )
                        .join("\n\n")
                );

                events.forEach((event) => {
                    sources.push({
                        type: "event",
                        id: event.event_id,
                        name: event.title
                    });
                });
            }
        }

        // --------------------------------------------------
        // No relevant database information
        // --------------------------------------------------

        if (contextParts.length === 0) {
            return res.json({
                answer: "The information is not available in the database.",
                sources: []
            });
        }

        const context = contextParts.join("\n\n--------------------\n\n");

        const prompt = `
You are a university information assistant.

Answer the student's question using ONLY the database information provided below.

DATABASE INFORMATION:
${context}

STUDENT QUESTION:
${message}

Rules:
- Use only the information provided in the database context.
- Do not invent or assume university information.
- If the answer cannot be determined from the database information, say that the information is not available.
- Be clear and concise.
- Do not mention internal database IDs unless they are useful to the student.
`;
        console.log("CONTEXT SENT TO GEMINI:");
        console.log(context);

        console.log("SOURCES:");
        console.log(sources);
        const response = await ai.interactions.create({
            model: "gemini-3.8-flash",
            input: prompt
        });

        res.json({
            answer: response.output_text,
            sources
        });

    } catch (error) {
        next(error);
    }
};

