import './Footer.css' // Import the CSS file

export default function Footer() {
  return (
    <div
      className="footer p-d-flex p-jc-center p-ai-center p-p-3"
      style={{
        backgroundColor: '#f8f9fa',
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
    >
      <div
        className="p-d-flex p-jc-between p-ai-center"
        style={{ width: '100%' }}
      >
        <span>
          Powered by <a href="https://nodely.io">Algonode.io</a>{' '}
        </span>
      </div>
    </div>
  )
}
