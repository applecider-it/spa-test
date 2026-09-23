import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
} from '@nestjs/common';

/**
 * リスエスト全体をTrimする
 */
@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return this.trim(value);
  }

  private trim(value: any): any {
    if (typeof value === 'string') {
      return value.trim();
    }

    if (Array.isArray(value)) {
      return value.map((v) => this.trim(v));
    }

    if (value !== null && typeof value === 'object') {
      const result = {};
      for (const key in value) {
        result[key] = this.trim(value[key]);
      }
      return result;
    }

    return value;
  }
}