'use client'
import React from "react";

import Box from "@/components/Box";
import Loader from "@/components/Loader";
import { useAppSelector } from "@/redux/hook";
import Typography from "@/components/Typography";
import useResponsive from "@/customHook/useResponsive";

import './style.scss'

const DetailComponent = ({ title, value }) => {
    return (
        <Box className="details_container">
            <Typography className="details_left">{title}</Typography>
            <Typography sx={{ fontWeight: "bold", flex: 1 }}>:</Typography>
            <Typography className="details_right">{value}</Typography>
        </Box>
    );
};

const Home = () => {
    const lgUp = useResponsive('up', 'lg');
    const { loading, data } = useAppSelector((state) => state?.user);

    return (
        loading ? (
            <Loader />
        ) : (
            <div className="flex items-center justify-center" style={{ minHeight: lgUp ? "100vh" : "80vh" }}>
                <div className="w-full bg-white rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:border-grey mr-3 ml-3 md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800 dark:border-gray-700">
                    <div className="p-2 space-y-2 md:space-y-4 sm:p-4">
                        <Typography
                            className="profile_title"
                            color="primary"
                        >
                            Personal Details
                        </Typography>
                        <DetailComponent title="Name" value={data?.name} />
                        <DetailComponent title="Mobile Number" value={data?.mobile} />
                        <DetailComponent title="Email" value={data?.email} />
                    </div>
                </div>
            </div>
        )
    );
};

export default Home;
