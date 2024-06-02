Svarbu: Prieš naudojant, užtikrinkite, kad būtų paleistas serveris: npm run start

Modeliai: user (vartotojas) ads (mechaniku skelbimai) likes (patiktukai)

Folderiai: middleware: autorizacija ir autentifikacija config: duomenų bazės prisijungimas su mongoose routes: HTTP maršrutai susieti su funkcijomis models: schemos, duomenų struktūra controllers: užklausų valdymas ir "smegenys" server.js: serveris, prisijungimas prie DB, struktūra

Postman operacijos VARTOTOJAI (USERS): Sukurti naują vartotoją: Metodas: POST Adresas: http://localhost:5000/api/users Body: raw, JSON { "username": "...", "email": "...", "password": "..." }

Prisijungti prie vartotojo: Metodas: POST Adresas: http://localhost:5000/api/users/login Body: raw, JSON { "email": "...", "password": "..." }

ADS (skelbimai): Sukurti skelbima vartotojui: Metodas: POST Adresas: http://localhost:5000/api/ads Headers: Key: authorization Value: Bearer + jwtToken (gaunamas prisijungiant) Body: raw, JSON { "name": "...", "surname": "...", "specialization": "...", "serviceName": "..." , "img": "...", "city": "...", } Kam leidžiama ši operacija: visiems

Gauti vartotojo skelbimus: Metodas: GET Adresas: http://localhost:5000/api/ads/user Headers: Key: authorization Value: Bearer + jwtToken (gaunamas prisijungiant) Kam leidžiama ši operacija: visiems

Gauti visus skelbimus: Metodas: GET Adresas: http://localhost:5000/api/ads

Atnaujinti vartotojo skelbima: Metodas: PUT Adresas: http://localhost:5000/api/:ad_id Headers: Key: authorization Value: Bearer + jwtToken (gaunamas prisijungiant) Pasirenki ka nori atnaujinti: Body: raw, JSON { "name": "...", "surname": "...", "specialization": "...", "serviceName": "..." , "img": "...", "city": "...", } Kam leidžiama ši operacija: vartotojui

Ištrinti vartotojo skelbima: Metodas: DELETE Adresas: http://localhost:5000/api/ads/:ad_id Headers: Key: authorization Value: Bearer + jwtToken (gaunamas prisijungiant) Kam leidžiama ši operacija: vartotojui

Likes (patiktukai): Sukurti patiktuka: Metodas: POST Adresas: http://localhost:5000/api/likes Headers: Key: authorization Value: Bearer + jwtToken (gaunamas prisijungiant) Body: raw, JSON {"value": "...", "ad": "ad_id"} Kam leidžiama ši operacija: prisijungusiems vartotojams

Atnaujinti patiktuka: Methodas: PUT Adresas: http://localhost:5000/api/likes/:like_id Headers: Key: authorization Value: Bearer + jwtToken (gaunamas prisijungiant) Body: raw, JSON {"value": "...", "ad": "ad_id"} Kam leidžiama ši operacija: vartotojui