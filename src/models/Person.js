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
    this.email = !!email[0].value ? email[0].value : email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = fullName;
    this.phone = !!phone[0].value ? phone[0].value: phone;
    this.assistant = assistant;
    this.group = group;
    this.organization = organization;
    this.organizationAddress = organizationId.address;
    this.order = order;
  }
}
