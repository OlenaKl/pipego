// @flow

export default class Person{
  constructor(
    id: number,
    email?: Array,
    fullName: string,
    phone?: Array,
    organization: string,
    organizationId: Object,
    firstName?: string,
    lastName?: string,
    group?: string,
    assistant?: string,
    order?:number
  ) {
    this.id = id;
    this.email = typeof email === 'string' ?  email : email[0].value;
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = fullName;
    this.phone = typeof phone === 'string' ? phone : phone[0].value;
    this.assistant = assistant;
    this.group = group;
    this.organization = organization;
    this.organizationAddress = organizationId.address;
    this.order = order;
  }
}
