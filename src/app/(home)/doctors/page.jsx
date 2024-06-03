"use client";
import { useState } from "react";
import Box from "@/components/Box";
import Button from "@/components/Button";
import PageContent from "@/components/PageContent";
import PageTitle from "@/components/PageTitle";
import Table from "@/components/Table";
import DoctorForm from "./DoctorForm";

const columns = [
    { id: "id", label: "ID", type: "index" },
    { id: "name", label: "Name", type: "text", dataKey: "name" },
    { id: "mobile", label: "Mobile Number", type: "text", dataKey: "mobile" },
    { id: "email", label: "Email", type: "text", dataKey: "email" },
    { id: "degree", label: "Degree", type: "text", dataKey: "degree" },
    { id: "status", label: "Status", type: "text", dataKey: "status" },
];

const doctorData = [
    {
        id: 1, name: 'Akhil Verma', mobile: '79878327987', email: "akhil@gmail.com", degree: "MBBS", status: "Active",
    },
];

const Doctor = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [doctorFormModal, setDoctorFormModal] = useState("");
    const [actionData, setActionData] = useState({});

    const handleOnOpenOrCloseModal = (name, data) => {
        // setDoctorFormModal(name);
        // setActionData(data);
    };

    const handleOnDeleteModalClose = (data) => {
        // setOpenDeleteModal(prev => !prev);
        // setActionData(data);
    }

    const DoctorHeader = () => {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <PageTitle title="Doctor" sx={{ fontSize: "26px" }} />
                <Button
                    onClick={() => handleOnOpenOrCloseModal("add")}
                    size="medium"
                    sx={{ fontFamily: "var(--font-Poppins-SemiBold)" }}
                >
                    Add Doctor
                </Button>
            </Box>
        );
    };

    const moreActions = [
        {
            label: "Edit Doctor",
            icon: 'edit',
            action: (data) => handleOnOpenOrCloseModal("edit", data)
        },
        {
            label: "Delete Doctor",
            icon: 'delete',
            action: handleOnDeleteModalClose
        },
    ];

    return (
        <>
            <PageContent>
                <Table
                    headerComponent={<DoctorHeader />}
                    data={doctorData}
                    columns={columns}
                    moreActions={moreActions}
                />
            </PageContent>
            <DoctorForm
                data={actionData}
                doctorFormModal={doctorFormModal}
                setDoctorFormModal={setDoctorFormModal}
                setActionData={setActionData}
            />
        </>
    );
};

export default Doctor;
