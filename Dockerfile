FROM python:3.12

WORKDIR /bdir

RUN pip install --upgrade pip &&\
    pip install bottle # bibliotecas que vamos usar 

EXPOSE 8080

CMD ["python3", "route.py"]

