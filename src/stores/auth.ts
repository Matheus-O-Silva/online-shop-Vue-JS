import { defineStore } from 'pinia';
import { AuthInterfaceState } from '@/types/AuthInterfaceState';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: (): AuthInterfaceState => ({
      token: null,
      user: null,
    }),
    actions: {
        async login(email: string, password: string) {
          try {
            const response = await axios.post('/api/login', { email, password });
            this.token = response.data.token;
            this.user = response.data.user;
            
            if(this.token){
                localStorage.setItem('token', this.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            }
            
          } catch (error) {
            throw new Error('Erro ao realizar login');
          }
        },
        logout() {
          this.token = null;
          this.user = null;
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
        },
      },
    });

export default useAuthStore