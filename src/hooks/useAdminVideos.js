import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const ALL_VIDEOS_URL = import.meta.env.VITE_ADD_VIDEO;
const STATUS_VIDEO_URL = import.meta.env.VITE_STATUS_COURSES;

export function useAdminVideos(page = 1) {
    const queryClient = useQueryClient();
    const { getToken } = useAuth();

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["videos", page],
        queryFn: async () => {
          const response = await axios.get(`${ALL_VIDEOS_URL}?Page=${page}`);
          return response.data;
        },
        keepPreviousData: true,
    });

    const enableMutation = useMutation({
      mutationFn: async (id) => {
        const token = await getToken();
        return await axios.patch(
          `${STATUS_VIDEO_URL}/${id}/enable`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Role": "admin",
            },
          }
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["videos"] });
      },
    });

    const disableMutation = useMutation({
      mutationFn: async (id) => {
        const token = await getToken();
        return await axios.patch(
          `${STATUS_VIDEO_URL}/${id}/disable`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Role": "admin",
            },
          }
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["videos"] });
      },
    });

    return {
        videos: data?.items || [],
        totalPages: data?.totalPages || 1,
        isLoading,
		isFetching,
        enableVideo: enableMutation.mutate,
        disableVideo: disableMutation.mutate,
    };
}