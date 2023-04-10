import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { IComment } from '../../interface/IComment';
import { FC, useState } from 'react';
import { useAddCommentMutation } from '../../api/postApi';
interface Comment {
  id: number;
  comments: IComment[];
}
const CommentSection: FC<Comment> = ({ id, comments }) => {
  const [comment, setComment] = useState('');
  const [addComment] = useAddCommentMutation();
  const addNewComment = async () => {
    comment !== '' && (await addComment({ id, content: comment }));
  };
  return (
    <>
      <Col>
        Add comment:
        <InputGroup className="mb-3">
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </InputGroup>
        <Button variant="primary" onClick={addNewComment}>
          Add Comment
        </Button>
      </Col>
      Comments:
      {comments?.map((comment: IComment, i: number) => {
        return (
          <div key={i}>
            Username: {comment.user.name}
            <div>Comment: {comment.content}</div>
          </div>
        );
      })}
    </>
  );
};

export default CommentSection;
