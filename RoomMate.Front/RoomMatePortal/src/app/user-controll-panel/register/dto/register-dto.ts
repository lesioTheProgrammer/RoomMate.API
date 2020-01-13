import { RolesEnum } from "../../dto/RolesEnum";

export class RegisterDto {
  public login: string;
  public name: string;
  public surname: string;
  public password: string;
  public email: string;
  public roletype: RolesEnum;
  public cityId: number;
}

