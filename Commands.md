# Comandos Úteis
**Backend**
1. **Construir as imagens e iniciar os containers**

   ```bash
   docker compose up --build
   ```

2. **Executar o Spotless**

   - Formatar código:
     
     ```bash
     mvn spotless:apply
     ```

3. **Construir o pacote do projeto sem executar os testes**

   ```bash
   mvn clean package -DskipTests
   ```
**Frontend**
1. **Instalar dependências no Front com o NPM**
   ```bash
      npm i
   ```