import { create } from 'zustand'
import axios from 'axios'

type props = {
    user: {};
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    isLoading: boolean;
    formError: string;
    checkAuthError:string;
    role: string;
    success: string;
    message: string;
    signup: (name: string, email: string, password: string) => Promise<{} | null>
    verifyEmail: (code: string) => Promise<{} | null>
    login: (email: string, password: string) => Promise<{} | null>
    logout: () => Promise<void>
    forgotPassword: (email: string) => Promise<{} | null>
    resetPassword: (password: string, token: string) => Promise<{} | null>
    checkAuth: () => Promise<void>
    updateUser: (name: string, id: string) => Promise<{} | null>
}

const serverUrl = 'http://localhost:8080/api/auth'

export const useAuthStore = create<props>((set: any) => ({
    user: {},
    isAuthenticated: false,
    isCheckingAuth: true,
    isLoading: false,
    formError: '',
    checkAuthError: '',
    role: '',
    message: '',
    success: '',

    signup: async (name: string, email: string, password: string): Promise<{} | null> => {

      set({isLoading: true, formError: null, user: null })

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
        set({isLoading: false, user: null, formError: error.message})
        return null;
      }
    },

    verifyEmail: async (code: string): Promise<{} | null> => {
        set({isLoading: true, user: null, formError: null})

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
            set({isLoading: false, user: null, formError: error.message})
            return null
       }
    },

    login: async (email: string, password: string): Promise<{} | null> => {

        set({isLoading: true, user: null, formError: null, isAuthenticated: false, role: null})

   try {
    const response = await axios.post(`${serverUrl}/login`, { email, password }, { withCredentials: true });

    if (response.data.success) {
      const user = response.data.user;
      const role = user.role;
      const message = response.data.message;

      set({
        isLoading: false,
        user,
        fromError: null,
        isCheckingAuth: false,
        isAuthenticated: true,
        role,
        message
      });

      return { success: true, user, role, message };
    } else {
      set({
        isLoading: false,
        formError: response.data.message || 'Login failed',
        isCheckingAuth: false,
        isAuthenticated: false,
        role: null
      });

      return { success: false, formError: response.data.message || 'Login failed' };
    }
  } catch (error: any) {
    console.error(error);

    const errMsg = error.response?.data?.message || error.message || 'Login failed';

    set({
      isLoading: false,
      user: null,
      formError: errMsg,
      isCheckingAuth: false,
      isAuthenticated: false,
      role: null
    });

    return { success: false, error: errMsg };
  }
},

    logout: async (): Promise<void> => {
        try {
           const response = await axios.post(`${serverUrl}/logout`, {}, {withCredentials: true}) 
           set({ user: null, role: null, formError: null, message: response.data.message });
        } catch (error: any) {
            console.log(error)
            set({ formError: error.message})
        }
    },

    forgotPassword: async(email: string): Promise<{} | null> => {
      set({isLoading: true, user: null, formError: null, message: null, role: null})

      try {
       const response = await axios.post(`${serverUrl}/forgot-password`, {email}, {withCredentials: true});
     
       set({ 
        isLoading: false, 
        user: response.data.user || null, 
        message: response.data.message 
      });

      return response.data; // return the whole backend response


      } catch (error: any) {
        console.log(error)
        set({isLoading: false, user: null, formError: error.message, message: null})

        return null

      }
    },

    resetPassword: async(password: string, token: string): Promise<{} | null> => {
      set({isLoading: true})

      try {
        
        const response = await axios.post(`${serverUrl}/reset-password/${token}`, {password}, {withCredentials: true})

        set({user: response.data.user, formError: null, isLoading: false})  

        return response.data

      } catch (error: any) {
        
        console.log(error)
        set({isLoading: false, formError: error.message, user: null})
        return { success: false, message: error.message };  // ✅ always return fallback shape
      }
    },

   checkAuth: async (): Promise<void> => {
  set({ isCheckingAuth: true, checkAuthError: null }); // Don't reset isAuthenticated yet

  try {
    const response = await axios.get(`${serverUrl}/check-auth`, {
      withCredentials: true, // VERY IMPORTANT for cookies!
    });

    if (response.data.user) {
      set({
        isAuthenticated: true,
        user: response.data.user,
      });
      console.log("Checking auth...");
      console.log("Response:", response.data);

    } else {
      set({
        isAuthenticated: false,
        user: null,
      });
    }
  } catch (error: any) {
    console.error("checkAuth error", error);
    set({
      isAuthenticated: false,
      user: null,
      checkAuthError: error.message,
    });
  } finally {
    set({ isCheckingAuth: false });
  }
  },

  updateUser: async (name: string, id: string): Promise<{} | null> => {
    set({isLoading: true})

    try {
      
      const response = await axios.put(`${serverUrl}/update-user/${id}`, {name}, {withCredentials: true})

      if(response.data.success) {
        set({
          isLoading: false,
          user: response.data.user
        })
         return response.data.user || {}
      } else {
        set({
          isLoading: false,
          user: null,
          formError: response.data.message || 'Error in User update'
        })
        return null
      }

    } catch (error: any) {
      console.log(error)
      set({
        isLoading: false,
        formError: error.message
      })
      return null
    }
  }



}))