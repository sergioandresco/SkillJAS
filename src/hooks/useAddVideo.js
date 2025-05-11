// src/hooks/useAddVideo.js
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from "@clerk/clerk-react";

const API_URL = import.meta.env.VITE_ADD_VIDEO;

export const useAddVideo = () => {
    const { getToken } = useAuth();

    return useMutation({
        mutationFn: async (data) => {
            const token = await getToken();

            const response = await axios.post(
                API_URL,
                data,
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