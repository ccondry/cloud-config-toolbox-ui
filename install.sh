#!/bin/sh
echo "running npm i"
npm i
if [ $? -eq 0 ]; then
  echo "running npm run build..."
  npm run build
  while [ $? != 0 ]
  do
    echo "failed to build cloud-config-toolbox-ui website files. trying again..."
    npm run build
  done
  echo "npm run build successful. copying dist files to www folder..."
  mkdir -p /var/www/toolbox/cloud-config
  cp -rf dist/* /var/www/toolbox/cloud-config/
  if [ $? -eq 0 ]; then
    echo "successfully installed cloud-config-toolbox-ui website files"
  else
    echo "failed to install cloud-config-toolbox-ui website files"
  fi
else
  echo "npm i failed"
fi
