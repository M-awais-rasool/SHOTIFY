package services

import (
	"context"

	"shotify/internal/models"
	"shotify/internal/repository"
)

type TemplateService struct {
	templateRepo *repository.TemplateRepository
}

func NewTemplateService(templateRepo *repository.TemplateRepository) *TemplateService {
	return &TemplateService{
		templateRepo: templateRepo,
	}
}

func (s *TemplateService) GetAllTemplates(ctx context.Context, platform string) ([]models.Template, error) {
	return s.templateRepo.FindAll(ctx, platform)
}

func (s *TemplateService) GetTemplateByID(ctx context.Context, id string) (*models.Template, error) {
	objID, err := parseObjectID(id)
	if err != nil {
		return nil, err
	}

	template, err := s.templateRepo.FindByID(ctx, objID)
	if err != nil {
		return nil, err
	}

	return template, nil
}

func (s *TemplateService) SeedTemplates(ctx context.Context) error {
	return s.templateRepo.SeedTemplates(ctx)
}

