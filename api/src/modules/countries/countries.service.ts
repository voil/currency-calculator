import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '../core/services/config.service';

/**
 * CalculatorCountriesInterface.
 * Interface calculator countries.
 */
interface CalculatorCountriesInterface {
  id: string;
  name: string;
  alpha3: string;
  currencyId: string;
  currencyName: string;
  currencySymbol: string;
}

/**
 * CountriesService
 * Countries serivce.
 */
@Injectable()
export class CountriesService {
  /**
   * Constructor of class.
   */
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  /**
   * Method to get countries list.
   * @return Promise<Array<CalculatorCountriesInterface>>
   */
  public async getList(): Promise<Array<CalculatorCountriesInterface>> {
    const response = await this.httpService
      .get(
        `${this.configService.get(
          'API_URL',
        )}/countries?apiKey=${this.configService.get('API_KEY')}`,
      )
      .toPromise();

    return Object.keys(response.data.results).map(
      (country: string) => response.data.results[country],
    );
  }
}
