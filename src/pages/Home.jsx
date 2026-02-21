import '../assets/css/components/cartao.css'
import ListaPost from "../components/listaPost.jsx"
import ListaCategorias from '../components/listaCategorias.jsx'

const Home = () => { // Função Anônima de Seta
    return(
        <main>
            <div className="container">
                <h2 className="titulo-pagina">Pet notícias</h2>
            </div>
            <ListaCategorias />
            <ListaPost url={'/posts'} />
        </main>
    )
} 

export default Home