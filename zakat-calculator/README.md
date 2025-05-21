# Zakat Calculator

This project is a Zakat calculator that allows users to calculate their Zakat based on various assets such as money, gold, silver, and camels. The application is designed to provide a user-friendly interface for inputting asset values and calculating the corresponding Zakat.

## Project Structure

The project is organized as follows:

```
zakat-calculator
├── src
│   ├── components
│   │   ├── ZakatCalculator.js      # Manages the overall Zakat calculation process
│   │   ├── ZakatForm.js            # Renders the form for user input
│   │   ├── ZakatResults.js         # Displays the calculated Zakat results
│   │   └── AssetInputs.js          # Provides input fields for different asset types
│   ├── pages
│   │   └── ZakatPage.js            # Main page for the Zakat calculator
│   ├── utils
│   │   └── zakatCalculations.js    # Functions for Zakat calculations
│   ├── constants
│   │   └── zakatRates.js           # Defines Zakat rates for different asset types
│   └── styles
│       └── zakat.css               # CSS styles for the Zakat calculator components
├── public
│   └── index.html                  # Main HTML file for the application
├── package.json                    # Configuration file for npm
└── README.md                       # Documentation for the project
```

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd zakat-calculator
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To run the application, use the following command:

```
npm start
```

This will start the development server and open the application in your default web browser.

## Features

- Input fields for various asset types (money, gold, silver, camels)
- Real-time Zakat calculation based on user input
- Clear display of calculated Zakat results

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.