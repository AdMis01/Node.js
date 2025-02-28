# Node.js

Odpalanie serwera prawym na server.js i wybieramy Open in integreted terminal i wpisujemy node server.js
Przykład:
05 - tworzenie projektu przez otwarcie Open in integreted terminal i wpisanie 
```
npm init /-y
```
Przykładowe pakiety które są stosowane
```
npm install lodash - funkcje przydatne do pracy z tablicami 
npm install underscore --D d deweloperskie podobne do Lodash
npm install axios -g g instaluje globalnie - biblioteka do wykonywania zapytań HTTP
npm install formidable - uplodowanie plików na server i obsługa formularzy
```
Wyświetlanie listy zainstalowanych pakietów z " -g " odwołuje się do globalnych zainstalowanych pakietów.
```
npm list

npm list -g
```
Instalowanie pakietów globalnie
```
npm install axios -g
```
Aktualizowanie wszystkich pakietów
```
npm update 
```
Odpalenie skrykty/aplikacji
```
node server.js
```
Automatyczne uruchamianie serwera node.js za pośrednictwem pakietu nodemon
```
npm install -D nodemon

nodemon server.js
```
najlepiej globanie to zainstalować

Instalowanie wtyczki do obsługiwania MongoDB
```
npm install mongodb
```
Do mogelowania danych aplikacji
```
npm install mongoose
```
Do zainstalowania frameworka express
```
npm install express
```
Doinstalowywanie do obdługi sessji i cookies
```
npm install cookie-session
```
Potrzebny forlder apliakacji np views > template |pages > home.ejs i public oraz plik np ejs_test.js
```
npm install ejs
```
Instalowanie driverów do MySql i jeszcze musisz użyć npm init -y
```
npm install mysql
npm install mysql2
```
ORM sequelize tak jak odwzorowanie obiektowej architektury systemu informatycznego na bazę danych
```
npm install mysql2
npm install sequelize
```
Zestaw polecienia do zainstalowania listy pakietów do projektu 
```
npm install express passport express-session passport-local ejs
npm install express passport express-session passport-local ejs mongodb mongoose
```
Pakiet do tworzenie kryptowanych wiadomości 
```
npm install bcryptjs
```