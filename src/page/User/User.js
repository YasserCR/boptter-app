import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Toast, { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import BasicLayout from "../../layout/BasicLayout";
import BannerAvatar from "../../components/User/BannerAvatar";
import InfoUser from "../../components/User/InfoUser";
import ListPublish from "../../components/ListPublish";
import { getUserApi } from "../../api/user";
import { getUserPublishApi } from "../../api/public";

import "./User.scss";

function User(props) {
  const { match, setRefreshCheckLogin } = props;
  const [user, setUser] = useState(null);
  const [publish, setPublish] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingPublish, setLoadingPublish] = useState(false);
  const { params } = match;
  const loggedUser = useAuth();

  useEffect(() => {
    getUserApi(params.id)
      .then((response) => {
        if (!response)
          toast.error("El usuario que intentas visualizar no existe.");
        setUser(response);
      })
      .catch(() => {
        toast.error("El usuario que intentas visualizar no existe.");
      });
  }, [params]);

  useEffect(() => {
    getUserPublishApi(params.id, 1)
      .then((response) => {
        setPublish(response);
      })
      .catch(() => {
        setPublish([]);
      });
  }, [params]);

  const moreData = () => {
    const pageTemp = page + 1;
    setLoadingPublish(true);

    getUserPublishApi(params.id, pageTemp).then((response) => {
      if (!response) {
        setLoadingPublish(0);
      } else {
        setPublish([...publish, ...response]);
        setPage(pageTemp);
        setLoadingPublish(false);
      }
    });
  };

  return (
    <BasicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="user__title">
        <h2>
          {user ? `${user.nombre} ${user.apellidos}` : "Este usuario no existe"}
        </h2>
      </div>
      <BannerAvatar user={user} loggedUser={loggedUser} />
      <InfoUser user={user} />
      <div className="user__publish">
        <h3>Publicaciones</h3>
        {publish && <ListPublish publish={publish} />}
        <Button onClick={moreData}>
          {!loadingPublish ? (
            loadingPublish !== 0 && "Cargar más"
          ) : (
            <Spinner
              as="span"
              animation="grow"
              sise="sm"
              role="status"
              arian-hidden="true"
            />
          )}
        </Button>
      </div>
    </BasicLayout>
  );
}

export default withRouter(User);
