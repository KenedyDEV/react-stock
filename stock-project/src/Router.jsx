import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import Dashboard from './Pages/Dashboard'
import StockLayout from './components/StockLayout'
import AllItems from './Pages/AllItems'
import CreateItem from './Pages/CreateItem'
import ShowItem from './Pages/ShowItem'
import UpdateItem from './Pages/UpdateItem'
import LoadingComponent from './components/LoadingComponent'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <Dashboard/>,
      },
      {
        path: '/items',
        element: <StockLayout/>,
        children: [
          {
            index: true,
            element: <AllItems/>, 
          },
          {
            path: '/items/createItem',
            element: <CreateItem/>,
          },
          {
            path: '/items/:itemId',
            element: <ShowItem/>,
          },
          {
            path: '/items/update/:itemId',
            element: <UpdateItem/>,

          }

        ]
      }
    ]
  },{
    element: <LoadingComponent/>
  }
])

export default router