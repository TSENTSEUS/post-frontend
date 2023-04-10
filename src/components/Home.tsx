import { useGetPostsQuery } from '../api/postApi';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IPost } from '../interface/IPost';
import { Link } from 'react-router-dom';
const Home = () => {
  const { data, isLoading, isError } = useGetPostsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;
  return (
    <Container fluid="md">
      {data?.map((post: IPost, i: number) => {
        return (
          <Link
            to={`/post/${post.id}`}
            style={{ textDecoration: 'none' }}
            key={i}
          >
            <Container className="border border-primary mt-3 p-4">
              <Col>
                <Row>Title: {post.title}</Row>
                <Row>Content: {post.content}</Row>
              </Col>
              <Col>
                <Row>
                  Created At: {new Date(post.created_at).toLocaleString()}
                </Row>
                {post.created_at !== post.updated_at && (
                  <Row>
                    Edited At: {new Date(post.updated_at).toLocaleString()}
                  </Row>
                )}
              </Col>
            </Container>
          </Link>
        );
      })}
    </Container>
  );
};

export default Home;
