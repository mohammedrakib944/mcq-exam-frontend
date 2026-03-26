# MCQ Exam Platform: Design & API Documentation

This document provides a wireframe design prompt and a backend API specification based on the current frontend implementation.

## 1. Wireframe Design Prompt

Use this prompt in a tool like ChatGPT (with DALL-E), Midjourney, or as a brief for a UI/UX designer:

> "Design a high-fidelity wireframe for a modern MCQ (Multiple Choice Question) Exam Platform. The interface should be clean, professional, and optimized for both web and mobile. 
> 
> **Key Screens to Include:**
> 1. **Admin Dashboard:** A central hub with statistics (total students, active exams, question bank count) and a sidebar for navigation.
> 2. **Hierarchical Management:** A UI for managing 'Subjects', 'Lessons', and 'Topics' with clear breadcrumbs or nested navigation to show relationships.
> 3. **Question Bank:** A searchable data table with filters for Subject, Difficulty, and Topic, featuring a multi-select mechanism to add questions to an exam.
> 4. **Exam Interface:** A focused, distraction-free 'Zen Mode' for students taking exams, with a countdown timer, progress bar, and easy-to-select radio options.
> 5. **Results Page:** A clear summary of the student's performance with a score percentage, correct/incorrect answer breakdown, and detailed explanations for each question.
> 
> **Aesthetic:** Minimalist, using a palette of soft blues, grays, and whites. Use 'Work Sans' typography. Focus on accessibility and mobile-responsive layouts."

---

## 2. Site Flow (User Journey)

### Admin Flow:
1. **Login** -> **Dashboard**.
2. **Setup Content**: Add **Subjects** -> Add **Lessons** (linked to Subjects) -> Add **Topics** (linked to Lessons).
3. **Build Bank**: Add **MCQs** (assigning them to Subject/Lesson/Topic).
4. **Create Exam**: Select questions from the **Question Bank** -> Set duration/passing score -> **Publish**.

### Student Flow:
1. **Login** -> **Student Landing Page**.
2. **Browse Exams**: Select an available exam.
3. **Take Exam**: Answer questions under time pressure.
4. **View Result**: Get instant feedback and score.

---

## 3. Backend API Specification (RESTful)

### Authentication
- `POST /api/auth/login`: Authenticate and return JWT.
- `POST /api/auth/register`: Register a new student.

### Content Management (Admin Only)
- `GET/POST /api/subjects`: List/Create subjects.
- `GET/POST /api/lessons`: List/Create lessons (filtered by `subjectId`).
- `GET/POST /api/topics`: List/Create topics (filtered by `lessonId`).

### Question Bank
- `GET /api/mcqs`: List questions with query params (`subjectId`, `lessonId`, `topicId`, `difficulty`).
- `POST /api/mcqs`: Add a new question.
- `PUT/DELETE /api/mcqs/:id`: Edit or remove a question.

### Exams
- `GET /api/exams`: List published exams for students.
- `POST /api/exams`: Create a new exam from a list of `mcqIds`.
- `GET /api/exams/:id`: Get exam details (metadata + questions).

### Attempts & Scoring
- `POST /api/exams/:id/submit`: Submit answers and calculate score.
- `GET /api/attempts/:id`: Retrieve detailed result for a specific attempt.
