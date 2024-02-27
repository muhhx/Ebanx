# Murilo Santos Ebanx Test

## Important note

For the sake of simplicity, I've prefered to not implement the following specific use cases:

- Generate error when -> Withdraw more than the current account balance,
- Generate error when -> Transfer more than the current balance of the origin account,
- Generate error when -> Transfer amount into the same account (origin = destination).

However, I can definitely implement them if needed.
s

## How to run locally

### Prerequisites

In order to run the project, you will need:

- Yarn
- Node

### Installing & Setup

After clonning the project into your local machine, run the following command to install all dependencies:

```
yarn install
```

Then, you need to create a .env file with a PORT value (if not provided, PORT will default to 3030).
After installing all the dependencies and setting up .env file, run the following command to start the project locally:

```
yarn dev
```

### Testing

Run the following code in the terminal to run all E2E tests:

```
yarn test
```

## Dependencies and Functionalities

- Body validation with Zod for /event, making sure that the needed values were given.
- General error handling structure for the application.
- E2E testing using Jest and Supertest.

- Express to create a simple server
- Cors to allow requests from anywhere
- Typescript to ensure type safety
