import { Typography } from "@mui/material";
import React from "react";

function About() {
  return (
    <div className="px-5 max-w-[1000px] m-auto swing-bottom-right-bck ">
      <Typography variant="h2" sx={{ mb: 4 }} className="text-amber-200">
        About
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }} className="text-sky-200">
        <ul
          className="
        list-disc flex flex-col gap-4 pl-5"
        >
          <li>
            This is a demo app built using{" "}
            <b className="text-yellow-600">
              {" "}
              React, Redux-Toolkit, TailwindCSS, Material-UI and Supabase{" "}
            </b>
            .
          </li>
          <li>
            It is a simple Todo app that allows you to{" "}
            <b className="text-yellow-600"> create, update, and delete </b>{" "}
            todos.
          </li>
          {/* tell about like its a PWA and can be install on any device*/}
          <li>
            It is a{" "}
            <b className="text-yellow-600">
              {" "}
              <span role="img" aria-label="fire">
                🔥
              </span>
              Progressive Web App (PWA){" "}
            </b>{" "}
            and can be installed on any device.
          </li>
          <li>
            You can also make your todos{" "}
            <b className="text-yellow-600"> public or private</b> . Public todos
            are visible to everyone, while private todos are only visible to
            you.
          </li>
          <li>
            You can also <b className="text-yellow-600">react</b> to todos with
            emojis.
          </li>
          <li>
            This app is made by{" "}
            <a
              className="text-sky-500 hover:text-sky-200 underline"
              href="
                https://murtazajoo.github.io/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Murtaza Joo
            </a>
          </li>
        </ul>
      </Typography>

      <Typography variant="h5" sx={{ mb: 1 }} className="text-amber-200">
        How to use ?
      </Typography>
      <Typography variant="body-2" sx={{ mb: 4 }} className="text-sky-200">
        <ul
          className="
        list-decimal list-inside pl-10 text-md"
        >
          <li>You can sign in with your Github account.</li>
          <li>You can create, update, and delete todos.</li>
          <li>You can make your todos public or private.</li>
          <li>You can react to todos with emojis👍</li>
          <li>You can explore public todos made public by others.]\</li>
        </ul>
      </Typography>
    </div>
  );
}

export default About;
