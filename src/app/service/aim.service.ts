import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class AimService {

  constructor(private http: HttpClient) { }

  getData() {
   return this.http.get('http://demo5116181.mockable.io/section/data');
   /* return [
      {
        name: "Razdel1", value: "Персональные данные", body: [
          { type: "text", name: "name", value: "", placeholder: "Имя", validation: { required: true, minLength: 2, maxLength: 100 } },
          { type: "text", name: "surname", value: "", placeholder: "Фамилия", validation: { minLength: 2, maxLength: 100 } },
          { type: "number", name: "age", value: "", placeholder: "Возраст", validation: { required: true, min: 18, max: 80 } },
          { type: "date", name: "date1", value: "", placeholder: "", validation: {} }
        ]
      },
      {
        name: "Razdel2", value: "Cредства связи", body: [
          { type: "text", name: "tel1", value: "", placeholder: "Телефон1", validation: { pattern: '[0-9]*' } },
          { type: "text", name: "tel2", value: "", placeholder: "Телефон2", validation: { pattern: '[0-9]*' } },
          { type: "text", name: "email", value: "", placeholder: "Электронная почта", validation: { required: true, email: true } },
          { type: "text", name: "fax", value: "", placeholder: "Факс", validation: {} }
        ]
      },
      {
        name: "Razdel3", value: "Адреса", body: [
          { type: "text", name: "country", value: "", placeholder: "Страна", validation: {} },
          { type: "text", name: "city", value: "", placeholder: "Город", validation: {} },
          { type: "text", name: "street", value: "", placeholder: "Улица", validation: {} },
        ]
      },
      {
        name: "Razdel4", value: "Дополнительная информация", body: [
          { type: "text", name: "inn", value: "", placeholder: "ИНН", validation: {pattern: '[0-9]{10}'} },
          { type: "text", name: "passport", value: "", placeholder: "Серия паспорта", validation: {} },
          { type: "radio", name: "isrezident", value: "", placeholder: "Резидент", validation: {} },
          { type: "file", name: "file", value: "", placeholder: "", validation: {} },
        ]
      }
    ];*/
  }

  postData(data: {}){
    return this.http.post('http://demo5116181.mockable.io/section/data',data);
  }

}
