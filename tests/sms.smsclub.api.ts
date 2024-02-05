import { test, expect} from '@playwright/test';

test('spamalot sms.smsclub', async ({ request, page }) => {
  const randomId = Math.floor(Math.random() * 1000000);
  try{
    const responseSmsClub = await request.post('/spamalot/send_sms_to_phone',{
    data: {
      "callback_body":[{}],"callback_url":"http://de2ef01d.dev.favorit:18116/accounts/account/user_phone_delivery_callback","phone_number":"380639651043","provider":"smsclub","request_id":[{"id":randomId},{"service":"acc_mng"}],"sms_text":"12345"
    }
  });
  const resp1 = await responseSmsClub.json()
  expect(resp1.status).toBe('ok');
  const respId1: string = resp1.response;
  console.log('Успішна відправка смс провайдером SMSCLUB ', resp1)
  await page.waitForTimeout(20000);
  try {
      const responseStatusSmsClub = await request.post('/spamalot/get_sms_status', {
        data: {
          "provider": "smsclub",
          "messages_id": respId1
      }
      });
      const respStat1 = await responseStatusSmsClub.json();
      expect(respStat1.status).toBe('ok');
      console.log('Успішна перевірка статусу смс від провайдера SMSCLUB ', await respStat1)
      } catch (error) {
       console.error('Помилка отримання статусу sms, провайдер SMSCLUB: ', error);
       process.exit(1)
      }
    } catch(error){
     console.error("Помилка при відправці sms, провайдер SMSCLUB: ", error)
     throw error
    }
  });