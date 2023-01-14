import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Textarea,
  FormLabel,
  Select,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import DisplayTranslate from "./DisplayTranslate";
import { useCallback } from "react";

const InpTranslate = () => {
  let [value, setValue] = useState({
    q: "",
    target: "",
    source: "",
    translated: "",
    from: "",
  });

  const [languages, setLanguages] = useState(null);

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    detectAndTranslate(value.q, value.target, value.from);
    // console.log("After stored", value);
  };

  const getLanguages = useCallback(() => {
    const options = {
      method: "GET",
      url: "https://long-translator.p.rapidapi.com/languages",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_X_ACCESS_KEY,
        "X-RapidAPI-Host": "long-translator.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log("Languages received", response.data);
        setLanguages(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [setLanguages]);

  useEffect(() => {
    getLanguages();
  }, [getLanguages]);

  // console.log("Received ", languages && languages.data);

  const detectAndTranslate = (query, target, from) => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", `${from}`);
    encodedParams.append("target_language", `${target}`);
    encodedParams.append("text", `${query}`);

    // console.log("on translatate", from);

    const options = {
      method: "POST",
      url: "https://long-translator.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": process.env.REACT_APP_X_ACCESS_KEY,
        "X-RapidAPI-Host": "long-translator.p.rapidapi.com",
      },
      data: encodedParams,
    };
    let src = "source";
    let trans = "translated";
    axios
      .request(options)
      .then(function (response) {
        // console.log("Deteceted and Translated", response.data);

        if (from === "auto") {
          // console.log("Language auto");
          setValue({
            ...value,
            [trans]: response.data.data.translatedText,
            [src]: response.data.data.detectedSourceLanguage.name,
          });
        } else if (from !== "auto") {
          // console.log("Language from", from);
          let result = languages.data.languages.filter((obj) => {
            if (obj.code === from) {
              return obj.name;
            }
            return false;
          });
          // console.log(result);
          setValue({
            ...value,
            [trans]: response.data.data.translatedText,
            [src]: result[0].name,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div>
      <Text fontWeight="extrabold">Translator</Text>
      <form onSubmit={onSubmitHandler}>
        <FormLabel>Select From Languages</FormLabel>
        <Select
          placeholder="From"
          name="from"
          value={value.from}
          onChange={handleChange}
          required
        >
          <option value="auto">Auto</option>
          <option value="en">English</option>
          <option value="ta">Tamil</option>
          {languages &&
            languages.data.languages.map((e, i) => (
              <option value={e.code} key={i}>
                {e.name}
              </option>
            ))}
        </Select>
        <br />
        <FormLabel>Enter Text to Translate</FormLabel>
        <Textarea
          w="100%"
          placeholder="Enter the details to Translate"
          id="q"
          name="q"
          value={value.q}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <FormLabel>Select Languages to Translate</FormLabel>
        <Select
          placeholder="To"
          name="target"
          value={value.target}
          onChange={handleChange}
          required
        >
          <option value="en">English(default)</option>
          <option value="ta">Tamil</option>
          {languages &&
            languages.data.languages.map((e, i) => (
              <option value={e.code} key={i}>
                {e.name}
              </option>
            ))}
        </Select>
        <br />
        <Button type="submit" colorScheme="telegram" variant="solid">
          Translate
        </Button>
      </form>
      <br />
      <hr />
      {value.translated && (
        <Box flex="1" boxShadow="dark-lg" p="6" rounded="md">
          <DisplayTranslate data={value} />
        </Box>
      )}
    </div>
  );
};

export default InpTranslate;
