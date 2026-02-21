import { useEffect, useState } from 'react'
import { useParams, Link, Outlet } from 'react-router-dom'
import '../../assets/css/blog.css'
import ListaCatAdmin from './components/ListaCatAdmin'
// import ListaPost from '../components/listaPost'
import { busca } from '../../api'
import { Button } from '@mui/material'

const CatAdmin = () => {
    const { id } = useParams();
    const [subcategorias, setSubCategorias] = useState([])

    useEffect(() => {
        busca(`/categorias/${id}`, (categoria) => {
            setSubCategorias(categoria.subcategorias);
        })
    }, [id]);

    return (
        <>
            {/* <div className="container">
                <h2 className="titulo-pagina">Administração</h2>
            </div> */}
            <div className='container'>
                <table className="tabela">
                    <thead>
                        <tr>
                            <th colSpan="3" className="tabela__coluna--g">
                                SubCategoria: <span className='cartao__titulo'>{id}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr> {
                            subcategorias.map((subcategoria) => (
                                <td className="tabela__coluna--m" key={subcategoria.id}>
                                    {subcategoria}
                                </td>
                            ))
                        }
                            <td>
                                <Link to={`/admin/sub/${id}`}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        fullWidth
                                        sx={{ marginTop: 1 }}
                                    >
                                        Editar SubCategorias
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <ListaCatAdmin />
        </>
    )
}

export default CatAdmin