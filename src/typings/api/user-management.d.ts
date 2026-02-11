declare namespace Api {
  namespace SystemManagement {
    /** user gender */
    type UserGender = '1' | '2';

    /** user search params */
    interface UserSearchParams extends Common.CommonSearchParams {
      userName?: string;
      userGender?: UserGender;
      nickName?: string;
      userPhone?: string;
      userEmail?: string;
      status?: Common.EnableStatus;
    }

    /** user */
    interface User extends Common.CommonRecord {
      /** user name */
      userName: string;
      /** user gender */
      userGender: UserGender | null;
      /** nick name */
      nickName: string;
      /** user phone */
      userPhone: string;
      /** user email */
      userEmail: string;
      /** user role codes */
      userRoles: string[];
    }

    /** user list */
    type UserList = Common.PaginatingQueryRecord<User>;
  }
}
