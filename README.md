# README for Ruby on Rails 7 App with React

Server Metrics was built with Ruby on Rails 7 application and React. This README will guide you through setting up the project.

## Setup

### Prerequisites

Before starting, make sure you have the following installed on your system:

- Ruby (>= 3.3.0)
- Rails (>= 7.0.0)
- Node.js (>= 20.x)
- Yarn

### Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run `bundle install` to install Ruby dependencies.
4. Run `npm install or yarn install` to install Node.js dependencies.

### Database Setup

1. Run `rails db:create` to create the database.
2. Run `rails db:migrate` to run migrations.

### Starting the Server

1. Run `bin/dev` to start the Rails server.

## Development

### Folder Structure

- `app`: Contains Rails application files.
- `app/javascript`: Contains React components and JavaScript files.
- `app/assets`: Contains asset files such as stylesheets and images.
- `config`: Contains configuration files.
- `db`: Contains database-related files.

### Running Tests

To run tests, use `rspec` for Ruby tests.

## Decisions

### Using Bootstrap for styling:

I chose Bootstrap for styling to speed up the development process due to its pre-designed components. This added to the bundle size and is something I'd avoid using in a production application, opting instead for CSS modules to fully customize the styling and manage specificity issues.

### Building an API:

Building an API allows me to decouple the frontend and backend, and enabled potential future expansion and better flexibility.

### Using Kaminari for pagination:

I used Kaminari to simplify the pagination for fetching metrics. I felt this was a simple solution for a small scale app.

### Using Dry Schema for validation:

Opting for Dry Schema, I prioritized the ability to define validation rules precisely to the application's needs.

### Not using state management:

I decided against using a state management library such as Redux or Zustand due to the amount of boilerplate code involved in setting them up. I'd normally implement one of these solutions on a larger app with more state. The prop drilling got cumbersome especially for handling interactions for the table component.

### Using controlled components for form control:

I used controlled components to manage state in the create new metric form. I felt this approach was sufficient enough to handle a small form with only 3 inputs. However, for large forms or complex data structures, controlled components might introduce performance overhead and I would consider using an external library such as React Hook Form.

## Trade Offs

### Trade-off: Time constraints vs. custom styling:

Chose Bootstrap for styling due to time constraints. Bootstrap offered quicker development and a consistent UI, Custom styling requires more time and effort and is more suitable to larger scale applications with unique branding.

### Trade-off: Prop drilling vs. state management:

Opting for prop drilling instead of state management simplified the application architecture. However, it would lead to less scalable code as the application grew.

### Trade-off: API vs. direct database access:

Building an API layer added an additional abstraction between the frontend and backend, promoting separation of concerns and facilitating future scalability. However, it also introduced more complexity and potential performance overhead compared to direct database access, especially considering it's a small application.

### Trade-off: Posting random metric data:

I chose to post random metric data every 2 minutes and allow the user to create a new metric on the client side. Given more time I would have liked to interact with a real server and gather its metrics.

### Trade-off: Adding unit tests at the end of development process

While building an API, my typical approach involves starting with TDD, incorporating unit tests from the start. However, due to the learning curve associated with Rails and the packages utilised, I prioritised the initial construction of the application. As a result, unit testing was deferred until the latter stages of development.

## License

This project is licensed under the [MIT License](LICENSE).
