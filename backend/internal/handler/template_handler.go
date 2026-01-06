package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"shotify/internal/services"
	"shotify/internal/utils"
)

type TemplateHandler struct {
	templateService *services.TemplateService
}

func NewTemplateHandler(templateService *services.TemplateService) *TemplateHandler {
	return &TemplateHandler{
		templateService: templateService,
	}
}

func (h *TemplateHandler) GetTemplates(c *gin.Context) {
	platform := c.Query("platform")

	templates, err := h.templateService.GetAllTemplates(c.Request.Context(), platform)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to fetch templates", err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Templates retrieved successfully", templates)
}

func (h *TemplateHandler) GetTemplateByID(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request", "Template ID is required")
		return
	}

	template, err := h.templateService.GetTemplateByID(c.Request.Context(), id)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to fetch template", err.Error())
		return
	}
	if template == nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Template not found", "")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Template retrieved successfully", template)
}