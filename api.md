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
    * [Calculate distance](#calculate-distance)
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
                "_id": "5bd6569146822278e56b273d",
                "title": "activity",
                "description": "just passing by",
                "location": {
                    "coord": {
                        "coordinates": [
                            1.5,
                            1
                        ],
                        "type": "Point"
                    },
                    "_id": "5bd64e8746822278e56b273a",
                    "name": "test",
                    "description": "whatever",
                    "__v": 0
                },
                "content": {
                    "_id": "5bd64978548393772fbc0c47",
                    "description": "An awesome test!",
                    "correct": "Way to go, dude. You got it right!",
                    "wrong": "Damn, son. Try that again, would ya?",
                    "__v": 0
                },
                "__v": 0
            }
        ...],
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
            "_id": "5bd6569146822278e56b273d",
            "title": "activity",
            "description": "just passing by",
            "location": {
                "coord": {
                    "coordinates": [
                        1.5,
                        1
                    ],
                    "type": "Point"
                },
                "_id": "5bd64e8746822278e56b273a",
                "name": "test",
                "description": "whatever",
                "__v": 0
            },
            "content": {
                "_id": "5bd64978548393772fbc0c47",
                "description": "An awesome test!",
                "correct": "Way to go, dude. You got it right!",
                "wrong": "Damn, son. Try that again, would ya?",
                "__v": 0
            },
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
        "description": "here goes the description"
        "location": "5bd64e8746822278e56b273a"
        "content": "5bd64978548393772fbc0c47"
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```
    {
        "data": {
            "_id": "5bd6569146822278e56b273d",
            "title": "activity",
            "description": "just passing by",
            "location": {
                "coord": {
                    "coordinates": [
                        1.5,
                        1
                    ],
                    "type": "Point"
                },
                "_id": "5bd64e8746822278e56b273a",
                "name": "test",
                "description": "whatever",
                "__v": 0
            },
            "content": {
                "_id": "5bd64978548393772fbc0c47",
                "description": "An awesome test!",
                "correct": "Way to go, dude. You got it right!",
                "wrong": "Damn, son. Try that again, would ya?",
                "__v": 0
            },
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
  --data '{"title": "activity", "description": "just passing by", "location": "5bd64e8746822278e56b273a", "content": "5bd64978548393772fbc0c47"}' \
  https://pibic-project.herokuapp.com/activity
  ```

* **Notes:**

  The `title` parameter in the request body is required.
  `location` and `content` properties are MongoDB `ObjectId`s.


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
        "description": "here goes the description"
        "location": "5bd64e8746822278e56b273a"
        "content": "5bd64978548393772fbc0c47"
    }
    ```

* **Success Response:**

* **Code:** 200 <br />
  **Content:**
  ```
  {
        "data": {
            "_id": "5bd6569146822278e56b273d",
            "title": "update title",
            "description": "just passing by",
            "location": {
                "coord": {
                    "coordinates": [
                        1.5,
                        1
                    ],
                    "type": "Point"
                },
                "_id": "5bd64e8746822278e56b273a",
                "name": "test",
                "description": "whatever",
                "__v": 0
            },
            "content": {
                "_id": "5bd64978548393772fbc0c47",
                "description": "An awesome test!",
                "correct": "Way to go, dude. You got it right!",
                "wrong": "Damn, son. Try that again, would ya?",
                "__v": 0
            },
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
  --data '{"title":"updated title"}' \
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
        "data": [
        {
            "_id": "5bd64978548393772fbc0c47",
            "description": "An awesome test!",
            "correct": "Way to go, dude. You got it right!",
            "wrong": "Damn, son. Try that again, would ya?",
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
            "_id": "5bd64978548393772fbc0c47",
            "description": "An awesome test!",
            "correct": "Way to go, dude. You got it right!",
            "wrong": "Damn, son. Try that again, would ya?",
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
        "description": "The content's description",
        "correct": "Message to be shown if correct",
        "wrong": "Message to be shown if wrong"
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```
    {
        "data": {
            "_id": "5bd64978548393772fbc0c47",
            "description": "An awesome test!",
            "correct": "Way to go, dude. You got it right!",
            "wrong": "Damn, son. Try that again, would ya?",
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
                "description": {
                    "message": "Path `description` is required.",
                    "name": "ValidatorError",
                    "properties": {
                        "message": "Path `{PATH}` is required.",
                        "type": "required",
                        "path": "description"
                    },
                    "kind": "required",
                    "path": "description",
                    "$isValidatorError": true
                }
            },
            "_message": "Content validation failed",
            "message": "Content validation failed: description: Path `description` is required.",
            "name": "ValidationError"
        }
    }
    ```

* **Sample Call:**

    ```
    curl --header "Content-Type: application/json" \
    --request POST \
    --data '{ "description": "An awesome test!", "correct": "Way to go, dude. You got it right!", "wrong": "Damn, son. Try that again, would ya?" }' \
    https://pibic-project.herokuapp.com/content
    ```

* **Notes:**

  All of the three parameters are required.

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
        "description": "The content's description",
        "correct": "Message to be shown if correct",
        "wrong": "Message to be shown if wrong"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
        "data": {
            "_id": "5b7d60ad6e4f7b17385325f1",
            "description": "edited description",
            "correct": "Way to go, dude. You got it right!",
            "wrong": "Damn, son. Try that again, would ya?",
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
  --data '{"description":"edited description"}' \
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
                "_id": "5bd64e8746822278e56b273a",
                "name": "test",
                "description": "whatever",
                "coord": [
                    1.5,
                    1
                ]
            },
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
            "_id": "5bd64e8746822278e56b273a",
            "name": "test",
            "description": "whatever",
            "coord": [
                1.5,
                1
            ]
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
        "description": "here the location is described",
        "coord": [1.5, 1], // longitude, latitude
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```
    {
        "data": {
            "_id": "5bd64e8746822278e56b273a",
            "name": "test",
            "description": "whatever",
            "coord": [
                1.5,
                1
            ]
        },
        "errors": null
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
            "name": "MongoError",
            "message": "Can't extract geo keys: { _id: ObjectId('5bd64eaf46822278e56b273b'), coord: { coordinates: [ 1.5 ], type: \"Point\" }, name: \"test\", description: \"whatever\", __v: 0 }  Point must only contain numeric elements",
            "driver": true,
            "index": 0,
            "code": 16755,
            "errmsg": "Can't extract geo keys: { _id: ObjectId('5bd64eaf46822278e56b273b'), coord: { coordinates: [ 1.5 ], type: \"Point\" }, name: \"test\", description: \"whatever\", __v: 0 }  Point must only contain numeric elements"
        }
    }
    ```

* **Sample Call:**

    ```
    curl --header "Content-Type: application/json" \
    --request POST \
    --data '{ "name": "test", "description": "whatever", "coord": [1.5, 1] }' \
    https://pibic-project.herokuapp.com/location
    ```

* **Notes:**

  The `name` and `coord` fields are required.
  The `coord` field must be an numeric array with two elements, where the first
  one is the longitude and the second one is the latitude of the coordinate.

**Update a Location**
----
Updates a location in the database.

* **URL**

  /location/:id

* **Method:**

  `PUT`

*  **URL Params**

  `locationId=[string]`

* **Data Params**

    ```
    {
        "name": "here goes the name",
        "description": "here the location is described",
        "coord": [1.5, 1], // longitude, latitude
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
        "data": {
            "_id": "5b800c25d62d2e1cb1508713",
            "name": "updated name",
            "description": "whatever",
            "coord": [
                1.5,
                1
            ]
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
  --data '{ "name": "updated name" }' \
  https://pibic-project.herokuapp.com/location/5b800c25d62d2e1cb1508713/5b7d57c86e4f7b17385325f0
  ```

* **Notes:**

  The url parameter is a MongoDB `ObjectId`.


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


**Calculate distance**
----
Calculates the distance between two coordinates using haversine formula

* **URL**

  /location/distance

* **Method:**

  `POST`

*  **URL Params**

  None

* **Data Params**

    ```
    {
        "location1": [ 0.7, 0.8 ] // [longitude, latitude]
        "location2": [ 0.9, 0.5 ]
        "threshold": 50000
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```
    {
        "data": {
            distance: 40091.09306380423,
            near: true
        },
        errors: null
    }
    ```

* **Error Response:**

  * **Code:** 406 NOT ACCEPTABLE <br />
    **Content:**
    ```
    {
        "data": null,
        "errors": {
            "message": "The parameters are incorrect"
        }
    }
    ```

* **Sample Call:**

    ```
    curl --header "Content-Type: application/json" \
    --request POST \
    --data '{ "location1": [0.7, 0.8], "location2": [0.9, 0.5], "threshold": 50000 }' \
    https://pibic-project.herokuapp.com/location/distance
    ```

* **Notes:**

  Both coordinate fields are required. `threshold` can be ignored if you are not going to use it.
  Each coordinate field must be an numeric array with two elements, where the first
  one is the longitude and the second one is the latitude of the coordinate.
	The distance measurement unit is meters. The `threshold` is expected to be in meters too.

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
        "message": "Successfully authenticated",
        "errors": null
    }
      ```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:**
    ```
    {
        "data": {
            "token": null
        },
        "message": "Invalid username"
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
        "message": "user created",
        "errors": null
    }
    ```

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```
    {
        "message": "User validation failed: password: Path `password` is required.",
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
          "message": "Successfully authenticated",
          "errors": []
      }
    ```

* **Error Response:**

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:**
    ```
    {
        "data": false,
        "message": "Unexpected token \b in JSON at position 210",
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
    missing or invalid. This is specified at the `message` field.


**Delete an User**
----
  Deletes the logged user from the database.

* **URL**

  /user

* **Method:**

  `DELETE`

*  **URL Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 204 <br />
    **Content:**

    None

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:**
    ```
    {
        "data": null,
        "message": "Unexpected token \b in JSON at position 210",
        "errors": null
    }
    ```

* **Sample Call:**

  ```
  curl --header "Content-Type: application/json" \
  --request DELETE \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjp7ImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSJ9LCJfaWQiOiI1YmFhNmQ5ZjQ2YjhlODI3ZDY3OTA3MzQiLCJ1c2VybmFtZSI6InVzZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRLZTVEMkRNUS9pdTgwNmYzV0Z5ME1PMzFTb1kuT0lrNjdWc2NGQjdvUUozSWdYY2xhTHQxUyIsImVtYWlsIjoiam9obmRvZUBleGFtcGxlLmNvbSIsImNyZWF0ZWRBdCI6IjIwMTgtMDktMjVUMTc6MTc6MTkuMjQ5WiIsIl9fdiI6MCwiaWF0IjoxNTM3OTYyNzk5LCJleHAiOjE1Mzc5NjM2OTl9.U-Tg0U_r1uzFrSgO9oIrieyKK7Tw5-T8BnmRsb5shI8" \
  https://pibic-project.herokuapp.com/user
  ```

* **Notes:**

  The `401` code will be retured if the token at the authorization header is
  missing or invalid. This is specified at the `message` field.
