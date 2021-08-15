import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

export function addPublishApi(mensaje) {
  const url = `${API_HOST}/tweet`;
  const data = {
    mensaje,
  };

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: JSON.stringify(data),
  };
  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return { code: response.status, mensaje: "Publicacion enviada" };
      }
      return { code: 500, mensaje: "Error del servidor" };
    })
    .catch((err) => {
      return err;
    });
}

export function getUserPublishApi(idUser, page) {
  const url = `${API_HOST}/leotweets?id=${idUser}&pagina=${page}`;
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
}

export function getPublishFollowersApi(page = 1) {
  const url = `${API_HOST}/leotweetsseguidores?pagina=${page}`;

  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
}
