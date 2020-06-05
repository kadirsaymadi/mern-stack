# MapApp API Service

`API servis dökümantasyonu`

### Kullanım
```
    > Login dışında yapılan tüm isteklerde `token` gönderilmesi zorunludur.
    > `token` nesnesi servise "Post Body" içerisinde `{ 'token':'asd123' }` , "headers" içerisinde `{ 'x-access-token':'asd123' }` yada "query" içersisinde `?token=asd123` şeklinde gönderilebilir
    > Not: `token` headers içerisinde `x-access-token` olarak gönderilirse servis daha sağlıklı çalışacaktır.
```

# Login
| Route | HTTP Verb	| POST body | Result Data | Description	 |
| --- | --- | --- | --- | --- |
| /sign-in | `POST` | { 'email':'user@mail.com', 'password':'xxx'} | `Type: Object, Data Description: Json Web Token` | ` Geriye dönen data kullanıcı için üretilen json web token.`|