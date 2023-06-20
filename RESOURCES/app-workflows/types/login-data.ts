export class LoginData {
  user: User;
  profile: Profile;
  auth_token: string;
}

class Profile {
  userId: string;
  patientId: null;
  guardianId: null;
  employeeId: null;
  isSuperAdmin: boolean;
  roles: Role[];
}

class Role {
  role: string;
}

class User {
  userId: string;
  gender: null;
  birthDate: null;
  mobile: string;
  firstName: string;
  lastName: null;
  middleName: null;
  username: string;
  email: string;
  title: null;
  height: null;
}
