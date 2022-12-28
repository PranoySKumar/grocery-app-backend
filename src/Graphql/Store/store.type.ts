import { Authorized, Field, ObjectType } from "type-graphql";
import { Role } from "../../Utils/auth";

@ObjectType()
export class EditingType {
  @Field() isAllowed?: boolean;
  @Field() productAllowed?: boolean;
  @Field() profileDetailsAllowed?: boolean;
}

@ObjectType()
export class StoreType {
  @Authorized([Role.admin, Role.store]) @Field() id?: string;
  @Authorized([Role.admin, Role.store]) @Field() name?: string;
  @Authorized([Role.admin, Role.store]) @Field() email?: string;
  @Authorized([Role.admin, Role.store]) @Field() phoneNumber?: number;
  @Authorized([Role.admin, Role.store]) @Field(type => EditingType) editing?: EditingType;
  @Authorized([Role.admin, Role.store]) @Field() tax?: number;
  @Field() deliveryTime?: string;
  @Authorized([Role.admin, Role.store]) @Field() deliveryPartnerFee?: number;
  @Authorized([Role.admin, Role.store]) @Field() createdAt!: Date;
  @Authorized([Role.admin, Role.store]) @Field() updatedAt!: Date;
}
