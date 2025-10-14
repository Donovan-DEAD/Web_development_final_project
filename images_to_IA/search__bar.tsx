"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchBarProposal3Props {
  searchTerm: string
  onSearchChange: (value: string) => void
  onSearch: () => void
}

export function SearchBarProposal3({ searchTerm, onSearchChange, onSearch }: SearchBarProposal3Props) {
  const clearSearch = () => onSearchChange("")

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-agricultural-primary/20 to-agricultural-secondary/20 rounded-full blur-sm group-focus-within:blur-md transition-all duration-300"></div>
        <div className="relative bg-white rounded-full border border-agricultural-primary/20 shadow-sm group-focus-within:shadow-md transition-all duration-300">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-agricultural-primary h-5 w-5" />
          <Input
            type="text"
            placeholder="Buscar en el blog..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 pr-12 py-3 border-0 bg-transparent focus:ring-0 focus:outline-none rounded-full text-base"
            onKeyPress={(e) => e.key === "Enter" && onSearch()}
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-agricultural-primary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
