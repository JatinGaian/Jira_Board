const userObject = {
    "employee_id": "string",          // Unique identifier for each employee
    "first_name": "string",           // Employee's first name
    "last_name": "string",            // Employee's last name
    "email": "string",                // Employee's email address
    "phone_number": "string",         // Employee's contact number
    "department": "string",           // Department the employee belongs to
    "designation": "string",          // Job title or role
    "date_of_joining": "date",        // Employee's joining date
    "performance": {
        "performance_score": "number",  // Performance score/rating
        "reviews": "array",             // Performance reviews and comments
        "goals": "array"                // List of goals and achievements
    },
    "stories_of_the_day": "array",    // Daily stories or highlights
    "current_sprint": {
        "sprint_id": "string",          // Current sprint identifier
        "tasks": "array"                // List of tasks in the current sprint
    },
    "zoho_hrms_data": {
        "employee_code": "string",      // Employee code from Zoho
        "address": "string",            // Address details
        "salary_details": "object"      // Salary and compensation details
    },
    "mib_data": {
        "project_assignments": "array", // Projects the employee is assigned to
        "training_progress": "object",  // Training modules and progress
        "feedback": "array"             // Feedback and comments from peers and managers
    },
    "created_at": "timestamp",        // Record creation timestamp
    "updated_at": "timestamp"         // Last update timestamp
}