rm -rf prisma/migrations
rm -rf ./dist
yarn prisma migrate dev --name=init  

