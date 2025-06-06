# gestor_de_recursos/Dockerfile
FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1
WORKDIR /app

# Copiamos sólo el requirements.txt que ahora sí existe
COPY requirements.txt /app/requirements.txt

RUN pip install --upgrade pip \
    && pip install -r /app/requirements.txt

# Copiamos todo el código de Django (contexto será gestor_de_recursos/)
COPY . /app

EXPOSE 8000

CMD ["sh", "-c", "python3 manage.py migrate && python3 manage.py runserver 0.0.0.0:8000"]
