# Response errors

## Auth API

### Login

ER_LOGIN_FAILED: When a login attempt fails

### JWT alive check

ER_JWT_MISSING: When the JWT token sent to the APIs is **null** or **undefined**
ER_JWT_DEAD: When the JWT token is not valid

### User

ER_USER_NOT_FOUND: When the selected user cannot be found in the DB
ER_USER_EXISTS: When the user is already present in the DB

## Booking
ER_ROOM_UNAVAILABLE: When the selected room is not available in the specified time span