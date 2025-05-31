Entregable #2 de gestor de recursos Grupo #4

Integrantes
Anderson Valencia Jiménez
Carlos Enrique Guillent Carruyo
Julián David Hernández Quintero
Miguel Ángel Correa Pérez
Marlon Adrián Torralvo Arrieta

Maneras de correr el proyecto

Backend
el backend se desarrolló con el framework django con python como lenguaje principal para la lógica.

para inicar el backend seguir estos pasos:

Inicialmente se crea un entorno virtual llamado entorno, así se definió en el equipo
python -m venv
Luego de esto, accedemos al backend
cd .\gestor_de_recursos\ y ejecutamos los requeriments
python -m pip install -r requirements.txt
luego realizamos los cambios requeridos por django
python manage.py makemigrations
python manage.py migrate
python manage.py runserver - para correr el servidor

Frontend

El frontend se desarrolló con el framework react y se realizaron los cambios pertinentes para correrlo con el comendo run dev
Crear otra instancia de terminal para poder correr el front en paralelo
acceder a la carpeta del front
d .\gestor_de_recursos_fe
npm i - para instalar todas las librerías que se usaron y se definieron globalmente
npm run dev

Disfrutar de la belleza de front que nos hicimos con 3 horas de sueño en una semana laksjdkasjd

En este tercer entregable tuvimos varios problemas.

El despliegue del backend se hizo en ngrok dando apertura a un puerto para poder hacer peticiones al local, por ende, permite consumir el backend de manera externa mientras este se ejecute en local.

El front se desplegó en vercel teniendo el siguiente enlace https://equipo4-gestor-de-recursos.vercel.app/

el backend está corriendo localmente en la pc de Carlos Guillent con este enlace https://0204-2803-1800-4017-b892-702a-1cc1-fcbc-e3c8.ngrok-free.app dando acceso de manera no tan acertiva a todo en general.

se debió abrir puertos y quitar auth para poder acceder a lo guardado en bd sin problemas.
