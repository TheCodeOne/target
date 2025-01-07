import { BadRequestException, Injectable, Optional, PipeTransform } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class ValidationPipe<ZodType extends z.ZodTypeAny> implements PipeTransform<ZodType['_input'], Promise<ZodType['_output']>> {
  constructor(@Optional() private readonly schema?: ZodType) {}

  async transform(value: ZodType['_input']): Promise<ZodType['_output']> {
    if (!this.schema) {
      return value;
    }

    const result = await this.schema.safeParseAsync(value);

    if (!result.success) {
      throw new BadRequestException(
        result.error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`),
        { cause: result.error },
      );
    }

    return result.data as z.infer<typeof this.schema>;
  }
}
