// @flow
import Person from './Person';

export default class PersonList{
    constructor(
      list: Array<Person>,
      next: number,
      nextStart: boolean
    ) {
      this.list = list;
      this.next = next;
      this.nextStart = nextStart;
    }
  }