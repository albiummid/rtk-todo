import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from './app/store'
import Footer from './components/Footer'
import Header from './components/Header'
import Navbar from './components/Navbar'
import TodoList from './components/TodoList'

function App() {
  return (
    <Provider store={store}>
      <Toaster position='bottom-center' reverseOrder={false} />
      <div className='grid place-items-center bg-blue-100 py-40 px-6 font-sans min-h-screen'>
        <Navbar />

        <div className='w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white'>
          <Header />
          <hr className='mt-4' />
          <TodoList />
          <hr className='mt-4' />
          <Footer />
        </div>
      </div>
    </Provider>
  )
}

export default App
