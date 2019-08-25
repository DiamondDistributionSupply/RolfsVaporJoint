insert into hardware (type, name, description, attributes, other_details, price, brand)
values ($1, $2, $3, $4, $5, $6, $7)
returning id