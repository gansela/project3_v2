to set mysql db:

set a  new connection, change the params to the new connections in the .env file in the vacation_server_app.

from the mysql_files run the vacation_schema.sql file to create the schema.

in the vacations_table table import the backup vacations_table file from the mysql_files folder

before you  run the app make sure your http protocol detailes are correct in the mainAxios.ts file in the vacations_client_app and the .env file in the vacation_server_app.

when you are ready to run the app run cli commends npm run in the vacations_app_server and the vacations_app_client

app by Gan Sela