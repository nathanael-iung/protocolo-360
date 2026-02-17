export interface iUserInformationForm {
  fullName: string;
  birthDate: string;
  phone: string;
  gender: 'M' | 'F' | 'O' | any; //TODO: Fix type
  email: string;
  password: string;
  confirmPassword: string;
}
