import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const deleteFavorite = async ({ courseId, token }) => {
    const url = `${import.meta.env.VITE_DELETE_FAVORITE}${courseId}`;
    const response = await axios.delete(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const useDeleteFavorite = (token) => {
    return useMutation({
        mutationFn: ({ courseId }) => deleteFavorite({ courseId, token }),
    });
};