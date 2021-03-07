/**
 * Created by Yes.Man on 2021/3/6 11:39 上午.
 */
import { StringOrNull } from './Types';

/*
 * 联系人状态
 */
export interface IPersonState {
  FirstName: string,
  LastName: string,
  Address1: string,
  Address2: StringOrNull,
  Town: string,
  County: string,
  PhoneNumber: string;
  Postcode: string,
  DateOfBirth: StringOrNull,
  PersonId: string
}

export class PersonState implements IPersonState {
  public FirstName: string = '';
  public LastName: string = '';
  public Address1: string = '';
  public Address2: StringOrNull = '';
  public Town: string = '';
  public County: string = '';
  public PersonId: string = '';
  public PhoneNumber: string = '';
  public Postcode: string = '';
  public DateOfBirth: StringOrNull = '';
}
