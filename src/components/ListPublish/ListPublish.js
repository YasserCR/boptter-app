import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { map } from "lodash";
import moment from "moment";
import AvatarNotFound from "../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../utils/constant";
import { getUserApi } from "../../api/user";
import { replaceURLWithHTMLLinks } from "../../utils/functions";

import "./ListPublish.scss";

export default function ListPublish(props) {
  const { publish } = props;
  return (
    <div className="list-publish">
      {map(publish, (publicacion, index) => (
        <Publicacion key={index} publicacion={publicacion} />
      ))}
    </div>
  );
}

function Publicacion(props) {
  const { publicacion } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    getUserApi(publicacion.userId).then((response) => {
      setUserInfo(response);
      setAvatarUrl(
        response?.avatar
          ? `${API_HOST}/obteneravatar?id=${response.id}`
          : AvatarNotFound
      );
    });
  }, [publicacion]);

  return (
    <div className="publish">
      <Image className="avatar" src={avatarUrl} roundedCircle />
      <div>
        <div className="name">
          {userInfo?.nombre} {userInfo?.apellidos}
          <span>{moment(publicacion.fecha).calendar()}</span>
        </div>

        <div
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(publicacion.mensaje),
          }}
        />
      </div>
    </div>
  );
}
