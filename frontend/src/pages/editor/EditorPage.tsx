import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { projectsApi } from '@/lib/api'
import { useEditorStore } from '@/stores/editorStore'
import type { Project } from '@/types'
import TemplateSlide from '@/components/editor/TemplateSlide'
import ConfigPanel from '@/components/editor/ConfigPanel'
import ElementsPanel from '@/components/editor/ElementsPanel'
import {
  Loader2,
  Save,
  Download,
  ArrowLeft,
  Check,
  RotateCcw,
  Copy,
  Crop,
  Lock,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Eye,
} from 'lucide-react'

export function EditorPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  const {
    slides,
    currentSlideId,
    setCurrentSlideId,
    setSelectedLayerId,
    undo,
    redo,
    historyIndex,
    isDirty,
    setIsDirty,
    initialize,
    duplicateSlide,
    deleteSlide,
    addSlide,
  } = useEditorStore()

  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [devicePreview, setDevicePreview] = useState<'iphone' | 'android'>('iphone')

  // Fetch project
  useEffect(() => {
    if (!projectId) return

    const fetchProject = async () => {
      try {
        const response = await projectsApi.getById(projectId)
        const data = response.data.data as Project
        setProject(data)
        initialize(
          data.projectConfig.canvas,
          data.projectConfig.layers,
          data.projectConfig.images || [],
          data.template?.jsonConfig.exports || [],
          data.projectConfig.slides // Pass saved slides if available
        )
      } catch (error) {
        console.error('Failed to fetch project:', error)
        navigate('/dashboard')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [projectId, navigate, initialize])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === 'z') {
          e.preventDefault()
          if (e.shiftKey) {
            redo()
          } else {
            undo()
          }
        }
        if (e.key === 's') {
          e.preventDefault()
          handleSave()
        }
        if (e.key === 'd') {
          e.preventDefault()
          if (currentSlideId) {
            duplicateSlide(currentSlideId)
          }
        }
      }
      if (e.key === 'Escape') {
        setSelectedLayerId(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo, currentSlideId, duplicateSlide, setSelectedLayerId])

  // Save project
  const handleSave = useCallback(async () => {
    if (!project || isSaving) return

    setIsSaving(true)
    try {
      const { slides, images } = useEditorStore.getState()
      // Save all slides data
      const slidesData = slides.map(slide => ({
        id: slide.id,
        canvas: slide.canvas,
        layers: slide.layers,
      }))
      
      await projectsApi.update(project.id, {
        projectConfig: { 
          // Keep first slide for backwards compatibility
          canvas: slides[0]?.canvas || { width: 1242, height: 2688, backgroundColor: '#D8E5D8' },
          layers: slides[0]?.layers || [],
          images,
          slides: slidesData,
        },
      })
      setIsDirty(false)
    } catch (error) {
      console.error('Failed to save project:', error)
    } finally {
      setIsSaving(false)
    }
  }, [project, isSaving, setIsDirty])

  // Scroll to active slide
  const scrollToSlide = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return
    
    const slideWidth = container.scrollWidth / slides.length
    const currentScroll = container.scrollLeft
    const targetScroll = direction === 'left' 
      ? currentScroll - slideWidth 
      : currentScroll + slideWidth
    
    container.scrollTo({ left: targetScroll, behavior: 'smooth' })
  }

  const currentSlideIndex = slides.findIndex(s => s.id === currentSlideId)

  if (isLoading) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mx-auto mb-4" />
          <p className="text-text-muted">Loading project...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-4 flex-shrink-0">
        {/* Left Section - Logo & Back */}
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          
          <div className="h-8 w-px bg-border" />
          
          {/* Project Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">S</span>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                {project?.name}
                {isDirty && <span className="w-2 h-2 bg-amber-500 rounded-full" />}
              </h1>
              <p className="text-xs text-text-muted">
                {slides.length} slides • {slides[0]?.layers.length || 0} elements
              </p>
            </div>
          </div>
        </div>

        {/* Center Section - Quick Actions */}
        <div className="flex items-center gap-1 bg-surface border border-border rounded-xl p-1">
          <button
            onClick={() => {}}
            className="p-2.5 rounded-lg bg-emerald-500 text-white"
            title="Select"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="p-2.5 rounded-lg text-text-secondary hover:bg-background disabled:opacity-30 transition-colors"
            title="Undo (⌘Z)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => currentSlideId && duplicateSlide(currentSlideId)}
            className="p-2.5 rounded-lg text-text-secondary hover:bg-background transition-colors"
            title="Duplicate (⌘D)"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            className="p-2.5 rounded-lg text-text-secondary hover:bg-background transition-colors"
            title="Crop"
          >
            <Crop className="w-4 h-4" />
          </button>
          <button
            className="p-2.5 rounded-lg text-text-secondary hover:bg-background transition-colors"
            title="Lock"
          >
            <Lock className="w-4 h-4" />
          </button>
          <button
            onClick={() => currentSlideId && slides.length > 1 && deleteSlide(currentSlideId)}
            disabled={slides.length <= 1}
            className="p-2.5 rounded-lg text-red-400 hover:bg-red-500/10 disabled:opacity-30 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Right Section - Preview & Export */}
        <div className="flex items-center gap-3">
          {/* Device Preview Toggle */}
          <div className="flex items-center gap-1 bg-surface border border-border rounded-lg p-1">
            <button
              onClick={() => setDevicePreview('iphone')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                devicePreview === 'iphone' 
                  ? 'bg-emerald-500 text-white' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              iOS
            </button>
            <button
              onClick={() => setDevicePreview('android')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                devicePreview === 'android' 
                  ? 'bg-emerald-500 text-white' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Android
            </button>
          </div>

          <div className="h-8 w-px bg-border" />

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={isSaving || !isDirty}
            className="px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium text-text-primary hover:bg-border disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save
          </button>

          {/* Preview */}
          <button className="px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium text-text-primary hover:bg-border transition-colors flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </button>

          {/* Export */}
          <Link
            to={`/export/${projectId}`}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Link>
        </div>
      </header>

      {/* Second Row - Tabs */}
      <div className="h-12 bg-surface border-b border-border flex items-center px-4 gap-6">
        <button className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2">
          ⚙️ Setup
        </button>
        <button className="px-4 py-2 text-sm font-medium text-emerald-500 border-b-2 border-emerald-500 -mb-px flex items-center gap-2">
          🖼️ Background
        </button>
        <button className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2">
          🌍 Localise
        </button>
        <button className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2">
          📱 App Screens
        </button>
        
        <div className="flex-1" />
        
        {/* Device selector */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
          <Smartphone className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-medium text-emerald-600">
            {devicePreview === 'iphone' ? 'iOS Phones - 6.9"' : 'Android - 1080p'}
          </span>
          <ChevronRight className="w-4 h-4 text-emerald-500" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Elements */}
        <ElementsPanel />

        {/* Canvas Area - Horizontal Scrolling Slides */}
        <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden relative flex flex-col">
          {/* Slide Navigation */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
            <button
              onClick={() => scrollToSlide('left')}
              className="p-2 bg-white shadow-lg rounded-full hover:bg-slate-50 transition-colors disabled:opacity-30"
              disabled={currentSlideIndex <= 0}
            >
              <ChevronLeft className="w-5 h-5 text-text-primary" />
            </button>
            <span className="px-4 py-2 bg-white shadow-lg rounded-full text-sm font-medium text-text-primary">
              {currentSlideIndex + 1} / {slides.length}
            </span>
            <button
              onClick={() => scrollToSlide('right')}
              className="p-2 bg-white shadow-lg rounded-full hover:bg-slate-50 transition-colors disabled:opacity-30"
              disabled={currentSlideIndex >= slides.length - 1}
            >
              <ChevronRight className="w-5 h-5 text-text-primary" />
            </button>
          </div>

          {/* Slides Container */}
          <div
            ref={scrollContainerRef}
            className="flex-1 flex items-center gap-8 px-8 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide"
            style={{ 
              paddingTop: '60px',
              paddingBottom: '20px',
            }}
          >
            {slides.map((slide, index) => (
              <div 
                key={slide.id} 
                className="snap-center flex-shrink-0 h-[calc(100%-40px)]"
                style={{ minWidth: 'fit-content' }}
              >
                <TemplateSlide
                  slide={slide}
                  isActive={slide.id === currentSlideId}
                  index={index}
                  onClick={() => setCurrentSlideId(slide.id)}
                />
              </div>
            ))}

            {/* Add new slide button */}
            <div className="snap-center flex-shrink-0 h-[calc(100%-40px)] flex items-center">
              <button
                onClick={addSlide}
                className="h-full aspect-[9/19.5] rounded-2xl border-2 border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-500/5 transition-all flex flex-col items-center justify-center gap-3 group"
              >
                <div className="p-4 bg-slate-100 group-hover:bg-emerald-500/10 rounded-full transition-colors">
                  <Plus className="w-8 h-8 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                </div>
                <span className="text-sm font-medium text-slate-400 group-hover:text-emerald-500 transition-colors">
                  Add Slide
                </span>
              </button>
            </div>
          </div>

          {/* Slide Thumbnails */}
          <div className="h-20 bg-white border-t border-border flex items-center px-4 gap-2 overflow-x-auto">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlideId(slide.id)}
                className={`
                  flex-shrink-0 h-14 aspect-[9/19.5] rounded-lg overflow-hidden border-2 transition-all
                  ${slide.id === currentSlideId 
                    ? 'border-emerald-500 shadow-lg shadow-emerald-500/20' 
                    : 'border-transparent hover:border-slate-300'
                  }
                `}
                style={{ backgroundColor: slide.canvas.backgroundColor }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[8px] font-medium text-slate-600">{index + 1}</span>
                </div>
              </button>
            ))}
            <button
              onClick={addSlide}
              className="flex-shrink-0 h-14 aspect-[9/19.5] rounded-lg border-2 border-dashed border-slate-200 hover:border-emerald-500 flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Right Panel - Properties */}
        <ConfigPanel />
      </div>
    </div>
  )
}
