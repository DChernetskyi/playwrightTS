import { test, expect } from '@playwright/test';

test('spamalot sms.smso', async ({ request }) => {
  const randomId = Math.floor(Math.random() * 1000000);
    try{
      const responseSms = await request.post('/spamalot/send_sms_to_phone',{
    data: {
      "callback_body":[{}],"callback_url":"http://de2ef01d.dev.favorit:18116/accounts/account/user_phone_delivery_callback","phone_number":"40758607809","provider":"smso","request_id":[{"id":randomId},{"service":"acc_mng"}],"sms_text":"Cod de confirmare: 64737"
    }
  })
  const resp = await responseSms.json()
  expect(resp.status).toBe('ok');
  const respId = resp.response;
  console.log('Успішна відправка смс провайдером SMSO ', resp)
  await new Promise(resolve => setTimeout(resolve, 20000));
   try{const responseStatus = await request.post('/spamalot/get_sms_status',{
     data: {
       "provider":"smso", "messages_id":respId
     }  
  })
  const respStat3 = await responseStatus.json()
  expect(respStat3.status).toBe('ok');
  console.log('Успішна перевірка статусу смс від провайдера SMSO ', respStat3)
} catch(error){
  console.error('Помилка отримання статусу sms, провайдер SMSO: ', error);
  process.exit(1)
}
} catch(error){
  console.error("Помилка при відправці sms, провайдер SMSO: ", error)
  throw error
}
})