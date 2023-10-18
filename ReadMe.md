# school_to_ical

**school_to_ical** is a PHP-based software that allows you to convert and sync Vulcan School plans to Google Calendar or any iCal-compatible calendar format. It provides a user-friendly web GUI for configuration and class selection, making the process simple and intuitive.

## Features

- Convert Vulcan School plans to iCal format.
- Synchronize lesson plans with Google Calendar or any iCal-compatible calendar.
- User-friendly web GUI for easy configuration and class selection.
- No API usage; it directly creates iCal files.

## Requirements

- PHP 7.0 or higher
- Composer (for PHP package management)

## Installation

1. Clone this repository to your web server or hosting environment.

2. Install the required dependencies using Composer:

   ```
   composer install
   ```

3. Configure your web server to serve the `public` directory.

4. Open the web application in your browser and start configuring your classes.

## Usage

1. Access the web GUI by visiting the application URL in your web browser.

2. Configure your settings, including the source of Vulcan School plans and your target calendar (e.g., Google Calendar).

3. Select the classes and schedules you want to sync.

4. Click the "Sync" or "Convert" button to create the iCal files and sync them with your calendar service.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature`.

3. Make your changes and commit them: `git commit -m 'Add new feature'`.

4. Push to your fork: `git push origin feature/your-feature`.

5. Create a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [PHP](https://www.php.net/)
- [Composer](https://getcomposer.org/) for PHP package management
