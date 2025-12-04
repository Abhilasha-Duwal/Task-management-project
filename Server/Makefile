# ----------------------------------------
# Docker Compose Makefile for Node.js + MySQL
# ----------------------------------------

# Default compose files
COMPOSE_BASE=docker-compose.yml
COMPOSE_DEV=docker-compose.dev.yml
COMPOSE_PROD=docker-compose.prod.yml

# ----------------------------------------
# Development
# ----------------------------------------
dev-build:
	@echo "Starting development environment..."
	docker-compose -f $(COMPOSE_BASE) -f $(COMPOSE_DEV) up --build

dev-build-detach:
	@echo "Starting development environment in detached mode..."
	docker-compose -f $(COMPOSE_BASE) -f $(COMPOSE_DEV) up --build -d

dev-start:
	@echo "Starting development environment without build..."
	docker-compose -f $(COMPOSE_BASE) -f $(COMPOSE_DEV) up	

dev-stop:
	@echo "Stopping development environment..."
	docker-compose -f $(COMPOSE_BASE) -f $(COMPOSE_DEV) down

# ----------------------------------------
# Production
# ----------------------------------------
prod-build:
	@echo "Starting production environment..."
	docker-compose -f $(COMPOSE_BASE) -f $(COMPOSE_PROD) up --build -d

prod-stop:
	@echo "Stopping production environment..."
	docker-compose -f $(COMPOSE_BASE) -f $(COMPOSE_PROD) down

# ----------------------------------------
# Clean everything (containers, images, volumes)
# ----------------------------------------
clean:
	@echo "Cleaning all Node.js containers, images, and volumes..."
	docker stop node-server-app || true
	docker rm node-server-app || true
	docker rmi node-server-app || true
	docker volume rm node_modules || true

.PHONY: dev dev-detach dev-stop prod prod-stop clean
