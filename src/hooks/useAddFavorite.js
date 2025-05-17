import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_ADD_FAVORITE;

export const useAddFavorite = (token) => {
    return useMutation({
        mutationFn: async (courseId) => {
            const response = await axios.post(
                API_URL,
                { courseId },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        },
    });
};