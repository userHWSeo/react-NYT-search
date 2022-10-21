import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
  gap: 2rem;
  padding: 4px 1rem;
  color: black;
  background-color: #e88738;
`;

const Title = styled.a`
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 80px;
  padding: 0;
  font-size: 18px;
  font-weight: bold;
`;

const Text = styled(Link)`
  margin-right: 80px;
  padding: 3px 11px;
  font-size: 8px;
  text-decoration: none;
  color: white;
  background-color: black;
  &:hover {
    color: orange;
    background-color: #777;
  }
`;

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <Nav>
      <Title>Hi ! HJ</Title>
      {pathname !== "/" ? (
        <Text to="/">Home</Text>
      ) : (
        <Text to="/Clip">CLIP</Text>
      )}
    </Nav>
  );
}
