import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { projectsApi } from '@/lib/api'
import type { Project } from '@/types'
import {
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
  FolderOpen,
  Smartphone,
  Search,
  Grid3X3,
  List,
  Sparkles,
  Clock,
  ArrowUpRight,
} from 'lucide-react'
import { formatDistanceToNow } from '@/lib/utils'

export default function DashboardPage() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    fetchProjects()
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setMenuOpenId(null)
    if (menuOpenId) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [menuOpenId])

  const fetchProjects = async () => {
    try {
      const response = await projectsApi.getAll()
      setProjects(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await projectsApi.delete(id)
      setProjects(projects.filter((p) => p.id !== id))
    } catch (error) {
      console.error('Failed to delete project:', error)
    } finally {
      setDeleteId(null)
    }
  }

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-float-slower" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-float" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 animate-slide-up">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                Your Projects
              </h1>
            </div>
            <p className="text-slate-500 ml-12">
              Create beautiful app screenshots in minutes
            </p>
          </div>
          
          <Link 
            to="/templates" 
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
            New Project
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
          </Link>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 shadow-sm hover:shadow-md"
            />
          </div>
          
          <div className="flex items-center gap-2 p-1.5 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-lg transition-all duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-emerald-500 text-white shadow-md' 
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-lg transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-emerald-500 text-white shadow-md' 
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        {!isLoading && projects.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            {[
              { label: 'Total Projects', value: projects.length, icon: FolderOpen, color: 'emerald' },
              { label: 'This Week', value: projects.filter(p => new Date(p.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length, icon: Clock, color: 'blue' },
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-white/60 backdrop-blur-sm border border-slate-200/80 rounded-xl hover:shadow-lg transition-all duration-300 group">
                <div className={`inline-flex p-2 rounded-lg mb-2 ${
                  stat.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-500" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-emerald-500/30" />
            </div>
            <p className="mt-6 text-slate-500 animate-pulse">Loading your projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="relative overflow-hidden bg-white/60 backdrop-blur-sm border border-slate-200 rounded-3xl p-16 text-center animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-blue-50/50" />
            <div className="relative">
              <div className="inline-flex p-6 bg-gradient-to-br from-slate-100 to-slate-50 rounded-3xl mb-6 shadow-inner">
                <FolderOpen className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                {searchQuery ? 'No projects found' : 'Start your first project'}
              </h3>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">
                {searchQuery 
                  ? 'Try adjusting your search terms'
                  : 'Create stunning app store screenshots with our beautiful templates'
                }
              </p>
              {!searchQuery && (
                <Link 
                  to="/templates" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Project
                </Link>
              )}
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-white/70 backdrop-blur-sm border border-slate-200/80 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 hover:border-emerald-200 transition-all duration-500 animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => navigate(`/editor/${project.id}`)}
              >
                {/* Thumbnail */}
                <div className="aspect-[9/16] bg-gradient-to-br from-slate-100 to-slate-50 relative overflow-hidden">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-slate-200 to-slate-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <Smartphone className="w-8 h-8 text-slate-400" />
                        </div>
                        <span className="text-xs text-slate-400">No preview</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-slate-800 font-medium text-sm rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      Open Editor
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-800 truncate group-hover:text-emerald-600 transition-colors duration-300">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <p className="text-xs text-slate-500">
                          {formatDistanceToNow(project.updatedAt)}
                        </p>
                      </div>
                    </div>

                    {/* Menu */}
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setMenuOpenId(menuOpenId === project.id ? null : project.id)
                        }}
                        className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {menuOpenId === project.id && (
                        <div
                          className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden animate-scale-in origin-top-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => {
                              setMenuOpenId(null)
                              navigate(`/editor/${project.id}`)
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit Project
                          </button>
                          <div className="h-px bg-slate-100" />
                          <button
                            onClick={() => {
                              setMenuOpenId(null)
                              setDeleteId(project.id)
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete Project
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-3">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group flex items-center gap-4 p-4 bg-white/70 backdrop-blur-sm border border-slate-200/80 rounded-xl cursor-pointer hover:shadow-lg hover:border-emerald-200 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.03}s` }}
                onClick={() => navigate(`/editor/${project.id}`)}
              >
                {/* Thumbnail */}
                <div className="w-16 h-28 bg-gradient-to-br from-slate-100 to-slate-50 rounded-lg overflow-hidden flex-shrink-0">
                  {project.thumbnail ? (
                    <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-slate-400" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-800 truncate group-hover:text-emerald-600 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Updated {formatDistanceToNow(project.updatedAt)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/editor/${project.id}`)
                    }}
                    className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeleteId(project.id)
                    }}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setDeleteId(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Delete Project?
              </h3>
              <p className="text-slate-500">
                This action cannot be undone. All project data will be permanently removed.
              </p>
            </div>
            <div className="flex gap-3 p-4 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-3 text-slate-700 font-medium bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 px-4 py-3 text-white font-medium bg-gradient-to-r from-red-500 to-red-600 rounded-xl hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/30 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
