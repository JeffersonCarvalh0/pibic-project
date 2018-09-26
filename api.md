# Table of Contents
* [Activities](#activities)
    * [Show all Activities](#show-all-activities)
    * [Show a single Activity](#show-a-single-activity)
    * [Create an Activity](#create-an-activity)
    * [Update an Activity](#update-an-activity)
    * [Delete an Activity](#delete-an-activity)
* [Contents](#contents)
    * [Show all Contents](#show-all-contents)
    * [Show a single Content](#show-a-single-content)
    * [Create an Content](#create-a-content)
    * [Update an Content](#update-a-content)
    * [Delete an Content](#delete-a-content)
* [Locations](#locations)
    * [Show all Locations](#show-all-locations)
    * [Show a single Location](#show-a-single-location)
    * [Create an Location](#create-a-location)
    * [Update an Location](#update-a-location)
    * [Delete an Location](#delete-a-location)
* [Users](#users)
    * [Log in](#log-in)
    * [Create an User](#create-an-user)
    * [Get logged User](#get-logged-user)
    * [Delete an User](#delete-an-user)

# **Activities**
## **Show all Activities**
Returns all Activities in the database.

* **URL**

  /activity

* **Method:**

  `GET`

*  **URL Params**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
        "data": [
            {
                "locations":[],
                "_id":"5b7ea311a7033b0014343aca",
                "title":"the title goes here",
                "statement":"the statement goes here","__v":0
            },
            ...
        ],
        "errors": null
    }
    ```

* **Sample Call:**

  ```
  curl https://pibic-project.herokuapp.com/activity
  ```

* **Notes:**

  The `data` field in the successful response will be an empty array if there are no entries in the database.


## **Show a single Activity**
Returns JSON data about a single Activity.

* **URL**

  /activity/:id

* **Method:**

  `GET`

*  **URL Params**

  `id=[string]`

* **Data Params**

None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
        "data": {
            "locations":[],
            "_id": "5b7ea311a7033b0014343aca",
            "title": "test",
            "statement": "testing",
            "__v": 0
        },
        "errors": null
    }
    ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```
    {
        "data": null,
        "errors": null
    }
    ```

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```
    {
        "errors": {
            "message": "Cast to ObjectId failed for value \"42\" at path \"_id\" for model \"Activity\"",
            "name": "CastError",
            "stringValue": "\"42\"",
            "kind": "ObjectId",
            "value": "42",
            "path": "_id"
        }
    }
    ```

* **Sample Call:**

  ```
  curl https://pibic-project.herokuapp.com/activity/5b7d57c86e4f7b17385325f0
  ```

* **Notes:**

  The `id` parameter must be a MongoDB `ObjectId`.


## **Create an Activity**
Creates a new Activity object in the database.

* **URL**

  /activity

* **Method:**

  `POST`

*  **URL Params**

  None

* **Data Params**

    ```
    {
        "title": "here goes the title",
        "statement": "here goes the statement"
        "locations": ["5b7ead384f85d1001416a320", ...]
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```
    {
        "data": {
            "locations": ["5b7ead384f85d1001416a320"],
            "_id": "5b7ea311a7033b0014343aca",
            "title": "here goes the title",
            "statement": "here goes the statement",
              "__v": 0
          },
          "errors": null
    }
      ```

* **Error Response:**

  * **Code:** 406 NOT ACCEPTABLE <br />
    **Content:**
    ```
    {
    "errors": {
        "errors": {
            "title": {
                "message": "Path `title` is required.",
                "name": "ValidatorError",
                "properties": {
                    "message": "Path `{PATH}` is required.",
                    "type": "required",
                    "path": "title"
                },
                "kind": "required",
                "path": "title",
                "$isValidatorError": true
            }
        },
        "_message": "Activity validation failed",
        "message": "Activity validation failed: title: Path `title` is required.",
        "name": "ValidationError"
        }
    }
    ```

* **Sample Call:**

  ```
  curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"title":"the title goes here","statement":"the statement goes here", "locations": ["5b7ead384f85d1001416a320"]}' \
  https://pibic-project.herokuapp.com/activity
  ```

* **Notes:**

  The `title` parameter in the request body is required. Other parameters
  different than `title`, `description` and `locations` are ignored. the
  `locations` property is an array of Location MongoDB `ObjectId`s.


## **Update an Activity**
Updates an Activity from the database.

* **URL**

  /activity/:id

* **Method:**

  `PUT`

*  **URL Params**

  `id=[string]`

* **Data Params**

    ```
    {
        "title": "here goes the title",
        "statement": "here goes the statement"
        "locations": ["5b7ead384f85d1001416a320", ...]
    }
    ```

* **Success Response:**

* **Code:** 200 <br />
  **Content:**
  ```
  {
      "data": {
          "locations": ["5b7ead384f85d1001416a320", ...]
          "_id": "5b7d60ad6e4f7b17385325f1",
          "title": "edited title",
          "statement": "here goes the statement",
          "__v": 0
      },
      "errors": null
  }
  ```

* **Error Response:**

  * **Code:** 406 NOT ACCEPTABLE <br />
    **Content:**
    ```
    {
        "errors": {
            "message": "Cast to ObjectId failed for value \"42\" at path \"_id\" for model \"Activity\"",
            "name": "CastError",
            "stringValue": "\"42\"",
            "kind": "ObjectId",
            "value": "42",
            "path": "_id"
        }
    }
    ```

* **Sample Call:**

  ```
  curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"title":"edited title"}' \
  https://pibic-project.herokuapp.com/activity/5b7d60ad6e4f7b17385325f1
  ```

* **Notes:**

  The `id` paramater at the url must be an MongoDB `ObjectId`.


## **Delete an Activity**
Deletes an Activity from the database.

* **URL**

  /activity/:id

* **Method:**

  `DELETE`

*  **URL Params**

  `id=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 204 <br />
    **Content:**
    None


* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```
    {
        "data": null,
        "errors": null
    }
    ```

  OR

  * **Code:** 406 NOT ACCEPTABLE <br />
    **Content:**
    ```
    {
        "errors": {
            "message": "Cast to ObjectId failed for value \"42\" at path \"_id\" for model \"Activity\"",
            "name": "CastError",
            "stringValue": "\"42\"",
            "kind": "ObjectId",
            "value": "42",
            "path": "_id"
        }
    }
    ```

* **Sample Call:**

  ```
  curl --request DELETE \
  https://pibic-project.herokuapp.com/activity/5b7d60ad6e4f7b17385325f1
  ```

* **Notes:**

  The `id` paramater at the url must be an MongoDB `ObjectId`.

# **Contents**
**Show all Contents**
----
  Returns all Contents in the database.

* **URL**

  /content

* **Method:**

  `GET`

*  **URL Params**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
        "data": [{
            "_id": "5b7d57c86e4f7b17385325f0",
            "title": "test",
            "description": "testing",
            "__v": 0
        },
        ...],
        "errors": null
    }
    ```

* **Sample Call:**

  ```
  curl https://pibic-project.herokuapp.com/content
  ```

* **Notes:**

  The `data` field in the successful response will be an empty array if there are no entries in the database.


**Show a single Content**
----
  Returns JSON data about a single Content.

* **URL**

  /content/:id

* **Method:**

  `GET`

*  **URL Params**

 `id=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
        "data": {
            "_id": "5b7d57c86e4f7b17385325f0",
            "title": "test",
            "description": "testing",
            "__v": 0
        },
        "errors": null
    }
    ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```
    {
        "data": null,
        "errors": null
    }
    ```

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```
    {
        "errors": {
            "message": "Cast to ObjectId failed for value \"42\" at path \"_id\" for model \"Content\"",
            "name": "CastError",
            "stringValue": "\"42\"",
            "kind": "ObjectId",
            "value": "42",
            "path": "_id"
        }
    }
    ```

* **Sample Call:**

    ```
    curl https://pibic-project.herokuapp.com/content/5b7d57c86e4f7b17385325f0
    ```

* **Notes:**

  The `id` parameter must be an MongoDB `ObjectId`.


**Create a Content**
----
Creates a new Content object in the database.

* **URL**

  /content

* **Method:**

  `POST`

*  **URL Params**

  None

* **Data Params**

    ```
    {
        "title": "here goes the title",
        "description": "here goes the description"
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```
    {
        "data": {
            "_id": "5b7d60ad6e4f7b17385325f1",
            "title": "here goes the title",
            "description": "here goes the description",
              "__v": 0
          },
          "errors": null
    }
      ```

* **Error Response:**

  * **Code:** 406 NOT ACCEPTABLE <br />
    **Content:**
    ```
    {
    "errors": {
        "errors": {
            "title": {
                "message": "Path `title` is required.",
                "name": "ValidatorError",
                "properties": {
                    "message": "Path `{PATH}` is required.",
                    "type": "required",
                    "path": "title"
                },
                "kind": "required",
                "path": "title",
                "$isValidatorError": true
            }
        },
        "_message": "Content validation failed",
        "message": "Content validation failed: title: Path `title` is required.",
        "name": "ValidationError"
        }
    }
    ```

* **Sample Call:**

    ```
    curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"title":"the title goes here","description":"the description goes here"}' \
    https://pibic-project.herokuapp.com/content
    ```

* **Notes:**

  The `title` parameter in the request body is required. Other parameters
  different than `title` and `description` are ignored.


**Update a Content**
----
Updates a content in the database.

* **URL**

  /content/:id

* **Method:**

  `PUT`

*  **URL Params**

  `id=[string]`

* **Data Params**

    ```
    {
        "title": "here goes the title",
        "description": "here goes the description"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
        "data": {
            "_id": "5b7d60ad6e4f7b17385325f1",
            "title": "edited title",
            "description": "here goes the description",
            "__v": 0
        },
        "errors": null
    }
    ```

* **Error Response:**

  * **Code:** 406 NOT ACCEPTABLE <br />
    **Content:**
    ```
    {
        "errors": {
            "message": "Cast to ObjectId failed for value \"42\" at path \"_id\" for model \"Content\"",
            "name": "CastError",
            "stringValue": "\"42\"",
            "kind": "ObjectId",
            "value": "42",
            "path": "_id"
        }
    }
    ```

* **Sample Call:**

  ```
  curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"title":"edited title"}' \
  https://pibic-project.herokuapp.com/content/5b7d60ad6e4f7b17385325f1
  ```

* **Notes:**

  The `id` paramater at the url must be an MongoDB `ObjectId`.


**Delete a Content**
----
  Deletes a content in the database.

* **URL**

  /content/:id

* **Method:**

  `DELETE`

*  **URL Params**

  `id=[string]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 204 <br />
    **Content:**
    None


* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```
    {
        "data": null,
        "errors": null
    }
    ```

  OR

  * **Code:** 406 NOT ACCEPTABLE <br />
    **Content:**
    ```
    {
        "errors": {
            "message": "Cast to ObjectId failed for value \"42\" at path \"_id\" for model \"Content\"",
            "name": "CastError",
            "stringValue": "\"42\"",
            "kind": "ObjectId",
            "value": "42",
            "path": "_id"
        }
    }
    ```

* **Sample Call:**

  ```
  curl --request DELETE \
  https://pibic-project.herokuapp.com/content/5b7d60ad6e4f7b17385325f1
  ```

* **Notes:**

  The `id` paramater at the url must be an MongoDB `ObjectId`.


# **Locations**
**Show all Locations**
----
  Returns all Locations in the database.

* **URL**

  /location

* **Method:**

  `GET`

*  **URL Params**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
        "data": [
            {
                "_id": "5b8004744946eb00141f8497",
                "name": "test",
                "content": null,
                "latitude": 4,
                "longitude": 2
            }
        ...],
        "errors": null
    }
    ```

* **Sample Call:**

  ```
  curl https://pibic-project.herokuapp.com/location
  ```

* **Notes:**

  The `data` field in the successful response will be an empty array if there are no entries in the database.


**Show a single Location**
----
  Returns JSON data about a single Location.

* **URL**

  /location/:id

* **Method:**

  `GET`

*  **URL Params**

 `id=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
        "data": {
            "_id": "5b8004744946eb00141f8497",
            "name": "test",
            "content": null,
            "latitude": 4,
            "longitude": 2
        },
        "errors": null
    }
    ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```
    {
        "data": null,
        "errors": null
    }
    ```

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```
    {
        "errors": {
            "message": "Cast to ObjectId failed for value \"42\" at path \"_id\" for model \"Location\"",
            "name": "CastError",
            "stringValue": "\"42\"",
            "kind": "ObjectId",
            "value": "42",
            "path": "_id"
        }
    }
    ```

* **Sample Call:**

    ```
    curl https://pibic-project.herokuapp.com/location/5b7d57c86e4f7b17385325f0
    ```

* **Notes:**

  The `id` parameter must be an MongoDB `ObjectId`.


**Create a Location**
----
Creates a new Location object in the database.

* **URL**

  /location

* **Method:**

  `POST`

*  **URL Params**

  None

* **Data Params**

    ```
    {
        "name": "here goes the name",
        "latitude": "42",
        "longitude": "-42",
        "content": "5b7d60ad6e4f7b17385325f1"
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```
    {
        "_id": "5b800c25d62d2e1cb1508713",
        "name": "here goes the name",
        "content": {
            "_id": "5b7d60ad6e4f7b17385325f1",
            "title": "test",
            "description": "testing",
            "__v": 0
        },
        "latitude": 42,
        "longitude": -42
    }
    ```

* **Error Response:**

  * **Code:** 406 NOT ACCEPTABLE <br />
    **Content:**
    ```
    {
    "data": null,
        "errors": {
            "errors": {
                "name": {
                    "message": "Path `name` is required.",
                    "name": "ValidatorError",
                    "properties": {
                        "message": "Path `{PATH}` is required.",
                        "type": "required",
                        "path": "name"
                    },
                    "kind": "required",
                    "path": "name",
                    "$isValidatorError": true
                }
            },
            "_message": "Location validation failed",
            "message": "Location validation failed: name: Path `name` is required.",
            "name": "ValidationError"
        }
    }
    ```

  * **Code:** 406 NOT ACCEPTABLE <br />
    **Content:**
    ```
    {
        "data": null,
        "errors": {
            "errors": {
                "coord.coordinates": {
                    "message": "Cast to Array failed for value \"[ undefined, undefined ]\" at path \"coord.coordinates\"",
                    "name": "CastError",
                    "stringValue": "\"[ undefined, undefined ]\"",
                    "kind": "Array",
                    "value": [
                        null,
                        null
                    ],
                    "path": "coord.coordinates",
                    "reason": {
                        "message": "Cast to [number] failed for value \"[null,null]\" at path \"coord.coordinates\"",
                        "name": "CastError",
                        "stringValue": "\"[null,null]\"",
                        "kind": "[number]",
                        "value": "[null,null]",
                        "path": "coord.coordinates",
                        "reason": {
                            "message": "Cast to number failed for value \"undefined\" at path \"coord.coordinates\"",
                            "name": "CastError",
                            "stringValue": "\"undefined\"",
                            "kind": "number",
                            "path": "coord.coordinates"
                        }
                    }
                },
                "name": {
                    "message": "Path `name` is required.",
                    "name": "ValidatorError",
                    "properties": {
                        "message": "Path `{PATH}` is required.",
                        "type": "required",
                        "path": "name"
                    },
                    "kind": "required",
                    "path": "name",
                    "$isValidatorError": true
                }
            },
            "_message": "Location validation failed",
            "message": "Location validation failed: coord.coordinates: Cast to Array failed for value \"[ undefined, undefined ]\" at path \"coord.coordinates\", name: Path `name` is required.",
            "name": "ValidationError"
        }
    }
    ```

* **Sample Call:**

    ```
    curl --header "Content-Type: application/json" \
    --request POST \
    --data '{ "name": "here goes the name", "latitude": "42", "longitude": "-42", "content": "5b7d60ad6e4f7b17385325f1" }' \
    https://pibic-project.herokuapp.com/location
    ```

* **Notes:**

  The `name` and both coordinates request body are required. Other parameters
  different than `name`, `latitude`, `longitude` and `content` are ignored.
  `content` is a MongoDB `ObjectId` for a content in the database.

**Update a Location**
----
Updates a location, assigning a content to it.

* **URL**

  /location/:locationId/:contentId

* **Method:**

  `PUT`

*  **URL Params**

  `locationId=[string]` <br/>
  `contentId=[string]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
        "data": {
            "_id": "5b800c25d62d2e1cb1508713",
            "name": "here goes the name",
            "content": {
                "_id": "5b7d57c86e4f7b17385325f0",
                "title": "test",
                "description": "testing",
                "__v": 0
            },
            "latitude": 42,
            "longitude": -42
        },
        "errors": null
    }
    ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```
    {
        {
            "data": null,
            "errors": null
        }
    }
    ```

* **Sample Call:**

  ```
  curl --header "Content-Type: application/json" \
  --request PUT \
  https://pibic-project.herokuapp.com/location/5b800c25d62d2e1cb1508713/5b7d57c86e4f7b17385325f0
  ```

* **Notes:**

  Both url parameters are MongoDB `ObjectId`s. The response code will be 404
  if `locationId` OR `contentId` are not found.


**Delete a Location**
----
  Deletes a location in the database.

* **URL**

  /location/:id

* **Method:**

  `DELETE`

*  **URL Params**

  `id=[string]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 204 <br />
    **Content:**
    None


* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```
    {
        "data": null,
        "errors": null
    }
    ```

  OR

  * **Code:** 406 NOT ACCEPTABLE <br />
    **Content:**
    ```
    {
        "errors": {
            "message": "Cast to ObjectId failed for value \"42\" at path \"_id\" for model \"Location\"",
            "name": "CastError",
            "stringValue": "\"42\"",
            "kind": "ObjectId",
            "value": "42",
            "path": "_id"
        }
    }
    ```

* **Sample Call:**

  ```
  curl --request DELETE \
  https://pibic-project.herokuapp.com/location/5b800c25d62d2e1cb1508713
  ```

* **Notes:**

  The `id` paramater at the url must be an MongoDB `ObjectId`.


# **Users**
## **Log in**
Log in an user registered in the database

* **URL**

  /login

* **Method:**

  `POST`

*  **URL Params**

  None

* **Data Params**

    ```
    {
        "username": "user",
        "password": "1234"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
        "data": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjp7ImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSJ9LCJfaWQiOiI1YmFhNmQ5ZjQ2YjhlODI3ZDY3OTA3MzQiLCJ1c2VybmFtZSI6InVzZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRLZTVEMkRNUS9pdTgwNmYzV0Z5ME1PMzFTb1kuT0lrNjdWc2NGQjdvUUozSWdYY2xhTHQxUyIsImVtYWlsIjoiam9obmRvZUBleGFtcGxlLmNvbSIsImNyZWF0ZWRBdCI6IjIwMTgtMDktMjVUMTc6MTc6MTkuMjQ5WiIsIl9fdiI6MCwiaWF0IjoxNTM3OTYyNzk5LCJleHAiOjE1Mzc5NjM2OTl9.U-Tg0U_r1uzFrSgO9oIrieyKK7Tw5-T8BnmRsb5shI8"
        },
          "errors": null
    }
      ```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:**
    ```
    {
        "data": null,
        "errors": null
    }
    ```

* **Sample Call:**

  ```
  curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"user","password":"1234"}' \
  https://pibic-project.herokuapp.com/login
  ```

* **Notes:**

  The `401` code will be retured if the credentials are wrong. If they are right,
  the token needed to access the protected endpoints will be in the sent field
  `data.token` of the response. The token is set to expire in 15 minutes for
  security reasons. When this happens, you will need to log in again in order to
  get a new token to replace the old one.


## **Create an User**
Register a new user in the database

* **URL**

  /user

* **Method:**

  `POST`

*  **URL Params**

  None

* **Data Params**

    ```
    {
        "username": "user",
        "password": "1234",
        "name": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "johndoe@example.com"
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```
    {
        "data": {
            "name": {
                "firstName": "John",
                "lastName": "Doe"
            },
            "_id": "5baa6d9f46b8e827d6790734",
            "username": "user",
            "password": "",
            "email": "johndoe@example.com",
            "createdAt": "2018-09-25T17:17:19.249Z",
            "__v": 0
        },
        "errors": null
    }
    ```

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```
    {
        "errors": {
            "errors": {
                "password": {
                    "message": "Path `password` is required.",
                    "name": "ValidatorError",
                    "properties": {
                        "message": "Path `{PATH}` is required.",
                        "type": "required",
                        "path": "password"
                    },
                    "kind": "required",
                    "path": "password",
                    "$isValidatorError": true
                }
            },
            "_message": "User validation failed",
            "message": "User validation failed: password: Path `password` is required.",
            "name": "ValidationError"
        }
    }
    ```

* **Sample Call:**

  ```
  curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"user","password":"1234", "name": {"firstName": "John", "lastName": "Doe"}, "email": "johndoe@example.com"}' \
  https://pibic-project.herokuapp.com/user
  ```

* **Notes:**

  The `400` code will be retured if some of the fields is missing. All of them
  are required.


## **Get logged User**
Get info from the user that is currently logged in

* **URL**

    /user

* **Method:**

    `GET`

*  **URL Params**

    None

* **Data Params**

    None

* **Success Response:**

    * **Code:** 200 <br />
      **Content:**
    ```
      {
          "data": {
            "name": {
                "firstName": "John",
                "lastName": "Doe"
            },
            "_id": "5baa6d9f46b8e827d6790734",
            "username": "user",
            "password": "",
            "email": "johndoe@example.com",
            "createdAt": "2018-09-25T17:17:19.249Z",
            "__v": 0
          },
          "errors": []
      }
    ```

* **Error Response:**

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:**
      ```
    {
        "data": false,
        "errors": []
    }
      ```

* **Sample Call:**

    ```
    curl --header "Content-Type: application/json" \
    --request GET \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjp7ImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSJ9LCJfaWQiOiI1YmFhNmQ5ZjQ2YjhlODI3ZDY3OTA3MzQiLCJ1c2VybmFtZSI6InVzZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRLZTVEMkRNUS9pdTgwNmYzV0Z5ME1PMzFTb1kuT0lrNjdWc2NGQjdvUUozSWdYY2xhTHQxUyIsImVtYWlsIjoiam9obmRvZUBleGFtcGxlLmNvbSIsImNyZWF0ZWRBdCI6IjIwMTgtMDktMjVUMTc6MTc6MTkuMjQ5WiIsIl9fdiI6MCwiaWF0IjoxNTM3OTYyNzk5LCJleHAiOjE1Mzc5NjM2OTl9.U-Tg0U_r1uzFrSgO9oIrieyKK7Tw5-T8BnmRsb5shI8" \
    https://pibic-project.herokuapp.com/user
    ```

* **Notes:**

    The `401` code will be retured if the token at the authorization header is
    missing or invalid.
