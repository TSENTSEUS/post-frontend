import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../api/postApi';
import Container from 'react-bootstrap/Container';
import CommentSection from './CommentSection';
import PostHeading from './PostHeading';

const PostDetails = () => {
  const { id } = useParams();
  const { data: post } = useGetPostByIdQuery(id);

  return (
    <Container
      fluid="md"
      className="d-flex flex-column border border-primary mt-4"
    >
      <PostHeading
        id={Number(post?.id)}
        title={post?.title}
        content={post?.content}
      />
      <CommentSection id={Number(post?.id)} comments={post?.comments} />
    </Container>
  );
};

export default PostDetails;
