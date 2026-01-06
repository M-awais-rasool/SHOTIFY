import { useRef } from 'react'
import type { LayerConfig, TextProperties, ImageProperties, ShapeProperties } from '@/types'
import { useEditorStore } from '@/stores/editorStore'
import { uploadApi } from '@/lib/api'
import { calculateLayerStyle, LayoutConfig, normalizeLayerProperties, TemplateSlideProps } from '@/lib/layerUtils'
import { ImagePlus, Smartphone } from 'lucide-react'

export default function TemplateSlide({ slide, isActive, index, onClick }: TemplateSlideProps) {
  const { selectedLayerId, setSelectedLayerId, currentSlideId, updateLayer } = useEditorStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadingLayerId = useRef<string | null>(null)

  const handleLayerClick = (e: React.MouseEvent, layerId: string) => {
    e.stopPropagation()
    if (slide.id !== currentSlideId) {
      onClick()
    }
    setSelectedLayerId(layerId)
  }

  const handleSlideClick = () => {
    onClick()
    setSelectedLayerId(null)
  }

  const handleImageUpload = async (layerId: string, file: File) => {
    try {
      const response = await uploadApi.uploadImage(file)
      const imageUrl = response.data.data.url
      
      const currentSlide = useEditorStore.getState().slides.find(s => s.id === slide.id)
      const layer = currentSlide?.layers.find(l => l.id === layerId)
      
      if (layer) {
        updateLayer(slide.id, layerId, {
          properties: {
            ...layer.properties,
            src: imageUrl,
          },
        })
      }
    } catch (error) {
      console.error('Failed to upload image:', error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && uploadingLayerId.current) {
      handleImageUpload(uploadingLayerId.current, file)
    }
    uploadingLayerId.current = null
    if (e.target) {
      e.target.value = ''
    }
  }

  const triggerFileUpload = (layerId: string) => {
    uploadingLayerId.current = layerId
    fileInputRef.current?.click()
  }

  const renderLayer = (layer: LayerConfig) => {
    if (!layer.visible) return null

    const isSelected = selectedLayerId === layer.id && slide.id === currentSlideId
    
    const selectionStyle: React.CSSProperties = isSelected ? {
      outline: '2px solid #4ADE80',
      outlineOffset: '2px',
      borderRadius: '4px',
    } : {}

    switch (layer.type) {
      case 'text': {
        const props = normalizeLayerProperties<TextProperties>(layer.properties)
        
        const layoutConfig: LayoutConfig = {
          position: props.position || 'center',
          anchorX: props.anchorX || 'center',
          anchorY: props.anchorY || 'top',
          offsetX: props.offsetX || 0,
          offsetY: props.offsetY || layer.y,
        }
        
        const baseStyle = calculateLayerStyle(layer, slide.canvas, layoutConfig)
        
        return (
          <div
            key={layer.id}
            onClick={(e) => handleLayerClick(e, layer.id)}
            style={{
              ...baseStyle,
              ...selectionStyle,
              fontFamily: props.fontFamily || 'Inter',
              fontSize: `${props.fontSize}px`,
              fontWeight: props.fontWeight || '400',
              color: props.color || '#000000',
              textAlign: (props.align || 'left') as 'left' | 'center' | 'right',
              lineHeight: props.lineHeight || 1.5,
              whiteSpace: 'pre-wrap',
              padding: '4px',
            }}
            className={`transition-all duration-150 ${!layer.locked ? 'hover:outline hover:outline-2 hover:outline-emerald-400/50 hover:outline-offset-2' : ''}`}
          >
            {props.content || ''}
          </div>
        )
      }

      case 'image':
      case 'screenshot': {
        const props = normalizeLayerProperties<ImageProperties>(layer.properties)
        
        const layoutConfig: LayoutConfig = {
          position: props.position || 'center',
          anchorX: props.anchorX || 'center',
          anchorY: props.anchorY || 'center',
          offsetX: props.offsetX || 0,
          offsetY: props.offsetY || layer.y,
          scale: props.scale || 1,
        }
        
        const baseStyle = calculateLayerStyle(layer, slide.canvas, layoutConfig)
        
        return (
          <div
            key={layer.id}
            onClick={(e) => handleLayerClick(e, layer.id)}
            style={{
              ...baseStyle,
              ...selectionStyle,
              borderRadius: `${props.borderRadius || 0}px`,
              overflow: 'visible',
              boxShadow: props.shadow 
                ? `${props.shadowOffsetX || 0}px ${props.shadowOffsetY || 0}px ${props.shadowBlur || 0}px ${props.shadowColor || 'rgba(0,0,0,0.2)'}`
                : 'none',
            }}
            className={`transition-all duration-150 ${!layer.locked ? 'hover:outline hover:outline-2 hover:outline-emerald-400/50 hover:outline-offset-2' : ''}`}
          >
            {props.src ? (
              <img
                src={props.src}
                alt={layer.name}
                className="w-full h-full object-cover"
                style={{ borderRadius: `${props.borderRadius || 0}px` }}
                draggable={false}
              />
            ) : (
              <div 
                className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-400/50"
                style={{ borderRadius: `${props.borderRadius || 0}px` }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleLayerClick(e, layer.id)
                  triggerFileUpload(layer.id)
                }}
              >
                <div className="p-4 bg-white/50 rounded-full">
                  {layer.type === 'screenshot' ? (
                    <Smartphone className="w-10 h-10 text-slate-500" />
                  ) : (
                    <ImagePlus className="w-10 h-10 text-slate-500" />
                  )}
                </div>
                <span className="text-sm text-slate-600 font-medium">
                  {props.placeholder || 'Click to add image'}
                </span>
              </div>
            )}
          </div>
        )
      }

      case 'shape': {
        const props = normalizeLayerProperties<ShapeProperties>(layer.properties)
        
        const layoutConfig: LayoutConfig = {
          position: props.position || 'center',
          anchorX: props.anchorX || 'center',
          anchorY: props.anchorY || 'center',
          offsetX: props.offsetX || 0,
          offsetY: props.offsetY || layer.y,
        }
        
        const baseStyle = calculateLayerStyle(layer, slide.canvas, layoutConfig)
        
        return (
          <div
            key={layer.id}
            onClick={(e) => handleLayerClick(e, layer.id)}
            style={{
              ...baseStyle,
              ...selectionStyle,
              backgroundColor: props.fill || 'transparent',
              borderRadius: props.shapeType === 'circle' ? '50%' : `${props.cornerRadius || 0}px`,
              border: props.stroke ? `${props.strokeWidth || 0}px solid ${props.stroke}` : 'none',
            }}
            className={`transition-all duration-150 ${!layer.locked ? 'hover:outline hover:outline-2 hover:outline-emerald-400/50 hover:outline-offset-2' : ''}`}
          />
        )
      }

      default:
        return null
    }
  }

  const sortedLayers = [...slide.layers].sort((a, b) => a.zIndex - b.zIndex)
  const backgroundColor = slide.canvas.backgroundColor

  return (
    <div className="relative h-full flex-shrink-0 group" style={{ aspectRatio: `${slide.canvas.width}/${slide.canvas.height}` }}>
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-surface rounded-full text-xs font-medium text-text-secondary">
        {index + 1}
      </div>

      <div
        onClick={handleSlideClick}
        className={`
          relative w-full h-full rounded-2xl overflow-hidden cursor-pointer
          transition-all duration-200
          ${isActive 
            ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-background shadow-xl shadow-emerald-500/20' 
            : 'ring-1 ring-border hover:ring-2 hover:ring-emerald-400/50 hover:shadow-lg'
          }
        `}
        style={{ backgroundColor }}
      >
        {sortedLayers.map(renderLayer)}

        {isActive && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full shadow-lg">
            Editing
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
