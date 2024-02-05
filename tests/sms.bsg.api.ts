import { test, expect } from '@playwright/test';

test('spamalot sms.bsg', async ({ request }) => {
  const randomId = Math.floor(Math.random() * 1000000);
    try{
      const responseSms = await request.post('/spamalot/send_sms_to_phone',{
      data: {
      "callback_body":[{}],"callback_url":"http://de2ef01d.dev.favorit:10116/accounts/account/user_phone_delivery_callback","phone_number":"380639651043","provider":"bsg","request_id":[{"id":randomId},{"service":"acc_mng"}],"sms_text":"Kод підтвердження: 48871"
    }
  });
  const resp = await responseSms.json()
  expect(resp.status).toBe('ok');
  const respId = resp.response;
  console.log('Успішна відправка смс провайдером BSG ', resp)
  await new Promise(resolve => setTimeout(resolve, 20000));
   try{const responseStatus = await request.post('/spamalot/get_sms_status',{
     data: {
       "provider":"bsg", "messages_id":respId
     }  
  })
  const respStat2 = await responseStatus.json()
  expect(respStat2.status).toBe('ok');
  console.log('Успішна перевірка статусу смс від провайдера BSG ', respStat2)
} catch(error){
  console.error('Помилка отримання статусу sms, провайдер BSG: ', error);
  process.exit(1)
}
} catch(error){
  console.error("Помилка при відправці sms, провайдер BSG: ", error)
  throw error
}
})