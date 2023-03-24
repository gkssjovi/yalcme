git clone https://github.com/gkssjovi/yalcme.git
cd yalcme
npm run build
mkdir -p ~/.config/yalcme
cp .env.example .env
cp ./db.json ~/.config/yalcme/db.json
chmod +x ./build/index.js
sudo ln -s "$PWD/build/index.js" /usr/local/bin/yalcme