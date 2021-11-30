# 353 final


took login page template from: https://colorlib.com/wp/template/login-form-v2/

database report method for keeping track of homeless people
deleting from database requires the unique ID of object for deletion



PART A: 

workflow for staff
-> display all customers 
-> search customers to see if in db
-> if in the DB, can either show all reports or add a report
-> if customer not in db, can register customer
-> special login for admin, that allows Register/Delete of staff and customers 

simple client server database model



PART B:

Cassandra
https://docs.datastax.com/en/developer/nodejs-driver/4.6/
https://www.instaclustr.com/support/documentation/cassandra/using-cassandra/connect-to-cassandra-with-node-js/



NOTES:
sudo docker-compose up --build //should run 2 containers

app runs at port 30001

root@root.root is email for admin login, password is 1234


PITFALLS:
    - customers/staff with the same names -> this will mess up search/update
