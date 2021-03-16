/**
 * Created by Yes.Man on 2021/8/29 17:56.
 * @file: Types
 */

export type StringOrNull = string | null

export interface IPersonState {
  FirstName: string,
  LastName: string,
  Address1: string,
  Address2: string,
  Town: string,
  County: string,
  PhoneNumber: string,
  Postcode: string,
  DateOfBirth: StringOrNull,
  PersonId: string
}
