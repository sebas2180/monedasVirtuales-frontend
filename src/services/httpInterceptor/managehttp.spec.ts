import { ManageHttpInterceptor } from './managehttp.interceptor';
import { HttpcancelService } from '../httpCancelService/httpcancel.service';

describe('Managehttp', () => {
  it('should create an instance', () => {
    expect(new HttpcancelService()).toBeTruthy();
  });
});
