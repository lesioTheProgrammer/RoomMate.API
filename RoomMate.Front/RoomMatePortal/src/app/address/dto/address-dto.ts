import { UserListDto } from "src/app/user-controll-panel/dto/user-list-dto";

 export class AddressDto {
  public cityId: number;
  public cityName: string;
  public street: string;
  public houseNumber: string;
  public flatNumber: string;
  public id: number;
  public allAddress: string;
  public flatName: string;
  public roomCount: number;
  public users: UserListDto[];
  public loggedUserName: string;
}
