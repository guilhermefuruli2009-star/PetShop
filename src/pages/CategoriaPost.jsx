import { useParams } from "react-router-dom";
import ListaPost from "../components/listaPost";

const CategoriaPosts = () => {
    // Capturar o parâmetro :id da URL (que vem da rota pai)
    const { id } = useParams();

    return (
        // Renderizar a ListaPost com a URL filtrada pela categoria
        < ListaPost url={`/posts?categorias=${id}`} />
    )
}

export default CategoriaPosts