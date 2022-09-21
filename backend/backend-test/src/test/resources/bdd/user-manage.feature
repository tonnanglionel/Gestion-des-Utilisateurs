Feature: Management of user accounts on the platform

    The app should allow the management of user accounts.

    Background:
        Given The following users
            | user_name | user_email    | user_is_deleted |
            | joe       | joe@test.com  | false           |
            | jack      | jack@test.com | true            |
            | jane      | jane@test.com | false           |
    
    Scenario: One can list all activated users
        When One asks for the list of users
        Then He gets the list that contains the following users
            | user_name | user_email    | user_is_deleted |
            | joe       | joe@test.com  | false           |
            | jane      | jane@test.com | false           |

    Scenario Outline: One can get a user with its email address
        When One tries to retrieve the user associated to email "<user_email>"
        Then He gets the following user informations "<user_name>"
        Examples:
            | user_name | user_email    |
            | joe       | joe@test.com  |
            | jane      | jane@test.com |

    Scenario: One get a 404 error when searching for an unknow or deleted user
        When One tries to retrieve the user associated to email "<user_email>"
        Then He gets a 404 error
        Examples:
            | user_email    |
            | jack@test.com |
            | john@test.com |
