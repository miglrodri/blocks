import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import Layout from './pages/Layout'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Layout />
    </DndProvider>
  )
}

export default App
