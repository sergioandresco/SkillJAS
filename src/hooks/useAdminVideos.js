import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const ALL_VIDEOS_URL = import.meta.env.VITE_ADD_VIDEO;
const STATUS_VIDEO_URL = import.meta.env.VITE_STATUS_COURSES;

export function useAdminVideos() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth(); // Clerk

  // 1. Obtener todos los videos
  const { data, isLoading } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const response = await axios.get(ALL_VIDEOS_URL);
      return response.data?.items || [];
    },
  });

  // 2. Habilitar video
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

  // 3. Deshabilitar video
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
    videos: data || [],
    isLoading,
    enableVideo: enableMutation.mutate,
    disableVideo: disableMutation.mutate,
  };
}