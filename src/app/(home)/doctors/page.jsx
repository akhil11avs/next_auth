"use client";
import { useEffect, useState } from "react";
import Box from "@/components/Box";
import Button from "@/components/Button";
import PageContent from "@/components/PageContent";
import PageTitle from "@/components/PageTitle";
import Table from "@/components/Table";
import DoctorForm from "./DoctorForm";
import { clearSuccess, deleteDoctor, getDoctor } from "@/redux/features/doctorSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import DeleteComponent from "@/components/DeleteComponent";
import useResponsive from "@/customHook/useResponsive";
import { doctorColumn } from "@/lib/columns";

const Doctor = () => {
  const dispatch = useAppDispatch();
  const lgUp = useResponsive("up", "lg");

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [doctorFormModal, setDoctorFormModal] = useState("");
  const [actionData, setActionData] = useState({});
  const { loading, doctorData, isSuccess, isError, message, messageType } =
    useAppSelector((state) => state?.doctor);

  useEffect(() => {
    dispatch(getDoctor());
  }, []);

  useEffect(() => {
    if (
      isSuccess &&
      !isError &&
      (messageType === "getDoctor" || messageType === "deleteDoctor")
    ) {
      toast.success(message);
      dispatch(clearSuccess());
      if (openDeleteModal) {
        setOpenDeleteModal(false);
        setActionData({});
      }
    }
  }, [isError, isSuccess, message, openDeleteModal, messageType, dispatch]);

  const handleOnOpenOrCloseModal = (name, data) => {
    setDoctorFormModal(name);
    if (name === "edit") setActionData(data);
  };

  const handleOnDeleteModalClose = (data) => {
    setOpenDeleteModal(prev => !prev);
    setActionData(data);
  };

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

  const handleOnSubmit = () => {
    dispatch(deleteDoctor({ doctorId: actionData?._id }))
  }

  return (
    <>
      <PageContent>
        <Table
          headerComponent={<DoctorHeader />}
          data={doctorData}
          columns={doctorColumn}
          moreActions={moreActions}
        />
      </PageContent>
      {doctorFormModal && (
        <DoctorForm
          data={actionData}
          doctorFormModal={doctorFormModal}
          setDoctorFormModal={setDoctorFormModal}
          setActionData={setActionData}
        />
      )}
      <DeleteComponent
        open={openDeleteModal}
        title="Delete Doctor"
        content="Are you want to delete this Doctor?"
        handleOpenOrClose={handleOnDeleteModalClose}
        dialogActions={[
          {
            title: "Cancel",
            action: handleOnDeleteModalClose,
          },
          {
            title: "Submit",
            action: handleOnSubmit,
          },
        ]}
        sx={{
          width: lgUp ? "25%" : "75%",
        }}
      />
      {loading && <Loader />}
    </>
  );
};

export default Doctor;
