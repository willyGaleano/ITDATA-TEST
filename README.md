# ITDATA CHALLENGE API

Prueba técnica - ITDATA

- [Base URL : http://localhost:3010/v1](http://localhost:3010/v1)

## Config

Crear los archivos .env:

```bash
MONGODB_URL=mongodb://localhost:27018/tokenization
SECRET_KEY=ITDATASECRET
```

## Init

En la raiz del proyecto ejecutar el siguiente comando:

```bash
docker-compose up
```

## Endpoints 🚀

_Generate Token_

localhost:3010/v1/card/generate-token

[![generate-Token.png](https://i.postimg.cc/k5Qg25sv/generate-Token.png)](https://postimg.cc/mcrsqB0P)

Se valida cada campo según lo solicitado

[![validation-Card.png](https://i.postimg.cc/kX28BxbN/validation-Card.png)](https://postimg.cc/Mv8XLftX)

Se valida la existencia de un pk(token) en el header

[![validation-PK.png](https://i.postimg.cc/pV4rc3m8/validation-PK.png)](https://postimg.cc/gryGnSqk)


_Get Card_

localhost:3010/v1/card/find?token=token

[![getCard.png](https://i.postimg.cc/cHT94Qny/getCard.png)](https://postimg.cc/PppzSvy2)

Si el token vence nos mostrará ese detalle

[![expired-Token.png](https://i.postimg.cc/d0VTcrwT/expired-Token.png)](https://postimg.cc/G46pkBBc)

Se valida la existencia de un pk(token) en el header

[![validation-PKGet-Card.png](https://i.postimg.cc/yYfgKnYX/validation-PKGet-Card.png)](https://postimg.cc/gnZkqVhn)

---

## Explicación de la construcción del proyecto

https://docs.google.com/document/d/1HCfV-xVDxUWwt3aYZlEUGEC608oE17t4Jj3ae5Nzr_M/edit?usp=sharing