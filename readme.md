# Base Discord Bot Typescript

Esta es una base modular y escrito casi nativo en typescript para hacer un bot de discord listo para usar.

## Uso

### .env

Lo unico importante es el `MODE_DEV` si tiene `true` o `false`, si estas programando es `true` y si lo vas a usar en produccion es `false`.

### Paths

Los paths sirven para no poner `../../utils/discord`, si no para poner `@utils/discord` y que el compilador sepa que es un path relativo. 

Para eso tienes que ajustar el `tsconfig.json` y `paths.ts` a mas aliases que quieras.

### JSON DB

He colocado una pequeña Lib para usar JSON como base de datos.

#### Instanciar

Importar el servicio y crear una instancia.

* `fileName`: Nombre del archivo JSON.
* `path`: Ruta donde se guardara el archivo. (Debes crear la carpeta antes)

```ts
import { JsonService } from '@Services/json';
const json = new JsonService({
  fileName: 'topics.json',
  path: './tmp',
});
```

#### Como usar (Ejemplo)

```ts
interface ITopic {
    msg: string, 
    thread: string, 
    channel: string, 
    topic: {[key: string]: string[]}, 
    status: string
}

let topic: ITopic = topics[thread as string];

topic.topic = {
    ...topic.topic,
    [customId]: topicSelected,
}
json.write(topics);
```

Lo que se hizo
