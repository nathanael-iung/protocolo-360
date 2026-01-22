export interface iUserInformationForm {
  fullName: string;
  birthDate: any; //TODO: Fix type
  phoneNumber: string;
  gender: 'M' | 'F' | 'O' | any; //TODO: Fix type
  email: string;
  password: any; //TODO: Fix type
  confirmPassword: any; //TODO: Fix type
}
