import * as React from 'react'
import * as ReactDOM from 'react-dom'

const Main: React.FC = () => {
  return <div>yo</div>
}

const rootNode = document.getElementById('root')

ReactDOM.render(<Main />, rootNode)
