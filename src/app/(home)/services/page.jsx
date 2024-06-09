import React from "react";

import Box from "@/components/Box";
import Table from "@/components/Table";
import Button from "@/components/Button";
import { serviceColumn } from "@/lib/columns";
import PageTitle from "@/components/PageTitle";
import PageContent from "@/components/PageContent";

const Services = () => {
  const serviceData = [
    {
      title: "Neck Pain",
      content:
        "Neck pain, or cervicalgia injuries and medical conditions, presenting a common symptom.",
    },
  ];

  const ServiceHeader = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PageTitle title="Services" sx={{ fontSize: "26px" }} />
        <Button
          size="medium"
          sx={{ fontFamily: "var(--font-Poppins-SemiBold)" }}
        >
          Add Service
        </Button>
      </Box>
    );
  };

  const moreActions = [
    {
      label: "Edit Service",
      icon: "edit",
      //   action: (data) => handleOnOpenOrCloseModal("edit", data)
    },
    {
      label: "Delete Service",
      icon: "delete",
      //   action: handleOnDeleteModalClose
    },
  ];

  return (
    <PageContent>
      <Table
        headerComponent={<ServiceHeader />}
        data={serviceData}
        columns={serviceColumn}
        moreActions={moreActions}
      />
    </PageContent>
  );
};

export default Services;
