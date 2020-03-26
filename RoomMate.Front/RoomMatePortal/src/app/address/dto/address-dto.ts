import { UserListDto } from "src/app/user-controll-panel/dto/user-list-dto";
import { RolesEnum } from "src/app/user-controll-panel/dto/RolesEnum";

 export class AddressFlatDto {
  public cityId: number;
  public cityName: string;
  public street: string;
  public houseNumber: string;
  public flatNumber: string;
  public id: number; // flat
  public addressId: number; // addr
  public allAddress: string;
  public flatName: string; // ent
  public roomCount: number; // ent
  public users: UserListDto[];
  public loggedUserName: string; // login
  public roleType: RolesEnum;
  public flatOwnerId: number;
  public area: number; // ent
  public active: boolean;
}
