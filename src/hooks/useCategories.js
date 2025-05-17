import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_CATEGORIES;

export const useCategories = (token) => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data } = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        },
        enabled: !!token,
    });
};