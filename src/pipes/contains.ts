import {Pipe} from 'angular2/core'

@Pipe({
  name: 'contains'
})
export class Contains{
  transform(value, [field, subString]) {
    if(subString) {
      return value.filter((item) => item[field].indexOf(subString) != -1);
    } else {
      return value;
    }
  }
}
