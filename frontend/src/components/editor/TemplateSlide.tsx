import { useRef } from 'react'
import type { LayerConfig, TextProperties, ImageProperties, ShapeProperties } from '@/types'
import { useEditorStore, type Slide } from '@/stores/editorStore'
import { uploadApi } from '@/lib/api'
import { ImagePlus, Smartphone } from 'lucide-react'

interface TemplateSlideProps {
  slide: Slide
  isActive: boolean
  index: number
  onClick: () => void
}

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
      
      // Get the latest layer state from the store
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
    // Reset input so the same file can be selected again
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
    
    // For background shapes that cover the full canvas, don't use centering transforms
    const isFullBackground = layer.type === 'shape' && 
      layer.x === 0 && layer.y === 0 && 
      layer.width === slide.canvas.width && layer.height === slide.canvas.height

    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      left: isFullBackground ? '0' : `${(layer.x / slide.canvas.width) * 100}%`,
      top: isFullBackground ? '0' : `${(layer.y / slide.canvas.height) * 100}%`,
      width: `${(layer.width / slide.canvas.width) * 100}%`,
      height: layer.type === 'text' ? 'auto' : `${(layer.height / slide.canvas.height) * 100}%`,
      transform: isFullBackground ? 'none' : `translate(-50%, ${layer.type === 'text' ? '0' : '-50%'}) rotate(${layer.rotation}deg)`,
      opacity: layer.opacity,
      cursor: layer.locked ? 'default' : 'pointer',
      zIndex: layer.zIndex,
    }

    const selectionStyle: React.CSSProperties = isSelected ? {
      outline: '2px solid #4ADE80',
      outlineOffset: '2px',
      borderRadius: '4px',
    } : {}

    switch (layer.type) {
      case 'text': {
        const props = layer.properties as TextProperties
        return (
          <div
            key={layer.id}
            onClick={(e) => handleLayerClick(e, layer.id)}
            style={{
              ...baseStyle,
              ...selectionStyle,
              fontFamily: props.fontFamily,
              fontSize: `${(props.fontSize / slide.canvas.width) * 100}vw`,
              fontWeight: props.fontWeight,
              color: props.color,
              textAlign: props.align,
              lineHeight: props.lineHeight,
              whiteSpace: 'pre-wrap',
              padding: '4px',
            }}
            className={`transition-all duration-150 ${!layer.locked ? 'hover:outline hover:outline-2 hover:outline-emerald-400/50 hover:outline-offset-2' : ''}`}
          >
            {props.content}
          </div>
        )
      }

      case 'image':
      case 'screenshot': {
        const props = layer.properties as ImageProperties
        return (
          <div
            key={layer.id}
            onClick={(e) => handleLayerClick(e, layer.id)}
            style={{
              ...baseStyle,
              ...selectionStyle,
              borderRadius: `${props.borderRadius}px`,
              overflow: 'hidden',
              boxShadow: props.shadow 
                ? `${props.shadowOffsetX}px ${props.shadowOffsetY}px ${props.shadowBlur}px ${props.shadowColor}`
                : 'none',
            }}
            className={`transition-all duration-150 ${!layer.locked ? 'hover:outline hover:outline-2 hover:outline-emerald-400/50 hover:outline-offset-2' : ''}`}
          >
            {props.src ? (
              <img
                src={props.src}
                alt={layer.name}
                className="w-full h-full object-cover"
                draggable={false}
              />
            ) : (
              <div 
                className="w-full h-full bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center gap-3 border-2 border-dashed border-white/30 rounded-[inherit]"
                onClick={(e) => {
                  e.stopPropagation()
                  handleLayerClick(e, layer.id)
                  triggerFileUpload(layer.id)
                }}
              >
                <div className="p-3 bg-white/10 rounded-full">
                  {layer.type === 'screenshot' ? (
                    <Smartphone className="w-8 h-8 text-white/60" />
                  ) : (
                    <ImagePlus className="w-8 h-8 text-white/60" />
                  )}
                </div>
                <span className="text-xs text-white/60 font-medium">
                  {props.placeholder || 'Click to add image'}
                </span>
              </div>
            )}
          </div>
        )
      }

      case 'shape': {
        const props = layer.properties as ShapeProperties
        return (
          <div
            key={layer.id}
            onClick={(e) => handleLayerClick(e, layer.id)}
            style={{
              ...baseStyle,
              ...selectionStyle,
              backgroundColor: props.fill,
              borderRadius: props.shapeType === 'circle' ? '50%' : `${props.cornerRadius}px`,
              border: props.stroke ? `${props.strokeWidth}px solid ${props.stroke}` : 'none',
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
  
  // Check if there's a background shape layer - if not, use canvas background color
  const hasBackgroundLayer = slide.layers.some(l => 
    l.type === 'shape' && l.x === 0 && l.y === 0 && 
    l.width === slide.canvas.width && l.height === slide.canvas.height
  )

  return (
    <div className="relative h-full flex-shrink-0 group" style={{ aspectRatio: `${slide.canvas.width}/${slide.canvas.height}` }}>
      {/* Slide number indicator */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-surface rounded-full text-xs font-medium text-text-secondary">
        {index + 1}
      </div>

      {/* Slide container */}
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
        style={{ backgroundColor: hasBackgroundLayer ? 'transparent' : slide.canvas.backgroundColor }}
      >
        {/* Layers */}
        {sortedLayers.map(renderLayer)}

        {/* Active indicator */}
        {isActive && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full shadow-lg">
            Editing
          </div>
        )}
      </div>

      {/* Hidden file input */}
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
