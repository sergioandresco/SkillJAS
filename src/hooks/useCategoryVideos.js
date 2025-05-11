import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_CATEGORY_VIDEOS;

export const useCategoryVideos = (category, token, page = 1) => {
    return useQuery({
        queryKey: ["categoryVideos", category, page],
        queryFn: async () => {
            const response = await axios.get(`${BASE_URL}=${category}&Page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        },
        enabled: !!token && !!category,
    });
};