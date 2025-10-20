import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
// import { useAuthContext } from "../components/auth";


// const { data } = useAuthContext();
export const errorHandler = (error: AxiosError | unknown) => {

  if (axios.isAxiosError(error)) {
    if (error.code === "ERR_NETWORK" || !error.response) {
      toast.error("Server is unreachable. Please try again later.");
    } else if (error?.response) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } else if (error?.request) {
      toast.error("Network error. Please check your connection.");
    } else {
      toast.error("An error occurred. Please try again.");
    }
  } else {
    toast.error("Unexpected error occurred.");
  }
};


