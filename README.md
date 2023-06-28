# Credit Card Validation Assignment

## Description
The web application implements credit card validation on both the frontend and the backend. Validation on the frontend helps to reduce the number of API calls to save on AWS operation costs.

## Assumptions
1. When providing credit card information to make a purchase, you typically need to provide the following information: 1. credit card number, 2. the exact name that appears on the credit card, 3. the expiration date, 4. the security code, and 5. the billing address. The web application assumes that properties 2-5 have been provided and are valid.

2. There wasn't enough time to add a payment gateway such as Stripe that would validate the credit card information beyond checking the first digits for a valid credit card company, checking that the credit card number contains only numbers, and checking the length of the credit card number. Ideally, the lambda function would call a third party API with the credit card information and validate it. The working assumption is that the lambda does all of the work to confirm the validity of the credit card information.

## To Do (If there was more time)
1. Implement security measures such as input validation and cross-site scripting protection.
2. Implement the required form fields for credit card information including name on the credit card, expiration date, security code, and billing address.
3. Implement better error handling for the response from the API call.