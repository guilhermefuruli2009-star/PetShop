import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../api";
import "../components/textarea.css";

const FormPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [metadescription, setMetadescription] = useState("");
    const [body, setBody] = useState("");
    const [categoria, setCategoria] = useState("");

    const [categorias, setCategorias] = useState([]);

    const [subcategoria, setSubcategoria] = useState('');

    // Busca as categorias para o Select
    useEffect(() => {
        api.get("categorias/")
            .then((resposta) => setCategorias(resposta.data));
    }, []);

    // Efeito para buscar dados do post (se estiver em modo Edição)
    useEffect(() => {
        if (id) {
            // Otimizado para uma única chamada de API
            api.get(`posts/${id}/`)
                .then((resposta) => {
                    setTitle(resposta.data.title);
                    setMetadescription(resposta.data.metadescription);
                    setBody(resposta.data.body);
                    setCategoria(resposta.data.categoria);
                });
        }
    }, [id]); // Depende do ID 

    // Função de Submit (PUT ou POST)
    const CadPost = (evento) => {
        evento.preventDefault();

        if (id) {
            api
                .put(`/posts/${id}`, {
                    title: title,
                    metadescription: metadescription,
                    body: body,
                    categoria: categoria,
                    subcategoria: subcategoria,
                })
                .then(() => {
                    alert('Sucesso na atualização!');
                    navigate('/admin/posts', { replace: true });
                });
        } else {
            api
                .post(`/posts`, {
                    title: title,
                    metadescription: metadescription,
                    body: body,
                    categoria: categoria,
                    subcategoria: subcategoria,
                })
                .then(() => {
                    alert('Cadastro realizado com Sucesso!');
                    navigate('/admin/posts/', { replace: true });
                });
        }
    };

    //Lista de Subcategorias
    const categoriaSelecionada = categorias.find((cat) => cat.id === categoria);
    const subcategoriasDisponiveis = categoriaSelecionada
        ? categoriaSelecionada.subcategorias
        : [];

    return (
        <>
            <main className="container flex flex--centro">
                <article className="cartao post">
                    <h2 className="titulo-pagina">Formulário de Posts</h2>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            flexGrow: 1,
                        }}
                    >
                        <Box sx={{ width: "100%" }}>
                            <form onSubmit={CadPost}>
                                <TextField
                                    value={title}
                                    onChange={(evento) => setTitle(evento.target.value)}
                                    label="Título"
                                    variant="filled"
                                    fullWidth
                                    required
                                    margin="dense"
                                />
                                <TextField
                                    value={metadescription}
                                    onChange={(evento) => setMetadescription(evento.target.value)}
                                    label="Subtítulo"
                                    variant="filled"
                                    fullWidth
                                    required
                                    margin="dense"
                                />
                                <br />
                                <br />
                                <label className="" for="descricao">
                                    Descrição
                                </label>
                                <br />
                                <textarea
                                    className="textarea filled"
                                    name="descricao"
                                    id="descricao"
                                    placeholder="Descrição"
                                    rows="4"
                                    value={body}
                                    onChange={(evento) => setBody(evento.target.value)}
                                ></textarea>
                                <FormControl margin="dense" fullWidth>
                                    <InputLabel id="select-categoria">Categoria</InputLabel>
                                    <Select
                                        labelId="select-categoria"
                                        value={categoria}
                                        onChange={(evento) => setCategoria(evento.target.value)}
                                    >
                                        {categorias.map((categoria) => (
                                            <MenuItem key={categoria.id} value={categoria.id}>
                                                {categoria.nome}
                                            </MenuItem>
                                        ))}
                                    </Select>{" "}
                                </FormControl>
                                {categoria && (
                                    <FormControl margin="dense" fullWidth>
                                        <InputLabel id="select-subcategoria">Subcategoria</InputLabel>
                                        <Select
                                            labelId="select-subcategoria"
                                            value={subcategoria || ''}
                                            onChange={(e) => setSubcategoria(e.target.value)}
                                        >
                                            {subcategoriasDisponiveis.map((sub) => (
                                                <MenuItem key={sub} value={sub}>
                                                    {sub}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                                <br />

                                <Button
                                    sx={{ marginTop: 1 }}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                >
                                    Salvar
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </article>
            </main>
        </>
    );
};

export default FormPost;