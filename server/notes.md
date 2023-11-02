

Database
-Mongo
TODO -Justin- create connection and basic server to connect
DB- Connection- create API key in MongoDB- how do we connect


TODO - Shui
DB- Model -& Schema

API
Consuming our API
Endpoint
how data is to be sent
How much data and what it looks like


TODO-
Belinda
Create Data
Route /createtrack/:id          ?do we use :id or not?
Send back data as JSON
send back document from DB to client (with ID), the "receipt" we receive from DB to client- one object with an "id", description, and isCompleted. (Then client can do whatever they want with it).  Forward on a receipt from DB.
4) let people using this know they need to send json with a body and a key named "description".

Read Data - tracks
1)  route can be /tracks and GET method
2)  send data back as JSON  (JSON lets us send object and stuff as strings-kind of like the universal lang we use to send things- all lang. can use strings)
3)  send back an array of object- all user tracks 
4) send json with…

Read Data- mytracks
1)  route can be /tracks and GET method
2)  send data back as JSON  (JSON lets us send object and stuff as strings-kind of like the universal lang we use to send things- all lang. can use strings
3)send back an array of objects- all of one individual users tracks 
4) send json with…


TODO
Noah- update and delete

Update Data - we use the id to update the item
1) /mytracks/:id route and PUT method
2) send back data as JSON
3) send back a copy of the updated document  (object)

Delete Data - so we can delete one specific track
1) /mytracks/:id route and DELETE method
2) send back data as JSON
3) send back a copy of the deleted document (object)
