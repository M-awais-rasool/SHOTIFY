import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { authApi } from '@/lib/api'
import { Eye, EyeOff, Loader2, Check } from 'lucide-react'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const passwordRequirements = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setIsLoading(true)

    try {
      const response = await authApi.register(formData)
      const { token, user } = response.data.data
      setAuth(user, token)
      navigate('/dashboard')
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } }
      setError(error.response?.data?.error || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="card border-border/50">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-accent-green/10 rounded-2xl mb-4">
            <svg
              className="w-8 h-8 text-accent-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" strokeWidth="2" />
              <rect x="7" y="7" width="10" height="10" rx="1" fill="currentColor" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-text-primary">Create account</h1>
          <p className="text-text-secondary mt-2">Start creating stunning screenshots</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="label">
              Full name
            </label>
            <input
              id="name"
              type="text"
              required
              autoComplete="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {/* Password requirements */}
            <div className="mt-3 space-y-2">
              {passwordRequirements.map((req, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                      req.met ? 'bg-accent-green' : 'bg-border'
                    }`}
                  >
                    {req.met && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-xs ${req.met ? 'text-text-secondary' : 'text-text-muted'}`}>
                    {req.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-success w-full py-3"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create account'
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-text-secondary">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-accent-blue hover:text-accent-blue-hover transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
