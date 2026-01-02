package config

import (
	"os"
)

type Config struct {
	Port               string
	Environment        string
	MongoURI           string
	DatabaseName       string
	JWTSecret          string
	JWTExpirationHours int
	AWSRegion          string
	AWSAccessKeyID     string
	AWSSecretAccessKey string
	AWSS3Bucket        string
	AWSEndpoint        string
	AllowedOrigins     []string
}

func Load() *Config {
	return &Config{
		Port:               getEnv("PORT", "8080"),
		Environment:        getEnv("ENVIRONMENT", "development"),
		MongoURI:           getEnv("MONGO_URI", "mongodb://localhost:27017"),
		DatabaseName:       getEnv("DATABASE_NAME", "shotify"),
		JWTSecret:          getEnv("JWT_SECRET", "your-super-secret-jwt-key-change-in-production"),
		JWTExpirationHours: 72,
		AWSRegion:          getEnv("AWS_REGION", "us-east-1"),
		AWSAccessKeyID:     getEnv("AWS_ACCESS_KEY_ID", ""),
		AWSSecretAccessKey: getEnv("AWS_SECRET_ACCESS_KEY", ""),
		AWSS3Bucket:        getEnv("AWS_S3_BUCKET", "shotify-uploads"),
		AWSEndpoint:        getEnv("AWS_ENDPOINT", ""),
		AllowedOrigins:     []string{getEnv("ALLOWED_ORIGINS", "http://localhost:5173")},
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
