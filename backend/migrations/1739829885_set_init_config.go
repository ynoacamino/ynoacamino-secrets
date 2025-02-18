package migrations

import (
	"os"
	"strconv"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		settings := app.Settings()

		APP_URL := os.Getenv("APP_URL")

		settings.Meta.AppName = "ynoacamino-secrets"
		settings.Meta.AppURL = APP_URL

		S3_BUCKET := os.Getenv("S3_BUCKET")
		S3_ACCESS_KEY := os.Getenv("S3_ACCESS_KEY")
		S3_SECRET_KEY := os.Getenv("S3_SECRET_KEY")
		S3_REGION := os.Getenv("S3_REGION")
		S3_ENDPOINT := os.Getenv("S3_ENDPOINT")
		S3_FORCE_PATH_STYLE, _ := strconv.ParseBool(os.Getenv("S3_FORCE_PATH_STYLE"))

		settings.Backups.Cron = "0 0 * * *"
		settings.Backups.CronMaxKeep = 3

		settings.Backups.S3.Enabled = true
		settings.Backups.S3.Bucket = S3_BUCKET
		settings.Backups.S3.AccessKey = S3_ACCESS_KEY
		settings.Backups.S3.Secret = S3_SECRET_KEY
		settings.Backups.S3.Region = S3_REGION
		settings.Backups.S3.Endpoint = S3_ENDPOINT
		settings.Backups.S3.ForcePathStyle = S3_FORCE_PATH_STYLE

		SMTP_HOST := os.Getenv("SMTP_HOST")
		SMTP_USERNAME := os.Getenv("SMTP_USERNAME")
		SMTP_PASSWORD := os.Getenv("SMTP_PASSWORD")
		SENDER_ADDRESS := os.Getenv("SENDER_ADDRESS")

		settings.SMTP.Enabled = true

		settings.SMTP.Host = SMTP_HOST
		settings.SMTP.Username = SMTP_USERNAME
		settings.SMTP.Password = SMTP_PASSWORD
		settings.SMTP.Port = 587
		settings.SMTP.TLS = true

		settings.Meta.SenderAddress = SENDER_ADDRESS

		return app.Save(settings)
	}, nil)
}
