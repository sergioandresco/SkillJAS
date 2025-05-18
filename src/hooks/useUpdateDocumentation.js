import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const API_URL = import.meta.env.VITE_UPDATE_DOCUMENTATION;

export const useUpdateDocumentation = () => {
    const { getToken } = useAuth();

    return useMutation({
        mutationFn: async ({ id, updatedData }) => {
            const token = await getToken();

            const response = await axios.put(
                `${API_URL}${id}`,
                updatedData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'X-Role': 'admin',
                    },
                }
            );

            return response.data;
        },
    });
};