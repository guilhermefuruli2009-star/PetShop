import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { busca } from '../api'

const Post = () => {
    const {id} = useParams()
    const [post, setPost] = useState({})

    const navegar = useNavigate();

    useEffect(() => {
        busca(`/posts/${id}`, setPost)
        .catch(() => {
            // Se a busca falhar, navega para a rota de erro
            // o 'useNavigate' que faz o direcionamento
            navegar('/erro404')
        })
    }, [id]) //Atualiza quando o 'id' na URL muda

    return (
        <main className="container flex flex--centro">
            <article className="cartao post">
                <h2 className="cartao__titulo">{post.title}</h2>
                <h3 className="cartao-post__meta">{post.metadescription}</h3>
                <br />
                <p className="carta__texto">{post.body}</p>
            </article>
        </main>
    )
}

export default Post