import { RolesEnum } from "../../dto/RolesEnum";
import { AddressDto } from "src/app/address/dto/address-dto";

export class RegisterDto {
  public login: string;
  public name: string;
  public surname: string;
  public password: string;
  public email: string;
  public roletype: RolesEnum;

  public addressDto: AddressDto = new AddressDto();
}
