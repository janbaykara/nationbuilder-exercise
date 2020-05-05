export const Page: React.FC = ({ children }) => {
  return (
    <div
      style={{
        maxWidth: 600,
        padding: 20,
        margin: '0 auto',
        fontFamily: 'sans-serif'
      }}>
      {children}
    </div>
  )
}