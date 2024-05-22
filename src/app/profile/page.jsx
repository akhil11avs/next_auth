"use client";
import axios from "axios";
import React, { useCallback, useState } from "react";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import Loader from "../../components/Loader";

export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState("nothing");
  const [loading, setLoading] = useState(false);

  const logout = useCallback(() => {
    setLoading(true);
    axios.post('/api/users/logout')
      .then((res) => {
        toast.success(res?.data?.message);
        router.push('/login')
        setLoading(false);
      })
      .catch(error => {
        console.log('error: ', error);
        setLoading(false);
        toast.error(error?.response?.data?.error);
      })
  }, []);

  const getUserDetails = () => {
    setLoading(true);
    axios.get('/api/users/me')
      .then((res) => {
        toast.success(res?.data?.message);
        setData(res.data.data._id)
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        toast.error(err?.message)
      })
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr />
        <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <h1>{data}</h1>}</h2>
        <hr />
        <button
          onClick={logout}
          className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>

        <button
          onClick={getUserDetails}
          className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >GetUser Details</button>
      </div>
      {loading && <Loader />}
    </section>
  )
}