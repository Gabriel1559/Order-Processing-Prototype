import { Injectable } from '@nestjs/common';
import { parseEDIFACT } from './parse/edifactParse.js';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getBye(): string {
  return parseEDIFACT();
}
}
