import {Pipe} from 'angular2/core'

@Pipe({
  name: 'startsWith'
})
export class StartsWith{
  transform(value, [field, letter]) {
    console.log(value);
    if(letter) {
      return value.filter((item) => item[field].startsWith(letter));
    } else {
      return value;
    }
  }
}
