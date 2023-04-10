import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FC, useEffect, useState } from 'react';
import {
  useDeletePostByIdMutation,
  useUpdatePostByIdMutation,
} from '../../api/postApi';
import { useNavigate } from 'react-router-dom';
interface HeadingProps {
  id: number;
  title: string;
  content: string;
}
const PostHeading: FC<HeadingProps> = ({ id, title, content }) => {
  const [editMode, setEdiMode] = useState(false);
  const [deletePost] = useDeletePostByIdMutation();
  const [fields, setFields] = useState({
    title: '',
    content: '',
  });
  const [updatePost] = useUpdatePostByIdMutation();
  const navigate = useNavigate();
  const editHandler = () => {
    setEdiMode((prev) => !prev);
  };
  const updatePostHandler = () => {
    updatePost({ id: id, title: fields.title, content: fields.content });
    editHandler();
  };

  const deletePostHandler = () => {
    deletePost(id);
    navigate('/');
  };

  useEffect(() => {
    setFields({ ...fields, title, content });
  }, [content]);
  return (
    <>
      <Row className="justify-content-between pt-3">
        <Col xs={8} md={8} className="pe-0">
          Title:
          {editMode ? (
            <input
              value={fields.title}
              onChange={(e) => setFields({ ...fields, title: e.target.value })}
            />
          ) : (
            <> {title} </>
          )}
        </Col>
        <Col xs={3} md={4} className="text-end">
          {editMode ? (
            <Row className="justify-content-end">
              <Col md={2}>
                <Button variant="danger" size="sm" onClick={editHandler}>
                  Cancel
                </Button>
              </Col>
              <Col md={2}>
                <Button variant="success" size="sm" onClick={updatePostHandler}>
                  Save
                </Button>
              </Col>
            </Row>
          ) : (
            <>
              <Button
                variant="danger"
                size="sm"
                className="me-2"
                onClick={deletePostHandler}
              >
                Delete Post
              </Button>
              <Button variant="warning" size="sm" onClick={editHandler}>
                Edit
              </Button>
            </>
          )}
        </Col>
      </Row>
      <Col>
        Content:
        {editMode ? (
          <>
            <input
              value={fields.content}
              onChange={(e) =>
                setFields({ ...fields, content: e.target.value })
              }
            />
          </>
        ) : (
          <> {content} </>
        )}
      </Col>
    </>
  );
};

export default PostHeading;
