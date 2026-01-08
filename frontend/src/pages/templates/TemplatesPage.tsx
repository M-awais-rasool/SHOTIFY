import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { templatesApi, projectsApi } from '@/lib/api'
import type { Template } from '@/types'
import { 
  Loader2, 
  Apple, 
  Smartphone, 
  Layers, 
  ArrowRight, 
  Sparkles,
  LayoutTemplate,
  Zap,
  X,
  Check,
} from 'lucide-react'

type PlatformFilter = 'all' | 'ios' | 'android'

export default function TemplatesPage() {
  const navigate = useNavigate()
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<PlatformFilter>('all')
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [projectName, setProjectName] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    fetchTemplates()
  }, [filter])

  const fetchTemplates = async () => {
    try {
      const response = await templatesApi.getAll(filter === 'all' ? undefined : filter)
      setTemplates(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch templates:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateProject = async () => {
    if (!selectedTemplate || !projectName.trim()) return

    setIsCreating(true)
    try {
      const response = await projectsApi.create({
        templateId: selectedTemplate.id,
        name: projectName.trim(),
      })
      navigate(`/editor/${response.data.data.id}`)
    } catch (error) {
      console.error('Failed to create project:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const platformFilters: { value: PlatformFilter; label: string; icon: React.ReactNode; color: string }[] = [
    { value: 'all', label: 'All Templates', icon: <Layers className="w-4 h-4" />, color: 'slate' },
    { value: 'ios', label: 'iOS', icon: <Apple className="w-4 h-4" />, color: 'blue' },
    { value: 'android', label: 'Android', icon: <Smartphone className="w-4 h-4" />, color: 'emerald' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-float-slower" />
        <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-float" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Start Creating in Seconds
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent mb-4">
            Choose Your Template
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Professional templates designed for App Store and Play Store. 
            Pick one and start customizing in our powerful editor.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {platformFilters.map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`
                group relative flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm
                transition-all duration-300 ease-out
                ${filter === value
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-white/80 backdrop-blur-sm text-slate-600 border border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:-translate-y-0.5'
                }
              `}
            >
              <span className={`transition-transform duration-300 ${filter === value ? 'scale-110' : 'group-hover:scale-110'}`}>
                {icon}
              </span>
              {label}
              {filter === value && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-md flex items-center justify-center">
                  <Check className="w-2 h-2 text-emerald-500" />
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-10 animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-800">{templates.length}</p>
            <p className="text-sm text-slate-500">Templates</p>
          </div>
          <div className="w-px bg-slate-200" />
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-800">2</p>
            <p className="text-sm text-slate-500">Platforms</p>
          </div>
          <div className="w-px bg-slate-200" />
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-500">Free</p>
            <p className="text-sm text-slate-500">To Start</p>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-500" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-emerald-500/30" />
            </div>
            <p className="mt-6 text-slate-500 animate-pulse">Loading templates...</p>
          </div>
        ) : templates.length === 0 ? (
          <div className="relative overflow-hidden bg-white/60 backdrop-blur-sm border border-slate-200 rounded-3xl p-16 text-center animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-blue-50/50" />
            <div className="relative">
              <div className="inline-flex p-6 bg-gradient-to-br from-slate-100 to-slate-50 rounded-3xl mb-6 shadow-inner">
                <LayoutTemplate className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">No templates found</h3>
              <p className="text-slate-500">Try changing the filter to see more templates</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template, index) => (
              <div
                key={template.id}
                onClick={() => {
                  setSelectedTemplate(template)
                  setProjectName(`${template.name} Project`)
                }}
                className={`
                  group relative bg-white/70 backdrop-blur-sm border rounded-2xl overflow-hidden cursor-pointer 
                  transition-all duration-500 ease-out animate-slide-up
                  hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2
                  ${selectedTemplate?.id === template.id
                    ? 'border-emerald-400 ring-2 ring-emerald-400/30 shadow-xl shadow-emerald-500/10'
                    : 'border-slate-200/80 hover:border-emerald-200'
                  }
                `}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Selected Badge */}
                {selectedTemplate?.id === template.id && (
                  <div className="absolute top-3 right-3 z-10 p-1.5 bg-emerald-500 rounded-full shadow-lg animate-scale-in">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Preview */}
                <div className="aspect-[9/16] relative overflow-hidden">
                  <div
                    className="w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundColor: template.jsonConfig.canvas.backgroundColor }}
                  >
                    {/* Mockup placeholder */}
                    <div className="w-3/4 h-3/4 flex flex-col items-center justify-center gap-3">
                      <div className="w-full h-4 bg-white/30 rounded-full animate-pulse" />
                      <div className="w-2/3 h-3 bg-white/20 rounded-full" />
                      <div className="w-1/2 h-32 bg-white/20 rounded-xl mt-4 shadow-inner" />
                      <div className="w-1/3 h-3 bg-white/15 rounded-full mt-2" />
                    </div>
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover CTA */}
                  <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-sm text-slate-800 font-semibold text-sm rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <Sparkles className="w-4 h-4 text-emerald-500" />
                      Use This Template
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 bg-gradient-to-b from-transparent to-slate-50/50">
                  <h3 className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors duration-300 mb-2">
                    {template.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`
                      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                      ${template.platform === 'ios' 
                        ? 'bg-blue-100 text-blue-700' 
                        : template.platform === 'android' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-purple-100 text-purple-700'
                      }
                    `}>
                      {template.platform === 'ios' ? <Apple className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
                      {template.platform === 'both' ? 'Both' : template.platform.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-400">
                      {template.jsonConfig.canvas.width} × {template.jsonConfig.canvas.height}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {selectedTemplate && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" 
          onClick={() => setSelectedTemplate(null)}
        >
          <div 
            className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedTemplate(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Template Preview */}
            <div 
              className="h-40 flex items-center justify-center relative overflow-hidden"
              style={{ backgroundColor: selectedTemplate.jsonConfig.canvas.backgroundColor }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20" />
              <div className="relative text-center">
                <div className="inline-flex p-3 bg-white/20 backdrop-blur-sm rounded-2xl mb-2">
                  <LayoutTemplate className="w-8 h-8 text-white" />
                </div>
                <p className="text-white/90 font-medium">{selectedTemplate.name}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 rounded-xl">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Create New Project</h2>
                  <p className="text-sm text-slate-500">Give your project a memorable name</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="projectName" className="block text-sm font-medium text-slate-700 mb-2">
                    Project Name
                  </label>
                  <input
                    id="projectName"
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="My Awesome App"
                    autoFocus
                  />
                </div>

                {/* Template Info */}
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <span className={`
                    inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                    ${selectedTemplate.platform === 'ios' 
                      ? 'bg-blue-100 text-blue-700' 
                      : selectedTemplate.platform === 'android' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-purple-100 text-purple-700'
                    }
                  `}>
                    {selectedTemplate.platform === 'ios' ? <Apple className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
                    {selectedTemplate.platform === 'both' ? 'iOS & Android' : selectedTemplate.platform.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-500">
                    {selectedTemplate.jsonConfig.canvas.width} × {selectedTemplate.jsonConfig.canvas.height}
                  </span>
                  <span className="text-xs text-slate-500">
                    • {selectedTemplate.jsonConfig.layers?.length || 0} layers
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-4 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => setSelectedTemplate(null)}
                className="flex-1 px-4 py-3 text-slate-700 font-medium bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                disabled={isCreating || !projectName.trim()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-white font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    Create Project
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
