# DRD JNTUGV Website Revamp

This repository contains the source code for the revamped Directorate of Research and Development (DRD) website for JNTU-GV.

## Project Overview

The website is a modern, responsive application built with Next.js and Tailwind CSS, designed to facilitate research activities, manage scholar data, and provide easy access to university administration.

### Key Features
- **Frontend**: Next.js 14+ (App Router), Tailwind CSS, Lucide React Icons.
- **Backend Node.js**: Express.js server for API handling (Notifications, Contact Form).
- **Responsive Design**: Mobile-friendly navigation with proper drawers and accessibility features.
- **Administration Modules**:
    - Profiles for Vice-Chancellor, Registrar, and Director R&D.
    - Roll of Honour page for former leadership status.
- **Academic Resources**:
    - Dedicated sections for Research Centres, Sponsored Research, and PhD Scholars.
    - Downloads repository for academic forms.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- NPM or Yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Jntu-Gurajada-Vizianagaram/jntugv-drd.git
    cd jntugv-drd
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

- `src/app`: Application routes and pages.
- `src/components`: Reusable UI components (header, footer, cards, etc.).
- `backend`: Backend server code (Express.js).

## Deployment

The application is optimized for deployment on Vercel or any Node.js hosting environment.

Run the build command for production:
```bash
npm run build
```
