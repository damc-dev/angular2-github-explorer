import {Pipe} from 'angular2/core'

@Pipe({
  name: 'contains'
})
export class Contains{
  transform(value, [field, subString]) {
    console.log(subString);
    if (subString && typeof subString == "string") {
      console.log("Filtering " + field + " results by " + subString);
      return value.filter((item) => item[field].indexOf(subString) != -1);
    } else if (subString && subString instanceof Array && subString.length != 0) {
      console.log("Filtering " + field + " results by " + subString);
      return value.filter((item) => subString.indexOf(item[field]) != -1);
    } else {
      return value;
    }
  }
}
