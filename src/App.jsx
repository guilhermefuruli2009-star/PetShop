import './assets/css/base/base.css'
import './assets/css/post.css'
import './assets/css/404.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Pagina404 from './pages/404'
import Cabecalho from './components/cabecalho'
import Post from './pages/Post'
import Categoria from './pages/Categoria'
import SubCategoria from './pages/SubCategorias'
import CategoriaPosts from './pages/CategoriaPost'

import Admin from './pages/admin/admin'
import FormCategoria from './pages/admin/components/FormCategoria'
import CatAdmin from './pages/admin/CatAdmin'
import FormSubCategoria from './pages/admin/components/FormSubCategoria'
import AdminLayout from './pages/admin/AdminLayout'
import PostAdmin from './pages/PostAdmin' 
import FormPost from './pages/admin/components/FormPost'
 
function App() {
  return (
    <Router>
      <Cabecalho />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sobre' element={<Sobre />} />
        <Route path='/posts/:id' element={<Post />} />
       
        <Route path='/categorias/:id' element={<Categoria />}> 
          <Route index element={<CategoriaPosts />} />
          <Route path=':subcategoria' element={<SubCategoria />} /> 
        </Route>

        <Route path='/admin/' element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path='novacategoria' element={<FormCategoria />} />
          <Route path=':id' element={<FormCategoria />} />
          <Route path='categoria/:id' element={<CatAdmin />} />
          <Route path='sub/:id' element={<FormSubCategoria />} />
          <Route path='posts/' element={<PostAdmin />}/>
          <Route path='posts/NovoPost' element={<FormPost />}/>
          <Route path='posts/:id' element={<FormPost />}/>
        </Route>
 
        <Route path='*' element={<Pagina404 />} />
      </Routes>
    </Router>
  )
}
 
export default App;