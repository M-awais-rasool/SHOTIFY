.PHONY: run build test clean dev

# Go parameters
GOCMD=go
GOBUILD=$(GOCMD) build
GORUN=$(GOCMD) run
GOTEST=$(GOCMD) test
GOMOD=$(GOCMD) mod
BINARY_NAME=shotify

# Build the application
build:
	$(GOBUILD) -o bin/$(BINARY_NAME) cmd/main.go

# Run the application
run:
	$(GORUN) cmd/main.go

# Run with hot reload (requires air: go install github.com/cosmtrek/air@latest)
dev:
	air

# Download dependencies
deps:
	$(GOMOD) download
	$(GOMOD) tidy

# Run tests
test:
	$(GOTEST) -v ./...

# Clean build files
clean:
	rm -rf bin/

# Build for production
build-prod:
	CGO_ENABLED=0 GOOS=linux $(GOBUILD) -a -installsuffix cgo -o bin/$(BINARY_NAME) cmd/main.go

# Docker build
docker-build:
	docker build -t shotify-backend .

# Docker run
docker-run:
	docker run -p 8080:8080 --env-file .env shotify-backend
