"use client";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import Box from "@/components/Box";
import Table from "@/components/Table";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";
import PageContent from "@/components/PageContent";
import useResponsive from "@/customHook/useResponsive";
import DeleteComponent from "@/components/DeleteComponent";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { clearSuccess, deleteCity, getCity } from "@/redux/features/citySlice";

import CityForm from "./CityForm";

const columns = [
  { id: "id", label: "ID", type: "index" },
  { id: "label", label: "Name", type: "text", dataKey: "name" },
];

const City = () => {
  const dispatch = useAppDispatch();
  const lgUp = useResponsive('up', 'lg');

  const { loading, cityData, isSuccess, isError, message, messageType } = useAppSelector((state) => state?.city);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [cityFormModal, setCityFormModal] = useState("");
  const [actionData, setActionData] = useState({});

  useEffect(() => {
    if (cityData.length === 0) {
      dispatch(getCity());
    }
  }, [cityData, dispatch]);

  useEffect(() => {
    if (isSuccess && !isError && (messageType === 'getCity' || messageType === "deleteCity")) {
      toast.success(message);
      dispatch(clearSuccess());
      if (openDeleteModal) {
        setOpenDeleteModal(false);
        setActionData({});
      }
    }
  }, [isError, isSuccess, message, openDeleteModal, messageType, dispatch])

  const CityHeader = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PageTitle title="City" sx={{ fontSize: "26px" }} />
        <Button
          onClick={() => handleOnOpenOrCloseModal("add")}
          size="medium"
          sx={{ fontFamily: "var(--font-Poppins-SemiBold)" }}
        >
          Add City
        </Button>
      </Box>
    );
  };

  const handleOnDeleteModalClose = (data) => {
    setOpenDeleteModal(prev => !prev);
    setActionData(data);
  }

  const handleOnOpenOrCloseModal = (value, data) => {
    setCityFormModal(value);
    if (value === "edit") {
      setActionData(data);
    }
  }

  const moreActions = [
    {
      label: "Edit City",
      icon: 'edit',
      action: (data) => handleOnOpenOrCloseModal("edit", data)
    },
    {
      label: "Delete City",
      icon: 'delete',
      action: handleOnDeleteModalClose
    },
  ];

  const handleOnSubmit = useCallback(() => {
    dispatch(deleteCity({ cityId: actionData?._id }))
  }, [actionData, dispatch])

  return (
    <>
      <PageContent>
        <Table
          headerComponent={<CityHeader />}
          data={cityData}
          columns={columns}
          moreActions={moreActions}
        />
      </PageContent>
      <CityForm
        cityFormModal={cityFormModal}
        data={actionData}
        setCityFormModal={setCityFormModal}
        setActionData={setActionData}
      />
      <DeleteComponent
        open={openDeleteModal}
        title="Delete City"
        content="Are you want to delete this city?"
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
          width: lgUp ? "20%" : "75%",
        }}
      />
      {loading && <Loader />}
    </>
  );
};

export default City;
