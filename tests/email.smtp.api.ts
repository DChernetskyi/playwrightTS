import { test, expect, APIResponse } from '@playwright/test';

test('spamalot email.smtp', async ({ request }) => {
  try{
    const response = await request.post('/spamalot/send/notify_template',{
    data: {
      "sender": "favbet", "provider":"smtp", "payload_template":{"inline":"sms text"}, "recipients":{"0639651043w@gmail.com":{"subject":"123"}}
    }
  });
  const resp = await response.json()
  expect(resp.status).toBe('ok');
  console.log('Успішна відправка пошти провайдером SMTP ', resp)
      }catch(error){
        console.error("Помилка при відправці email:", error);
        throw error;
      }
});