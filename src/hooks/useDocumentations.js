import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_ALL_DOCUMENTATION;

export const useDocumentations = (token) => {
    return useQuery({
        queryKey: ["documentations"],
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