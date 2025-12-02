# Project README

## Description
This repository contains a web application project configured to run in Docker containers via a docker-compose file. The compose configuration defines the app service(s) and the required database connection. Services are exposed to the host machine via port mappings defined in `docker-compose.yml`.

## Prerequisites
- Git (to clone or manage the repository)
- Docker
    - Windows/macOS: Docker Desktop (recommended)
    - Linux: Docker Engine + docker-compose plugin (or docker-compose binary)
- Optional: WSL2 on Windows for best Docker performance
- A terminal (PowerShell, Command Prompt, Windows Terminal, bash, zsh)
- Docker VSCode extension.

## Install Docker (summary)

Windows (Docker Desktop + WSL2 recommended)
1. Install WSL2 if not present: https://learn.microsoft.com/windows/wsl/install
2. Download and install Docker Desktop: https://www.docker.com/products/docker-desktop
3. In Docker Desktop settings, set backend to WSL2 and enable integration with your distro.
4. Restart Docker Desktop.

macOS
1. Download and install Docker Desktop: https://www.docker.com/products/docker-desktop
2. Launch Docker Desktop.

Linux (Ubuntu/Debian example)
1. Install Docker Engine: https://docs.docker.com/engine/install
2. Install docker-compose plugin: https://docs.docker.com/compose/install
3. Add current user to docker group (optional): sudo usermod -aG docker $USER (log out/in)

Verify installation:
```
docker --version
docker compose version   # or docker-compose --version
```

## Running the project

1. Open the docker-compose.yml file on Visual Studio Code and click on the "Run All Services".
2. Open a terminal and run the command "npm run dev"
3. Open localhost:3000 in your web browser

## Common tasks

- Stop services:
```
docker compose down
```
- Stop and remove volumes & orphans:
```
docker compose down --volumes --remove-orphans
```
- Rebuild a single service:
```
docker compose up --build -d --no-deps --force-recreate <service_name>
```
- Enter a running container:
```
docker compose exec <service_name> sh     # or bash if available
```
- View container status:
```
docker compose ps
```

## Troubleshooting

- If Docker commands fail on Windows, ensure Docker Desktop is running and WSL2 integration is enabled.
- If file performance is slow on Windows, avoid mounting the project from OneDrive; clone into the local filesystem (e.g., C:\Projects) or use WSL2 home.
- Port conflicts: change host port mappings in `docker-compose.yml` if a port is already in use.
- Permission errors: ensure files in mounted volumes have appropriate permissions for container users.
- If docker-compose command is not found, try `docker compose` (space) which is the newer integration.

## Notes
- Inspect `docker-compose.yml` for the exact service names, environment variables, and port mappings used by this project.
- Keep secrets out of the repository; use environment variables or secret management.

Useful links:
- Docker Desktop: https://www.docker.com/products/docker-desktop
- Docker Compose docs: https://docs.docker.com/compose/
