import { useDispatch, useSelector } from "react-redux";
import { deleteClipNews } from "../slice/clipSlice";
import Navbar from "../components/navBar";
import styled from "styled-components";

const ItemWrapTop = styled.a`
  text-align: center;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  font-size: 10px;
  font-weight: 600;
  color: #2f2f2f;
`;
const ItemWrapDate = styled.span`
  text-align: center;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  font-size: 10px;
`;
const ClipBtn = styled.button`
  padding: 3px;
  border: 1px solid white;
  background-color: black;
  font-size: 3px;
  color: white;
`;
const DatailBtn = styled.button`
  padding: 3px;
  border: 1px solid white;
  background-color: black;
  font-size: 3px;
  color: white;
`;
const ItemWrap = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  margin-bottom: 100px;
`;
const ItemWraps = styled.div`
  width: 400px;
  height: 100%;
  display: flex;
  margin: 10px auto;
`;

function Clip() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.clip);
  return (
    <>
      <Navbar />
      <ItemWrap>
        {list.map((el) => {
          const data = {
            id: el.id,
            title: el.title,
            date: el.date,
            url: el.url,
          };
          return (
            <ItemWraps key={data.id}>
              <ItemWrapTop>{data.title}</ItemWrapTop>
              <br />
              <ItemWrapDate>{data.date}</ItemWrapDate>
              <br />
              <a className="ItemWrap-Body2" href={data.url}>
                <DatailBtn>Detail</DatailBtn>
              </a>
              <ClipBtn
                onClick={() => {
                  dispatch(deleteClipNews(data));
                }}
              >
                Unclip
              </ClipBtn>
            </ItemWraps>
          );
        })}
      </ItemWrap>
    </>
  );
}

export default Clip;
