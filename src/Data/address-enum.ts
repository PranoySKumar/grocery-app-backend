import { registerEnumType } from "type-graphql";

enum AddressType {
  home = "Home",
  work = "Work",
  other = "Other",
}

registerEnumType(AddressType, {
  name: "AddressType", // this one is mandatory
  description: "different types of quantities", // this one is optional
});

export default AddressType;
