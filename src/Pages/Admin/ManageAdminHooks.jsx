import { useState } from "react";
import apiClient from "../../api";
export const useAddAdmin = (endpoint) => {
  const addAdmin = async (adminData) => {
    try {
      const response =  await apiClient.post(endpoint, adminData);
      return response.data; // Success message
    } catch (error) {
      console.error("Error adding admin:", error);
      throw error.response.data; // Error message
    }
  };

  return addAdmin;
};
export const useDeleteAdmin = (endpoint) => {
  const deleteAdmin = async (id) => {
    try {
      const response = await apiClient.delete(`${endpoint}/${id}`);
      return response.data; // Success message
    } catch (error) {
      console.error("Error deleting admin:", error);
      throw error.response.data; // Error message
    }
  };

  return deleteAdmin;
};
