import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addClipNews, deleteClipNews } from "../slice/clipSlice";
import { newsApi } from "../api";
import styled from "styled-components";
import Navbar from "../components/navBar";

const Input = styled.input`
  width: 400px;
  display: flex;
  margin: auto;
  border: none;
  border-bottom: 1px solid grey;
  &:focus {
    outline: none;
  }
`;
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
  font-size: 3px;
  color: white;
  padding: 3px;
  border: 1px solid white;
  background-color: black;
`;
const DatailBtn = styled.button`
  font-size: 3px;
  color: white;
  padding: 3px;
  border: 1px solid white;
  background-color: black;
`;
const ItemWrap = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  margin-bottom: 100px;
`;
const ItemWraps = styled.div`
  width: 400px;
  height: 100%;
  display: flex;
  margin: 10px auto;
`;

const SearchItems = styled.div`
  width: 400px;
  margin: 10px auto;
`;

function Search() {
  const [value, setValue] = useState("");
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(0);
  const [myRef, setMyRef] = useState(null);
  const [searchHistoryArr, setSearchHistoryArr] = useState([]);
  const [onFocusBool, setOnFocusBool] = useState(false);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.clip);

  useEffect(() => {
    if (value) {
      newsApi(value, page).then((res) => {
        const data = res.response.docs;
        setNews(data);
      });
    }
  }, [value]);

  useEffect(() => {
    newsApi(value, page).then((res) => {
      const data = res.response.docs;
      setNews((prev) => [...prev, ...data]);
    });
  }, [page]);

  useEffect(() => {
    if (myRef) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPage((prev) => prev + 1);
            observer.unobserve(myRef);
          }
        },
        { threshold: 1 }
      );
      observer.observe(myRef);
    }
  }, [myRef]);

  useEffect(() => {
    if (searchHistoryArr) {
      if (localStorage.searchHistories === undefined) {
        localStorage.setItem(
          "searchHistories",
          JSON.stringify(searchHistoryArr)
        );

        let searchHistories = localStorage.getItem("searchHistories");
        searchHistories = JSON.parse(searchHistories);
        if (searchHistoryArr.length > 0) {
          for (let i = 0; i < searchHistoryArr.length; i++) {
            searchHistories.push(searchHistoryArr[0]);
            searchHistories = [...new Set(searchHistories)].slice(0, 5);
            localStorage.setItem(
              "searchHistories",
              JSON.stringify(searchHistories)
            );
          }
        }
      }
    }
    if (searchHistoryArr.length === 0 && localStorage.searchHistories) {
      let historyJSONArr = localStorage.getItem("searchHistories");
      historyJSONArr = JSON.parse(historyJSONArr);

      for (let i = 0; i < historyJSONArr.length; i++) {
        searchHistoryArr.push(historyJSONArr[i]);
      }
    }
  }, [searchHistoryArr]);

  // Delay
  const delay = (() => {
    let timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  const searchQueue = (inputValue) => {
    if (inputValue) {
      let copy = [...searchHistoryArr];
      copy.unshift(inputValue);
      localStorage.removeItem("searchHistories");
      if (searchHistoryArr.length > 4) {
        copy.pop();
        localStorage.removeItem("searchHistories");
      }
      setSearchHistoryArr(copy);
    }
  };

  return (
    <>
      <Navbar />
      <Input
        type="text"
        onKeyUp={(e) => {
          delay(() => {
            setValue(e.target.value);
            setPage(0);
            searchQueue(e.target.value);
          }, 500);
        }}
        placeholder="search here..."
        onFocus={() => {
          setOnFocusBool(true);
        }}
        onBlur={() => {
          setOnFocusBool(false);
        }}
      />
      <SearchItems>
        {onFocusBool === true && searchHistoryArr
          ? searchHistoryArr.map((item) => {
              return (
                <div
                  key={item.id}
                  className="search-history"
                  style={{ display: "block" }}
                >
                  {item}
                </div>
              );
            })
          : null}
      </SearchItems>
      <ItemWrap>
        {news.map((el, index) => {
          const data = {
            id: el._id,
            title: el.headline.main,
            date: el.pub_date.slice(0, 10),
            url: el.web_url,
          };
          return (
            <ItemWraps
              key={data.id}
              ref={news.length === index + 1 ? setMyRef : undefined}
            >
              <ItemWrapTop>{data.title}</ItemWrapTop>
              <br />
              <ItemWrapDate>{data.date}</ItemWrapDate>
              <br />
              <a className="ItemWrap-Body2" href={data.url}>
                <DatailBtn>Detail</DatailBtn>
              </a>
              <ClipBtn
                onClick={(e) => {
                  if (e.target.innerText === "Clip") {
                    dispatch(addClipNews(data));
                  } else {
                    dispatch(deleteClipNews(data));
                  }
                }}
              >
                {!list.find((state) => state.id === data.id)
                  ? "Clip"
                  : "Unclip "}
              </ClipBtn>
            </ItemWraps>
          );
        })}
      </ItemWrap>
    </>
  );
}

export default Search;
