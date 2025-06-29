import { create } from 'zustand'
import axios from 'axios'

type props = {
    user: {};
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    isLoading: boolean;
    error: string;
    role: string;
    success: string;
    message: string;
    signup: (name: string, email: string, password: string) => Promise<{} | null>
    verifyEmail: (code: string) => Promise<{} | null>
    login: (email: string, password: string) => Promise<{} | null>
    logout: () => Promise<void>
}

const serverUrl = 'http://localhost:8080/api/auth'

export const useAuthStore = create<props>((set: any) => ({
    user: {},
    isAuthenticated: false,
    isCheckingAuth: false,
    isLoading: false,
    error: '',
    role: '',
    message: '',
    success: '',

    signup: async (name: string, email: string, password: string): Promise<{} | null> => {

      set({isLoading: true, error: null, user: null })

      try {
          const response = await axios.post(`${serverUrl}/signup`, {name, email, password}, {withCredentials: true} )

          console.log(response.data)
  
          if(response.data.success) {
              set({isLoading: false, user: response.data.user})
              return response.data.user || {};
          } else {
              set({isLoading: false});
              return null;
          }
      } catch (error: any) {
        console.log(error)
        set({isLoading: false, user: null, error: error.message})
        return null;
      }
    },

    verifyEmail: async (code: string): Promise<{} | null> => {
        set({isLoading: true, user: null, error: null})

       try {
         const response = await axios.post(`${serverUrl}/verify-email`, {code}, {withCredentials: true})

         console.log(response.data)
 
         if(response.data.success) {
             set({isLoading: false, user: response.data.user, error: null })
             return response.data.user || {}
         }  else {
              set({isLoading: false});
              return null;
          }
       } catch (error: any) {
            console.log(error)
            set({isLoading: true, user: null, error: error.message})
            return null
       }
    },

    login: async (email: string, password: string): Promise<{} | null> => {

        set({isLoading: true, user: null, error: null, isCheckingAuth: true, isAuthenticated: false, role: null})

   try {
    const response = await axios.post(`${serverUrl}/login`, { email, password }, { withCredentials: true });

    if (response.data.success) {
      const user = response.data.user;
      const role = user.role;
      const message = response.data.message;

      set({
        isLoading: false,
        user,
        error: null,
        isCheckingAuth: false,
        isAuthenticated: true,
        role,
        message
      });

      return { success: true, user, role, message };
    } else {
      set({
        isLoading: false,
        error: response.data.message || 'Login failed',
        isCheckingAuth: false,
        isAuthenticated: false,
        role: null
      });

      return { success: false, error: response.data.message || 'Login failed' };
    }
  } catch (error: any) {
    console.error(error);

    const errMsg = error.response?.data?.message || error.message || 'Login failed';

    set({
      isLoading: false,
      user: null,
      error: errMsg,
      isCheckingAuth: false,
      isAuthenticated: false,
      role: null
    });

    return { success: false, error: errMsg };
  }
},

    logout: async (): Promise<void> => {
        try {
           const response = await axios.post(`${serverUrl}/logout`) 
           set({ user: null, role: null, error: null, message: response.data.message });
        } catch (error: any) {
            console.log(error)
            set({ error: error.message})
        }
    }


}))