# RoboYapper 🤖💬

RoboYapper is a Discord bot developed for personal use in my own Discord server. It aims to add various features and tools to enhance the user experience in Discord.

While this bot is made primarily for private use, the code is open source, and contributors are welcome to suggest and implement changes.

---

## 📌 Features

- **Core Functionality:**  
  RoboYapper provides essential features for managing and automating tasks in Discord.

- **Feature Development Board:**  
  Check out the [project board](https://github.com/<your-username>/RoboYapper/projects) to see the current status of planned features.

- **Custom Requests:**  
  Users can request new features by creating an issue.

---

## 🚀 Getting Started
The bot is meant to run inside docker containers, and has support for a Traefik routing. if you don't have traefik setup modify the compose.override.yml to open the port. 

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/RoboYapper.git
   cd RoboYapper
   ```
2. **Install dependencies**
  yarn to install the required packages:
   ```bash
   cd frontend
   yarn
   cd ../worker
   yarn
   ```
3. modify the .env file
   ```bash
   cp .env.template .env && nano .env
   ```
4. (development only) enable compose overrides
   ```bash
   cp compose.override.yml.template compose.override.yml
   ```

5. start the stack and start developing :)
   ```bash
   docker compose up -d --build
   ```
---
🌟 Contributing

Contributions are welcome! Here's how you can contribute:

    Fork the repository.
    Implement your changes.
    Open a pull request with a detailed description of your feature or fix.

You can also request new features by opening an issue.
Be sure to check the project [board](https://github.com/users/GGort/projects/3/) for ongoing work and to avoid duplicate requests.

---
📝 License

RoboYapper is licensed under the MIT License.
You can view the full license text in the `LICENSE` file.
```LICENCSE
MIT License

Copyright (c) 2024 GGort

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
Happy coding! 🎉
