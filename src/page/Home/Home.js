import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import BasicLayout from "../../layout/BasicLayout";
import ListPublish from "../../components/ListPublish";
import { getPublishFollowersApi } from "../../api/public";

import "./Home.scss";

export default function Home(props) {
  const { setRefreshCheckLogin } = props;
  const [publish, setPublish] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingPublish, setLoadingPublish] = useState(false);

  useEffect(() => {
    getPublishFollowersApi(page)
      .then((response) => {
        if (!publish && response) {
          setPublish(formatModel(response));
        } else {
          if (!response) {
            setLoadingPublish(0);
          } else {
            const data = formatModel(response);
            setPublish([...publish, ...data]);
            setLoadingPublish(false);
          }
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const moreData = () => {
    setLoadingPublish(true);
    setPage(page + 1);
  };

  return (
    <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="home__title">
        <h2>Inicio</h2>
      </div>
      {publish && <ListPublish publish={publish} />}
      <Button onClick={moreData} className="load-more">
        {!loadingPublish ? (
          loadingPublish !== 0 ? (
            "Cargar más publicaciones"
          ) : (
            "No hay más publicaciones"
          )
        ) : (
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
      </Button>
    </BasicLayout>
  );
}

function formatModel(publish) {
  const publishTemp = [];

  publish.forEach((tweet) => {
    publishTemp.push({
      _id: tweet._id,
      userId: tweet.userRelationId,
      mensaje: tweet.Tweet.mensaje,
      fecha: tweet.Tweet.fecha,
    });
  });
  console.log(publishTemp);
  return publishTemp;
}
