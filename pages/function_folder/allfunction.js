import { toast } from "react-toastify";
import axiosInstance from "../api/api";
import { myendpoints } from "../api/endpoints";

// Create Function 
export const creation = async (data) => {
    try {
        const apiurl = myendpoints[0]
        const response = await axiosInstance.post(apiurl, data)
        console.log("Fetching create data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        toast.error(error?.response?.data?.errors[0]);
        console.log("Error fetching create data...", error);

    }
}

// Read Function 
export const read = async () => {
    try {
        const apiurl = myendpoints[1]
        const response = await axiosInstance.get(apiurl)
        console.log("Fetching Read data...", response);
        return response?.data?.students
    } catch (error) {
        console.log("Error fetching create data...", error);
    }
}

// Delete Function 
export const deletestudent = async (id) => {
    try {
        const apiurl = `${myendpoints[3]}/${id}`
        const response = await axiosInstance.delete(apiurl)
        console.log("Fetching Delete data...", response);
        toast.warn(response?.data?.message);
        return response
    } catch (error) {
        console.log("Error fetching Delete data...", error);
    }
}

// Single Read Function 
export const singlestudent = async (id) => {
    try {
        const apiurl = `${myendpoints[2]}/${id}`
        const response = await axiosInstance.get(apiurl)
        console.log("Fetching Single data...", response);
        return response
    } catch (error) {
        console.log("Error fetching Single data...", error);
    }
}

// Update Function 
export const updatestudent = async ({ formdata, id }) => {
    try {
        const apiurl = `${myendpoints[4]}/${id}`
        const response = await axiosInstance.put(apiurl, formdata)
        console.log("Fetching Update data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        toast.error(response?.data?.errors[0]);
        console.log("Error Fetching Update data...", error);

    }
}