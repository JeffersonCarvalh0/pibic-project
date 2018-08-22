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



**Show a single content**
----
  Returns JSON data about a single content.

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

  The `id` parameter must be an hexadecimal number.



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

    The `id` paramater at the url must be an hexadecimal value.


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

    The `id` paramater at the url must be an hexadecimal value.
