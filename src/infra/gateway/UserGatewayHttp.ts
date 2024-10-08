import Permission from "@/entities/Permission";
import User from "@/entities/User";
import httpAdapter from "@/infra/http/HttpClientAdapter";
import { NAME_TOKEN } from "@/utils/constants";

export default class UserGatewayHttp {
  async login(email: string, password: string): Promise<Response> {
    const device_name = `vue_app${navigator.userAgent}`;
    return await httpAdapter
      .post("/login", {
        email,
        password,
        device_name,
      })
      .then((response) => {
        localStorage.setItem(NAME_TOKEN, response.data.token);
        return Promise.resolve(response);
      });
  }

  async getMe(): Promise<User> {
    const response = await httpAdapter
      .withAuthorization()
      .get("/me")
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem(NAME_TOKEN);
        }
      });
    const { id, name, email, permissions } = response.data.data;
    const permissionsUser: Permission[] = permissions.map(
      (permissionData: any) => {
        const { id, name, description } = permissionData;
        return new Permission(id, name, description);
      }
    );
    const user = new User(id, name, email);
    user.syncPermissions(permissionsUser);
    return user;
  }

  async getPaginate(
    page: number = 1,
    filter: string = "",
    totalPerPage: number = 15
  ): Promise<{ users: User[]; meta: PAGINATION }> {
    const response = await httpAdapter
      .withAuthorization()
      .get(
        `/users?page=${page}&filter=${filter}&total_per_page=${totalPerPage}`
      );
    const usersData = response.data.data;
    const users: User[] = usersData.map((userData: any) => {
      const { id, name, email } = userData;
      return new User(id, name, email);
    });
    return { users, meta: { ...response.data.meta } };
  }

  async create(params: object): Promise<User> {
    const response = await httpAdapter
      .withAuthorization()
      .post("/users", params);
    const { id, name, email } = response.data.data;
    return new User(id, name, email);
  }

  async getById(id: string): Promise<User> {
    const response = await httpAdapter.withAuthorization().get(`/users/${id}`);
    const { name, email } = response.data.data;
    return new User(id, name, email);
  }

  async delete(id: string): Promise<boolean> {
    return await httpAdapter
      .withAuthorization()
      .delete(`/users/${id}`)
      .then(() => true)
      .catch(() => false);
  }

  async update(id: string,params: object): Promise<Response> {
    return await httpAdapter
      .withAuthorization()
      .put(`/users/${id}`, params)
  }
}
