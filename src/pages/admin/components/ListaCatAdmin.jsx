import { useEffect, useState } from "react";
import { api, busca } from "../../../api";
import { Link } from "react-router-dom";
import "../components/tabela.css";
import { Button } from '@mui/material'

const ListaCatAdmin = () => {
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        busca(`/categorias`, setCategorias)
    }, [])

    // Função para deletar a categoria
    const excluir = (CategoriaDel) => {
        api.delete(`categorias/${CategoriaDel.id}/`)
            .then(() => {
                // Remove a categoria do estado local para atualizar a UI
                const listaCategorias = categorias
                    .filter(categoria => categoria.id !== CategoriaDel.id);
                setCategorias([...listaCategorias]);
            });
    }

    return (
        <section className="container">
            <table className="tabela">
                <thead>
                    <tr>
                        <th className="tabela__coluna--g">Categoria</th>
                        <th colSpan="4" className="tabela__coluna--p tabela__alinhamento--direita">
                            <Link to="/admin/NovaCategoria">
                                <Button variant="contained"  sx={{ marginTop: 1 }}>
                                    Nova Categoria
                                </Button>
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categorias.map((categoria) => (
                            <tr key={categoria.id}>
                                <td className="tabela__coluna--m">
                                    <Link to={`/categoria/${categoria.id}`}>{categoria.nome}</Link>
                                </td>
                                <td colSpan="2" className="tabela__coluna--p tabela__alinhamento--direita">

                                    {/* Botão EDITAR */}
                                    <Link to={`/admin/${categoria.id}`} style={{ textDecoration: 'none' }}>
                                        <Button type="button" variant="contained" color="warning" sx={{ margin: "0 0.25rem" }}>
                                            Editar
                                        </Button>
                                    </Link>
                                </td>
                                <td>
                                    {/* Botão EXCLUIR */}
                                    <Link to="/admin" style={{ textDecoration: 'none' }}>
                                        <Button type="button" variant="contained" color="error" sx={{ margin: "0 0.25rem" }} onClick={() => excluir(categoria)}>
                                            Excluir
                                        </Button>
                                    </Link>
                                </td>
                                <td>
                                    {/* Botão SUBCATEGORIA */}
                                    <Link to={`/admin/categoria/${categoria.id}`} style={{ textDecoration: 'none' }}>
                                        <Button type="button" variant="outlined" color="error" sx={{ margin: "0 0.25rem" }}>
                                            SubCategoria
                                        </Button>
                                    </Link>

                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </section>
    )
}

export default ListaCatAdmin