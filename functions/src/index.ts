import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { onRequest } from "firebase-functions/v2/https";

initializeApp();

export const verifyIdToken = onRequest(
  { region: "europe-west1" },
  (req, res) => {
    const token = req.body.token as string;
    getAuth()
      .verifyIdToken(token)
      .then(() => {
        res.status(200).send({ valid: true });
      })
      .catch(() => {
        res.status(401).send({ valid: false });
      });
  });
