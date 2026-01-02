package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"shotify/internal/config"
	"shotify/internal/routes"
	"shotify/pkg/database"
	"shotify/pkg/logger"
	"shotify/pkg/storage"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	// Initialize logger
	logger.Init()

	// Load configuration
	cfg := config.Load()

	// Initialize MongoDB
	mongoClient, err := database.NewMongoClient(cfg.MongoURI)
	if err != nil {
		logger.Fatal("Failed to connect to MongoDB", err)
	}
	defer mongoClient.Disconnect(context.Background())

	db := mongoClient.Database(cfg.DatabaseName)

	// Initialize S3 storage
	s3Client, err := storage.NewS3Client(cfg)
	if err != nil {
		logger.Fatal("Failed to initialize S3 client", err)
	}

	// Set Gin mode
	if cfg.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Initialize router
	router := gin.New()
	router.Use(gin.Recovery())

	// Setup routes
	routes.Setup(router, db, s3Client, cfg)

	// Start server
	port := cfg.Port
	if port == "" {
		port = "8080"
	}

	logger.Info("Starting server on port " + port)

	// Graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		if err := router.Run(":" + port); err != nil {
			logger.Fatal("Failed to start server", err)
		}
	}()

	<-quit
	logger.Info("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	<-ctx.Done()
	logger.Info("Server exited")
}
