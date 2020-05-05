import * as React from 'react'

export const ResponseObject: React.FC<any> = ({ title = 'Response object', ...props }) => {
  return (
    <div style={{ border: '1px solid black', padding: 10, opacity: 0.5 }}>
      <pre style={{ fontWeight: 'bold' }}>{title}</pre>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}