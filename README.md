# Project README

## Table of Contents

-   [Project Overview](#project-overview)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Running the Project](#running-the-project)
-   [Project Structure](#project-structure)
-   [Available Scripts](#available-scripts)
-   [Dependencies](#dependencies)

## Project Overview

This project is a web application built with React, Vite, and TailwindCSS. It includes features such as displaying locations on a Google Map, listing special offers, and more.

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   **Node.js**: You need to have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
-   **pnpm**: This project uses pnpm as the package manager. You can install it globally using npm.

## Installation

### Step 1: Install Node.js

Download and install Node.js from [nodejs.org](https://nodejs.org/). This will also install npm (Node Package Manager).

### Step 2: Install pnpm

Install pnpm globally using npm:

```sh
npm install -g pnpm
```

### Step 3: Install Dependencies

Install the project dependencies using pnpm:

```sh
pnpm install
```

### Step 4: Set up Environment Variables

Copy the `.env.template` file and rename to `.env`. Update variables to match desired settings.

Will need to generate a Google Maps API key and map for use - https://developers.google.com/maps/documentation/javascript/get-api-key

## Running the Project

To start the development server, run:

```sh
pnpm start
```

This will start the Vite development server and you can view the application in your browser at https://web.south-bay-specials.localhost/.

## Available Scripts

In the project directory, you can run:

`pnpm dev`
Runs the app in the development mode. Open http://localhost:3000 to view it in the browser.

`pnpm build`
Builds the app for production to the dist folder.

`pnpm preview`
Locally preview the production build.

`pnpm lint`
Runs ESLint to analyze the code for potential errors and code style issues.

## Dependencies

The project uses the following main dependencies:

-   React: A JavaScript library for building user interfaces.
-   Vite: A fast build tool for modern web projects.
-   TailwindCSS: A utility-first CSS framework.
-   pnpm: A fast, disk space efficient package manager.
-   @mui/material: Material-UI components for React.
-   @vis.gl/react-google-maps: React bindings for Google Maps.
-   axios: Promise-based HTTP client for the browser and Node.js.

### Additional Libraries

Other libraries and tools used in this project include:

-   ESLint: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
-   TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
-   PostCSS: A tool for transforming CSS with JavaScript plugins.

Conclusion
This README provides an overview of the project, installation instructions, and details about the project structure and dependencies. If you have any questions or need further assistance, please refer to the documentation of the respective libraries or open an issue in the repository.
