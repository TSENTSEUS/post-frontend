import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import { useState } from 'react';
import { useCreatePostMutation } from '../api/postApi';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    title: '',
    content: '',
    username: '',
  });
  const [createPost] = useCreatePostMutation();
  const createPostHandler = (e: any) => {
    e.preventDefault();
    createPost({
      title: fields.title,
      content: fields.content,
      username: fields.username,
    });
    navigate('/');
  };
  return (
    <Form className={'m-4'}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter post title"
          value={fields.title}
          onChange={(e) => setFields({ ...fields, title: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Content</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter post content"
          value={fields.content}
          onChange={(e) => setFields({ ...fields, content: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={fields.username}
          onChange={(e) => setFields({ ...fields, username: e.target.value })}
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={createPostHandler}>
        Create post
      </Button>
    </Form>
  );
};

export default CreatePost;
