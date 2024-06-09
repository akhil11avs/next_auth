export const doctorColumn = [
    { id: "id", label: "ID", type: "index" },
    { id: "name", label: "Name", type: "text", dataKey: "name" },
    { id: "mobile", label: "Mobile Number", type: "text", dataKey: "mobile" },
    { id: "email", label: "Email", type: "text", dataKey: "email" },
    { id: "dob", label: "Date of Birth", type: "date", dataKey: "dob" },
    { id: "address", label: "Address", type: "text", dataKey: "address" },
    // { id: "degree", label: "Degree", type: "text", dataKey: "degree" },
    { id: "specialization", label: "Specialization", type: "text", dataKey: "specialization" },
];

export const serviceColumn = [
    { id: "id", label: "ID", type: "index" },
    { id: "title", label: "Title", type: "text", dataKey: "title" },
    { id: "content", label: "Content", type: "text", dataKey: "content" },
]