import { RolesEnum } from "../../dto/RolesEnum";
import { AddressFlatDto } from "src/app/address/dto/address-dto";

export class RegisterDto {
  public login: string;
  public name: string;
  public surname: string;
  public password: string;
  public email: string;
  public addressDto: AddressFlatDto = new AddressFlatDto();
}
