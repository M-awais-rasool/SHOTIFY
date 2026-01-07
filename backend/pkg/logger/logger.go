package logger

import (
	"log"
	"os"
)

var (
	infoLogger  *log.Logger
	errorLogger *log.Logger
	fatalLogger *log.Logger
)

func Init() {
	infoLogger = log.New(os.Stdout, "[INFO] ", log.Ldate|log.Ltime|log.Lshortfile)
	errorLogger = log.New(os.Stderr, "[ERROR] ", log.Ldate|log.Ltime|log.Lshortfile)
	fatalLogger = log.New(os.Stderr, "[FATAL] ", log.Ldate|log.Ltime|log.Lshortfile)
}

func Info(message string) {
	if infoLogger == nil {
		Init()
	}
	infoLogger.Println(message)
}

func Error(message string, err error) {
	if errorLogger == nil {
		Init()
	}
	if err != nil {
		errorLogger.Printf("%s: %v\n", message, err)
	} else {
		errorLogger.Println(message)
	}
}

func Fatal(message string, err error) {
	if fatalLogger == nil {
		Init()
	}
	if err != nil {
		fatalLogger.Fatalf("%s: %v\n", message, err)
	} else {
		fatalLogger.Fatalln(message)
	}
}
