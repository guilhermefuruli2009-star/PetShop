import { useParams } from "react-router-dom";
import ListaPost from "../components/listaPost";

const SubCategoria = () => {
    // Capturar o parâmetro :subcategoria da URL
    const { subcategoria} = useParams();

    return(
        // Renderizar a ListaPost com a URL filtrada pela Subcategoria
        < ListaPost url={`/posts?subcategoria=${subcategoria}`} />
    )
}

export default SubCategoria