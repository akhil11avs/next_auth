"use client";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import Box from "@/components/Box";
import Table from "@/components/Table";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";
import PageContent from "@/components/PageContent";
import { clearSuccess, deleteCity, getCity } from "@/redux/features/citySlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

import AddCity from "./AddCity";
import DeleteCity from "./DeleteCity";

const columns = [
  { id: "id", label: "ID", type: "index" },
  { id: "label", label: "Name", type: "text", dataKey: "name" },
];

const City = () => {
  const dispatch = useAppDispatch();
  const { loading, cityData, isSuccess, isError, message } = useAppSelector((state) => state?.city);
  const [addCityModal, setAddCityModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [actionData, setActionData] = useState({});

  useEffect(() => {
    dispatch(getCity());
  }, []);

  useEffect(() => {
    if (isSuccess && !isError) {
      toast.success(message);
      dispatch(clearSuccess());
      if (openDeleteModal) {
        setOpenDeleteModal(false);
      }
    }
  }, [dispatch, isError, isSuccess, message, openDeleteModal])

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
          onClick={handleOnOpenOrCloseAddModal}
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

  const handleOnOpenOrCloseAddModal = () => {
    setAddCityModal((prev) => !prev)
  }

  const moreActions = [
    {
      label: "Edit City",
      icon: 'edit',
      // action: handleOnEditModal
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
      <AddCity
        open={addCityModal}
        handleOpenOrClose={handleOnOpenOrCloseAddModal}
      />
      <DeleteCity
        open={openDeleteModal}
        handleOpenOrClose={handleOnDeleteModalClose}
        dialogActions={[
          {
            title: 'Cancel',
            action: handleOnDeleteModalClose,
          },
          {
            title: 'Submit',
            action: handleOnSubmit,
          }
        ]}
      />
      {/* <EditUser
        title="Edit User"
        open={openEditModal}
        data={actionData}
        handleOnClose={handleOnEditModal}
        dialogActions={[
          {
            title: 'Cancel',
            action: handleOnEditModal,
          },
          {
            title: 'Submit',
            action: handleOnSubmit,
          }
        ]}
      /> */}
      {loading && <Loader />}
    </>
  );
};

export default City;
