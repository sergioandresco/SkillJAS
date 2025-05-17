import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useVideoDetail = (id, token) => {
    return useQuery({
        queryKey: ['video', id],
        queryFn: async () => {
            const { data } = await axios.get(`https://skilljas-backend.onrender.com/api/Courses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        },
        enabled: !!id && !!token,
    });
};