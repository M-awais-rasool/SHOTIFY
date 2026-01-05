import { useState } from 'react'
import { useEditorStore } from '@/stores/editorStore'
import {
  Layers,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Type,
  Image,
  Square,
  Smartphone,
  Trash2,
  ChevronDown,
  Plus,
} from 'lucide-react'

const layerIcons: Record<string, React.ReactNode> = {
  text: <Type className="w-4 h-4" />,
  image: <Image className="w-4 h-4" />,
  screenshot: <Smartphone className="w-4 h-4" />,
  shape: <Square className="w-4 h-4" />,
}

export default function ElementsPanel() {
  const {
    slides,
    currentSlideId,
    selectedLayerId,
    setSelectedLayerId,
    updateLayer,
    deleteLayer,
  } = useEditorStore()

  const [isCollapsed, setIsCollapsed] = useState(false)

  const currentSlide = slides.find(s => s.id === currentSlideId)
  const layers = currentSlide?.layers || []
  const sortedLayers = [...layers].sort((a, b) => b.zIndex - a.zIndex)

  const handleLayerUpdate = (layerId: string, updates: Record<string, unknown>) => {
    if (currentSlideId) {
      updateLayer(currentSlideId, layerId, updates)
    }
  }

  const handleDeleteLayer = (layerId: string) => {
    if (currentSlideId) {
      deleteLayer(currentSlideId, layerId)
    }
  }

  return (
    <div className={`bg-background border-r border-border h-full flex flex-col transition-all duration-200 ${isCollapsed ? 'w-12' : 'w-64'}`}>
      {/* Header */}
      <div className="px-4 py-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Layers className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-sm font-semibold text-text-primary">Elements</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-surface rounded-lg transition-colors"
        >
          <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${isCollapsed ? '-rotate-90' : ''}`} />
        </button>
      </div>

      {/* Elements List */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {sortedLayers.map((layer) => (
              <div
                key={layer.id}
                onClick={() => setSelectedLayerId(layer.id)}
                className={`
                  group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer
                  transition-all duration-150
                  ${
                    selectedLayerId === layer.id
                      ? 'bg-emerald-500/10 border border-emerald-500/30'
                      : 'hover:bg-surface border border-transparent'
                  }
                  ${!layer.visible ? 'opacity-50' : ''}
                `}
              >
                {/* Layer icon */}
                <div className={`p-1.5 rounded-lg ${selectedLayerId === layer.id ? 'bg-emerald-500/20 text-emerald-500' : 'bg-surface text-text-secondary'}`}>
                  {layerIcons[layer.type] || <Square className="w-4 h-4" />}
                </div>

                {/* Layer name */}
                <span className="flex-1 text-sm truncate text-text-primary">
                  {layer.name}
                </span>

                {/* Quick actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleLayerUpdate(layer.id, { visible: !layer.visible })
                    }}
                    className="p-1.5 rounded-lg hover:bg-background transition-colors"
                  >
                    {layer.visible ? (
                      <Eye className="w-3.5 h-3.5 text-text-muted" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-text-muted" />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleLayerUpdate(layer.id, { locked: !layer.locked })
                    }}
                    className="p-1.5 rounded-lg hover:bg-background transition-colors"
                  >
                    {layer.locked ? (
                      <Lock className="w-3.5 h-3.5 text-amber-500" />
                    ) : (
                      <Unlock className="w-3.5 h-3.5 text-text-muted" />
                    )}
                  </button>
                  {!layer.locked && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteLayer(layer.id)
                      }}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {layers.length === 0 && (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center mx-auto mb-3">
                <Layers className="w-6 h-6 text-text-muted" />
              </div>
              <p className="text-sm text-text-muted">No elements</p>
            </div>
          )}
        </div>
      )}

      {/* Add element button */}
      {!isCollapsed && (
        <div className="p-3 border-t border-border">
          <button className="w-full py-2.5 px-4 bg-surface hover:bg-border text-text-primary rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            Add Element
          </button>
        </div>
      )}
    </div>
  )
}
