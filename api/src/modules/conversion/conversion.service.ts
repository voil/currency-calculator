import { hGetCurrentDate } from '../../support/helpers';
import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '../core/services/config.service';

/**
 * ConversionService
 * Conversion serivce.
 */
@Injectable()
export class ConversionService {
  /**
   * Constructor of class.
   */
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  /**
   * Method to get current exchange rate frm api.
   * @param String from
   * @param String to
   * @return Promise<number>
   */
  public async getExchangeRate(from: string, to: string): Promise<number> {
    const response = await this.httpService
      .get(
        `${this.configService.get(
          'API_URL',
        )}/convert?apiKey=${this.configService.get(
          'API_KEY',
        )}&q=${from}_${to}&compact=ultra&date=${hGetCurrentDate()}`,
      )
      .toPromise();
    return response.data[`${from}_${to}`][hGetCurrentDate()];
  }
}
