**Show all Activities**
----
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


**Show a single Activity**
----
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


**Create an Activity**
----
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


**Update an Activity**
----
Updates a content in the database.

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


**Delete an Activity**
----
Updates a content in the database.

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
        "data": [{ "title": "example", "description": "example" }, ...],
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

  /content/

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
  Updates a content in the database.

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
