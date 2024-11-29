# Contributing to RoboYapper

Thank you for considering contributing to RoboYapper! Here’s a guide to help you get started:

---

## How Can You Contribute?

### 1. Request a Feature
If you have an idea for a feature, you can:
- Open a [Feature Request Issue](https://github.com/GGort/RoboYapper/issues) and describe your idea in detail.
- Ensure the idea aligns with the goals of the bot and doesn’t already exist.

### 2. Report a Bug
If you encounter a bug:
- Open a [Bug Report Issue](https://github.com/GGort/RoboYapper/issues).
- Provide as much detail as possible (e.g., steps to reproduce, expected behavior, logs).

### 3. Fork and Contribute Code
If you'd like to implement a feature or fix a bug:
- Fork the repository.
- Make your changes in a feature branch (`feature/<description>` or `bugfix/<description>`).
- Submit a [Pull Request](https://github.com/GGort/RoboYapper/pulls) for review.

---

## Setting Up the Project Locally
(Note: make sure you installed docker)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/GGort/RoboYapper.git
   cd your-repo
   ```
2. **Create Config Files & Start containers**
   ```bash
   cd worker && yarn && cd ../frontend && yarn && cd .. # install deps
   cp compose.override.yml.template compose.override.yml.template # cp override (enable dev mode)
   cp .env.template .env && nano .env # cp and edit deploy settings
   docker compose up -d && docker compose logs --follow # start app
   ```
