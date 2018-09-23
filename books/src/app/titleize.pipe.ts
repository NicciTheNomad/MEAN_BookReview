import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'titleize',
})
@Injectable()
export class TitleizePipe implements PipeTransform {
  static skipWords = ['of', 'the', 'a', 'in'];
  transform(value: string) {
    if (typeof value !== 'string') {
      return value;
    }

    const skipWords = TitleizePipe.skipWords;

    return value.replace(/\w[^-\s]*/g, (word, index: number) => {
      console.log('wording', index);
      if (index && skipWords.includes(word.toLowerCase())) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  }
}
