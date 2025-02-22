# KUGetReg

**KUGetReg** is a web application designed for Kasetsart University students to view their current class schedules and create personalized class schedules tailored to their academic needs.

## Features

- **View Class Schedules:** Effortlessly check updated class timetables.
- **Create Customized Schedules:** Build and modify personal schedules based on offered courses.
- **Responsive UI:** Optimized for both desktop and mobile devices.
- **Multi-language Support:** Interfaces available in several languages.
- **Secure Authentication:** Protects user data and ensures secure access.
- **Downloadable Content:** Export schedules in PDF format and manage receipts.

## Getting Started

### Prerequisites

- Node.js v14 or later
- pnpm package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ku-t3ch/kugetreg
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Configure Environment:**
   - Copy the example environment file and update it with your configurations:
     ```bash
     cp .env.example .env
     ```
4. **Run the development server:**
   ```bash
   pnpm dev
   ```

## Usage

- **View Schedules:** After signing in, navigate to the dashboard to see class schedules.
- **Create Schedules:** Use the scheduling tool to generate a personalized timetable.
- **Download:** Export schedules as PDFs or view receipts within the application.

## Project Structure

The repository is structured as a Next.js application:

- **/src:** Contains application components, pages, and services.
- **/public:** Static assets like images and fonts.
- **/prisma:** Database schema and migrations.
- **/styles:** Global and component-specific styles.
- **/services:** API calls and business logic.
- **/commands & /messages:** CLI commands and internationalization files.

## License

This project is licensed under the MIT License.

## About

KUGetReg provides Kasetsart University students with an intuitive platform to manage their class schedules, ensuring a seamless experience in planning and organizing academic courses.

For any inquiries or contributions, please contact the project maintainers.
