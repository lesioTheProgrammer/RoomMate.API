import { WorkTypeEnum } from './work-type-enum.enum';

export class HouseworkDto {
  public id: number;
  public flatId: number;
  public houseWorkDate: Date;
  public description: string;
  public userId: number;
  public username: string;
  public prices: number;
  public workType: WorkTypeEnum = WorkTypeEnum.None;
  public login: string;
}
