import { defineStore } from 'pinia';
import { AuthInterfaceState } from '@/types/AuthInterfaceState';
import UserGatewayHttp from "@/infra/gateway/UserGatewayHttp";
import axios from 'axios';

const userGateway = new UserGatewayHttp();

export const useAuthStore = defineStore('auth', {
    state: (): AuthInterfaceState => ({
      token: null,
      user: null,
    }),
    actions: {
        async auth(email: string, password: string): Promise<Response> {
          return await userGateway.login(email, password);
        },
        async getMe() {
            await userGateway.getMe().then((user) => (this.me = user));
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