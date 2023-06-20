
#!/bin/bash
# Define colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
# Get the IP address of the Wi-Fi interface
if [ -z "$1" ]; then
  echo -e "${YELLOW}=========================================================${NC}"
  echo -e "${RED}PLEASE GIVE AN ENVIRONMENT, --- (ahmad, abdullah, or zaid)${NC}"
  echo -e "${YELLOW}=========================================================${NC}"
  exit 0
fi

filename="scripts/config/$1/env"
echo ${filename}

if [ -e "$filename" ]; then
    echo "Environment exists, configuring ..."
else
  echo -e "${YELLOW}=========================================================${NC}"
  echo -e "${RED} ENVIRONMENT DOES NOT EXIST -- (ahmad, abdullah, or zaid)${NC}"
  echo -e "${YELLOW}=========================================================${NC}"
  exit 0
fi

ip_address=$(ipconfig getifaddr en0)

echo -e "${YELLOW}=========================================================${NC}"
echo -e "${RED} IP Address : ${ip_address} ${NC} - Updated 'env.conf' "
echo -e "${YELLOW}=========================================================${NC}"


cp ./scripts/config/$1/env ./.env
# cp ./PROJECT/schema.prisma ./generators/001-capture-dmmf/prisma/schema.prisma


cp scripts/config/$1/env ./.env
# cp ./PROJECT/schema.prisma ./backends/nest-prisma/prisma/schema.prisma


# Replace the string "localhost" with the IP address in the "env.conf.save" file, and copy to nest folder
sed  "s/ipaddress/$ip_address/g" scripts/config/$1/env.conf.save > ./env.conf

yarn install
yarn prisma generate
yarn prisma migrate dev --name=init  

