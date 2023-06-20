# #!/bin/bash

echo '..... removing data from all tables'
ts-node prisma/seeding-helpers/delete-admission-data.seed.ts 

# echo 'seeding USER and CHARMS data'
# ts-node prisma/seed.ts   
