'use client'

import { useEffect, useState } from 'react'
import {
  Check,
  Cpu,
  MapPin,
  Radio,
  Search,
  Server,
  X,
} from 'lucide-react'
import { ParentModule } from './types'
import { PARENT_MODULES } from './parent-modules'

interface ParentModuleModalProps {
  isOpen: boolean
  selectedModuleId: string
  onSelect: (moduleId: string) => void
  onClose: () => void
}

export function ParentModuleModal({
  isOpen,
  selectedModuleId,
  onSelect,
  onClose,
}: ParentModuleModalProps) {
  const [search, setSearch] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const filteredModules = PARENT_MODULES.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.id.toLowerCase().includes(search.toLowerCase()) ||
      m.location.toLowerCase().includes(search.toLowerCase()) ||
      m.protocol.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border p-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40">
              <Server className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground leading-snug">
                Select Parent Module
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Choose which gateway or mesh controller to inspect and filter attached nodes
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-border bg-muted/20">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search parent modules by name, ID (e.g. DHR-GW-01), or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-lg border border-border bg-card pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-emerald-500 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              autoFocus
            />
          </div>
        </div>

        {/* Modules List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredModules.length > 0 ? (
            filteredModules.map((module) => {
              const isSelected = selectedModuleId === module.id

              return (
                <div
                  key={module.id}
                  onClick={() => {
                    onSelect(module.id)
                    onClose()
                  }}
                  className={`group relative flex items-center justify-between gap-3 rounded-xl border p-3.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500/80 bg-emerald-500/5 shadow-xs dark:bg-emerald-950/20'
                      : 'border-border bg-card hover:border-border/80 hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-lg mt-0.5 ${
                        isSelected
                          ? 'bg-emerald-500 text-white dark:bg-emerald-600'
                          : 'bg-muted text-muted-foreground group-hover:text-foreground'
                      }`}
                    >
                      <Server className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-foreground">
                          {module.name}
                        </span>
                        <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border/50">
                          {module.id}
                        </span>
                        {module.status === 'online' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                            <span className="size-1.5 rounded-full bg-emerald-500" />
                            Online
                          </span>
                        ) : module.status === 'warning' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                            <span className="size-1.5 rounded-full bg-amber-500" />
                            Warning
                          </span>
                        ) : null}
                      </div>

                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {module.description}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-2 flex-wrap">
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3 text-muted-foreground/80" />
                          {module.location}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 font-mono">
                          <Radio className="size-3 text-muted-foreground/80" />
                          {module.protocol}
                        </span>
                        <span>·</span>
                        <span className="font-mono text-foreground/80">
                          {module.ipAddress}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right hidden sm:block">
                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold bg-muted text-foreground border border-border">
                        <Cpu className="size-3 text-sky-500" />
                        {module.nodeIds.length} Nodes
                      </span>
                    </div>

                    <div
                      className={`flex size-6 items-center justify-center rounded-full border transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : 'border-border text-transparent group-hover:border-muted-foreground'
                      }`}
                    >
                      <Check className="size-3.5 stroke-[3]" />
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No parent modules match &quot;{search}&quot;.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border p-4 bg-muted/20 text-xs">
          <span className="text-muted-foreground">
            {filteredModules.length} parent modules available
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border bg-card px-4 py-1.5 font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
