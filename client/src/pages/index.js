import * as React from "react";
import Box from "@mui/material/Box";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "./Component/Navbar.js";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const state = {
    button: 1,
  };
  const [code, setCode] = useState("");
  // const [language, setLanguage] = useState("");
  // const handleSubmit = async () => {
  //   setIsLoading(true);
  //   try {
  //     const config = {
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //     };
  //     const dataToBeFed1 = {
  //       code: code,
  //     };
  // axios
  //   .post(
  //     "http://localhost:5000/v1.0/getNodeCode",
  //     dataToBeFed1,
  //   )
  //   .then((response) => {
  //     console.log("Program Entered "), window.location.reload();

  //   })

  //   .catch((error) => {
  //     console.log(dataToBeFed1);
  //     console.error("There was an error!" + error);
  //   });
  //   } catch (error) {
  //     console.log(error);
  //     setCode("");
  //   }
  // };
  const onSubmit = (e) => {
    try {
      const config = {
        headers: {
          "content-type": 'text/plain',
        },
      };

      const dataToBeFed1 = {
        code,
      };
      if (state.button === 1) {
        console.log("Button 1 clicked!");
        axios
          .post("http://localhost:5000/v1.0/getNodeCode", code,config)
          .then((response) => {
            console.log("Program Entered "), window.location.reload();
          })

          .catch((error) => {
            console.log(dataToBeFed1);
            console.error("There was an error!" + error);
          });
      }
      if (state.button === 2) {
        console.log("Button 2 clicked!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.description}>
          {/* <TextField
            id="outlined-multiline-flexible"
            label="Multiline"
            multiline
            sx={{
              width: "600px",
              height: "1244",
            }}
            maxRows={12}
          /> */}
          {/*           
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            > */}
          <form>
            <TextField
              id="outlined-multiline-static"
              label="Enter Code Here..."
              style={{ width: 850 }}
              multiline
              rows={14}
              fullWidth
              onChange={(event) => setCode(event.currentTarget.value)}
            />
            <button
              onClick={() => (state.button = 1)}
              type="submit"
              name="node"
              value="node"
            ></button>
          </form>
          {/* <Button width="full" mt={4} type="submit">
                Submit
              </Button> */}

          {/* </Box> */}
          <form className="App" onSubmit={onSubmit}>
            <button
              onClick={() => (state.button = 1)}
              type="submit"
              name="btn1"
              value="wow"
            >
              Button 1
            </button>
            <button
              onClick={() => (state.button = 2)}
              type="submit"
              name="btn2"
              value="oh no"
            >
              Button 2
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
