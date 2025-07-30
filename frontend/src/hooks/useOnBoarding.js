import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api.js";


const useOnBoarding = () => {
  const queryClient = useQueryClient();
  const {mutate, isPending} = useMutation({
    mutationFn : completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"]});
    },
    onError: (error)=>{
      toast.error(error?.response?.data?.message)
    }
  });
  return { isPending, onboardingMutation: mutate};
}

export default useOnBoarding;
