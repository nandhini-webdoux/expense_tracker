
let students = [
    { name: "Ravi", marks: [80, 75, 90] },
    { name: "Priya", marks: [95, 92, 98] },
    { name: "Arun", marks: [35, 40, 30] },
    { name: "Meena", marks: [70, 65, 80] }
];

// Calculate total, average, grade and result
students.forEach(student => {
    student.total = student.marks.reduce(
        (sum, mark) => sum + mark, 0
    );

    student.average = student.total / student.marks.length;

    if (student.average >= 90) {
        student.grade = "A";
    } else if (student.average >= 75) {
        student.grade = "B";
    } else if (student.average >= 60) {
        student.grade = "C";
    } else if (student.average >= 35) {
        student.grade = "D";
    } else {
        student.grade = "F";
    }

    student.result = student.marks.every(mark => mark >= 35)
        ? "Pass"
        : "Fail";
});

// Display each student's details
students.forEach(student => {
    console.log(
        student.name,
        "Total:", student.total,
        "Average:", student.average.toFixed(2),
        "Grade:", student.grade,
        "Result:", student.result
    );
});

// Find topper
let topper = students.reduce((best, student) =>
    student.total > best.total ? student : best
);

console.log("Topper:", topper.name);

// Count pass and fail
let passCount = students.filter(
    student => student.result === "Pass"
).length;

let failCount = students.filter(
    student => student.result === "Fail"
).length;

console.log("Passed:", passCount);
console.log("Failed:", failCount);

// Sort students by total marks and assign ranks
let ranking = [...students].sort(
    (a, b) => b.total - a.total
);

ranking.forEach((student, index) => {
    student.rank = index + 1;
});

console.log("Rank List:");

ranking.forEach(student => {
    console.log(
        student.rank,
        student.name,
        student.total
    );
});
