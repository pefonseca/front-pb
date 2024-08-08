import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Cadastro from './Cadastro';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);

  const commentRef = useRef(null); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (commentRef.current && !commentRef.current.contains(event.target)) {
        setSelectedPostId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleAddPost = () => {
    if (newPost.trim()) {
      const newPostData = {
        id: posts.length + 1,
        content: newPost,
        user: {
          name: 'Pedro',
          profilePic: 'https://via.placeholder.com/50',
        },
        comments: []
      };
      setPosts([...posts, newPostData]);
      setNewPost('');
    }
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleDeleteComment = (postId, commentId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.filter(comment => comment.id !== commentId)
        };
      }
      return post;
    }));
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = (postId) => {
    if (newComment.trim()) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, { id: post.comments.length + 1, content: newComment, user: 'Pedro' }]
          };
        }
        return post;
      }));
      setNewComment('');
    }
  };

  const handleShowComments = (postId) => {
    setSelectedPostId(postId);
  };

  const handleCommentKeyDown = (e, postId) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddComment(postId);
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Blog Laranja</h1>
          <div className="Auth-buttons">
            <Link to="/login"><button className="Login-button">Login</button></Link>
            <Link to="/cadastro"><button className="Signup-button">Cadastrar</button></Link>
          </div>
        </header>
        <div className="App-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/" element={
              <div>
                <div className="New-post">
                  <textarea
                    value={newPost}
                    onChange={handlePostChange}
                    placeholder="Escreva sua postagem aqui..."
                  ></textarea>
                  <button onClick={handleAddPost} className="Add-post-button">Adicionar Postagem</button>
                </div>
                <ul className="Post-list">
                  {posts.map((post) => (
                    <li key={post.id} className="Post-item">
                      <img src={post.user.profilePic} alt={post.user.name} className="Profile-pic" />
                      <div className="Post-content">
                        <h3>{post.user.name}</h3>
                        <p>{post.content}</p>
                        <button onClick={() => handleDeletePost(post.id)} className="Trash-button">
                          <img src="/lixeira.png" alt="Excluir" />
                        </button>
                        {/* Ajustar botão de comentário. */}
                        <button onClick={() => handleShowComments(post.id)} className="Comment-button">
                          <img src="/comment.png" alt="Comentar"></img>
                        </button>                  
                        <button onClick={() => handleShowComments(post.id)} className="Like-button">
                          <img src="/rocket.png" alt="Foguete"></img>
                        </button>
                        {selectedPostId === post.id && (
                          <div className="Comments-section" ref={commentRef}>
                            <div className="Comment-input-wrapper">
                              <input
                                type="text"
                                value={newComment}
                                onChange={handleCommentChange}
                                onKeyDown={(e) => handleCommentKeyDown(e, post.id)}
                                placeholder="Escreva um comentário..."
                              />
                              <span
                                className="Comment-icon"
                                onClick={() => handleAddComment(post.id)}
                                role="button"
                                aria-label="Adicionar comentário"
                              >
                                <img src="/enviar-mensagem.png" alt="Enviar" />
                              </span>
                            </div>
                            <ul className="Comments-list">
                              {post.comments.map(comment => (
                                <li key={comment.id} className="Comment-item">
                                  <strong>{comment.user}:</strong> {comment.content}
                                  <button onClick={() => handleDeleteComment(post.id, comment.id)} className="Trash-button">
                                    <img src="/lixeira.png" alt="Excluir" />
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
