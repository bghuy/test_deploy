import axios from "@/setup/axios";
export const checkAuth = async () => {
    try {
        const response = await axios.get("/auth/profile");
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            console.log("User not found!", error.message);
        } else {
            console.log("User not found!", "An unknown error occurred");
        }
    }
};

export const LoginByCredentials = async (email: string, password: string) => {
    const baseURL = process.env.NEXT_PUBLIC_SERVER_MODE === 'production' ? process.env.NEXT_PUBLIC_SERVER_PRODUCTION_URL : process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT_URL;
    try {
      const response = await fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
};
  