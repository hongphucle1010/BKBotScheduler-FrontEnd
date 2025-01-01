interface ProgressCircleProps {
  progress: number
  size?: number
  strokeWidth?: number
  bgColor?: string
  progressColor?: string
}

export function ProgressCircle({
  progress = 0,
  size = 100,
  strokeWidth = 4,
  bgColor = 'currentColor',
  progressColor = '#fff71a'
}: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference
  if (progress === 100) {
    progressColor = '#33ff33'
  }

  return (
    <div className='relative' style={{ width: size, height: size }}>
      <svg className='w-full h-full' viewBox={`0 0 ${size} ${size}`}>
        <circle
          stroke={bgColor}
          className='opacity-20'
          strokeWidth={strokeWidth}
          fill='transparent'
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap='round'
          fill='transparent'
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transformOrigin: '50% 50%',
            transform: 'rotate(-90deg)',
            transition: 'stroke-dashoffset 0.35s'
          }}
        />
      </svg>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold'>
        {Math.round(progress)}%
      </div>
    </div>
  )
}
