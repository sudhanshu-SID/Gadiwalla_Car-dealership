import React from 'react';

export default function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-surface rounded-card p-4 border border-border shadow-card overflow-hidden animate-pulse flex flex-col gap-4"
        >
          {/* Image skeleton */}
          <div className="w-full h-56 rounded-2xl bg-border-light relative overflow-hidden" />

          {/* Title & Badge */}
          <div className="flex justify-between items-start pt-2">
            <div className="space-y-2 flex-1">
              <div className="h-5 bg-border-light rounded-md w-3/4" />
              <div className="h-3 bg-border-light rounded-md w-1/2" />
            </div>
            <div className="h-6 w-16 bg-border-light rounded-badge" />
          </div>

          {/* Specs grid */}
          <div className="grid grid-cols-3 gap-2 py-2 border-y border-border-light">
            <div className="space-y-1">
              <div className="h-3 bg-border-light rounded w-12" />
              <div className="h-4 bg-border-light rounded w-16" />
            </div>
            <div className="space-y-1">
              <div className="h-3 bg-border-light rounded w-12" />
              <div className="h-4 bg-border-light rounded w-16" />
            </div>
            <div className="space-y-1">
              <div className="h-3 bg-border-light rounded w-12" />
              <div className="h-4 bg-border-light rounded w-16" />
            </div>
          </div>

          {/* Price & Button */}
          <div className="flex items-center justify-between pt-2">
            <div className="h-6 bg-border-light rounded-md w-24" />
            <div className="h-9 bg-border-light rounded-button w-28" />
          </div>
        </div>
      ))}
    </div>
  );
}
