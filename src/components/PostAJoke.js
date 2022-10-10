import { Typography, Button, FormControl, FormGroup, InputLabel, styled, Grid, Checkbox, FormControlLabel, ButtonGroup, Select, MenuItem, Card, Radio, RadioGroup, TextField, CardContent} from "@mui/material"
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import axios from "axios"





const FormContainer = styled(FormGroup)`
width:80%;
margin: 5% auto;
`

const FormLables = styled(Typography)`
font-weight:bold;
font-size:0.8rem;
`
const PostAJoke = () => {
  const [urlString, setUrlString] = useState("");
  const [category, setCategory] = useState("Any");
  const [customCategoryList, setCustomCategoryList] = useState([]);
  const [language, setLanguage] = useState("en");
  const [blacklist, setBlacklist] = useState({
    nsfw: true,
    religious: true,
    political: true,
    racist: true,
    sexist: true,
    explicit: true,
  });
  const [jokeType, setJokeType] = useState([]);
  const [jokeString, setJokeString] = useState("");
  const [amountOfJokes, setAmountOfJokes] = useState(1);
  const [jokesList, setJokesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");


  const updateUrlString = () => {
    let str = "https://v2.jokeapi.dev/joke"
    if (category === "Any") {
      str = str + "/Any?"
    } else {
      if (customCategoryList.length > 0) {
        str = str + "/" + customCategoryList.toString() + "?"
      } else {
        str = str + "/Any?"
      }
    }
    if (((Object.keys(blacklist)).filter((bl) => blacklist[bl])).length > 0) {
      str = str + "blacklistFlags=" + ((Object.keys(blacklist)).filter((bl) => blacklist[bl])).toString();
    }
    if (language !== "en") {
      str = str + "&lang=" + language;
    }
    if (jokeType.length === 1) {
      str = str + "&type=" + jokeType[0];
    } if (jokeString !== "") {
      str = str + "&contains=" + jokeString;
    } if (amountOfJokes > 0) {
      str = str + "&amount=" + amountOfJokes;
    }
    setUrlString(str);
  }

  useEffect(() => {
    updateUrlString();
    if (jokesList.length > 0) {
      console.log(jokesList)
    } else { console.log(errorMessage) }
  });

  const handleCategory = (e) => {
    if (e.target.value === "Any") {
      setCategory(e.target.value);
    } else {
      setCategory(customCategoryList.toString());
    }
  }
  const handleCustomCategory = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCustomCategoryList([...customCategoryList, value])
      setCategory([...customCategoryList, value].toString());
    } else {
      setCustomCategoryList(customCategoryList.filter((e) => e !== value), () => { })
      setCategory((customCategoryList.filter((e) => e !== value)).toString());
    }

  }
  const handleJokeType = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setJokeType([...jokeType, value])
    } else {
      setJokeType(jokeType.filter((e) => e !== value), () => { })
    }
  }

  const handleSearchString = (e) => {
    setJokeString(e.target.value);

  }

  const handlejokesAmount = (e) => {
    setAmountOfJokes(e.target.value)
  }
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  }

  const handleSubmit = () => {

    if (urlString !== "") {
      axios.get(urlString).then((response) => {
        if (response.status === 200) {
          let res = response["data"];

          if (!res["error"]) {
            setErrorMessage("");
            if ((Object.keys(res)).includes("jokes")) {
              setJokesList(res["jokes"]);
            } else if ((Object.keys(res)).includes("joke") || (Object.keys(res)).includes("setup")) {
              let joke = [];
              joke.push(res);
              setJokesList(joke);
            }
          } else {
            setErrorMessage(res["causedBy"]);
          }

        } else {
          console.log(response);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  const handleResetForm = (e)=>{

    setUrlString("");
  setCategory("Any");
  setLanguage("en");  
  setJokeType([]);
  setJokeString("");
  setAmountOfJokes(1);
  setJokesList([]);
  setErrorMessage("");

  }

  return (
    <>
      <FormContainer>

        <Grid container spacing={2}>
          <Grid item xs={4} md={4}>
            <FormLables align="left">Select Category/Categories :</FormLables>
          </Grid>
          <Grid item xs={8} md={8}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={category}
              name="radio-buttons-group"
              onChange={(e) => handleCategory(e)}
            >

              <FormControlLabel value="Any" control={<Radio />} label="Any" checked={category==="Any"}/>
              <FormControlLabel value="Custom" control={<Radio />} label="Custom" checked={category!=="Any"}/>
              <FormGroup aria-label="position" id="check_box_group" row onChange={(e) => handleCustomCategory(e)}>
                <FormControlLabel
                  value="Programming"
                  control={<Checkbox />}
                  label="Programming"
                  labelPlacement="end"
                  disabled={category === "Any"}
                />

                <FormControlLabel
                  value="Miscellaneous"
                  control={<Checkbox />}
                  label="Misc"
                  labelPlacement="end"
                  disabled={category === "Any"}
                />
                <FormControlLabel
                  value="Dark"
                  control={<Checkbox />}
                  label="Dark"
                  labelPlacement="end"
                  disabled={category === "Any"}
                />
                <FormControlLabel
                  value="Pun"
                  control={<Checkbox />}
                  label="Pun"
                  labelPlacement="end"
                  disabled={category === "Any"}
                />
                <FormControlLabel
                  value="Spooky"
                  control={<Checkbox />}
                  label="Spooky"
                  labelPlacement="end"
                  disabled={category === "Any"}
                />
                <FormControlLabel
                  value="Christmas"
                  control={<Checkbox />}
                  label="Christmas"
                  labelPlacement="end"
                  disabled={category === "Any"}
                />
              </FormGroup>

            </RadioGroup>
          </Grid>
        </Grid>











        <Grid container spacing={2}>
          <Grid item xs={4} md={4}>
            <FormLables align="left">Select Language :</FormLables>
          </Grid>
          <Grid item xs={8} md={8}>
            <FormControl fullWidth>
              <InputLabel id="language-label">Language</InputLabel>
              <Select
                labelId="language-label"
                id="language"
                value={language}
                label="Language"
                size="small"
                onChange={(e) => handleLanguageChange(e)}
              >
                <MenuItem value="cs">cs - Czech</MenuItem>
                <MenuItem value="de">de - German</MenuItem>
                <MenuItem value="en">en - English</MenuItem>
                <MenuItem value="es">es - Spanish</MenuItem>
                <MenuItem value="fr">fr - French</MenuItem>
                <MenuItem value="pt">pt - Portuguese</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>


        <Grid container spacing={2}>
          <Grid item xs={4} md={4}>
            <FormLables align="left">Lables to be blacklisted : </FormLables>
          </Grid>
          <Grid item xs={8} md={8}>
            <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(1)' }}>
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="nsfw"
                  control={<Checkbox />}
                  label="nsfw"
                  labelPlacement="end"
                  disabled
                  checked
                />

                <FormControlLabel
                  value="religious"
                  control={<Checkbox />}
                  label="religious"
                  labelPlacement="end"
                  disabled
                  checked
                />
                <FormControlLabel
                  value="political"
                  control={<Checkbox />}
                  label="political"
                  labelPlacement="end"
                  disabled
                  checked
                />
                <FormControlLabel
                  value="racist"
                  control={<Checkbox />}
                  label="racist"
                  labelPlacement="end"
                  disabled
                  checked
                />
                <FormControlLabel
                  value="sexist"
                  control={<Checkbox />}
                  label="sexist"
                  labelPlacement="end"
                  disabled
                  checked
                />
                <FormControlLabel
                  value="explicit"
                  control={<Checkbox />}
                  label="explicit"
                  labelPlacement="end"
                  disabled
                  checked
                />
              </FormGroup>

            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4} md={4}>
            <FormLables align="left">Joke Type : </FormLables>
          </Grid>
          <Grid item xs={8} md={8}>
            <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(1)' }}>
              <FormGroup aria-label="position" row onChange={(e) => handleJokeType(e)}>
                <FormControlLabel
                  value="single"
                  control={<Checkbox />}
                  label="single"
                  labelPlacement="end"

                />
                <FormControlLabel
                  value="twopart"
                  control={<Checkbox />}
                  label="twopart"
                  labelPlacement="end"

                />

              </FormGroup>

            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4} md={4}>
            <FormLables align="left">Search for a joke that
              contains this search string :</FormLables>
          </Grid>
          <Grid item xs={8} md={8}>
            <FormControl fullWidth>
              <TextField id="outlined-basic" value={jokeString} label="Optional" variant="outlined" onChange={(e) => handleSearchString(e)} size="small" />

            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4} md={4}>
            <FormLables align="left">Amount of Jokes :</FormLables>
          </Grid>
          <Grid item xs={8} md={8}>
            <FormControl fullWidth>
              <TextField id="outlined-basic" value={amountOfJokes} variant="outlined" size="small" type="number" onChange={(e) => handlejokesAmount(e)} inputProps={{ inputMode: 'numeric', pattern: '[1-10]*', min: 1, max: 10 }} />

            </FormControl>
          </Grid>
        </Grid>

      </FormContainer>

      <FormLables>Url Preview : {urlString}</FormLables>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">

        <Button color="secondary" onClick={(e)=>handleResetForm()}>Reset Form</Button>
        <Button color="success" onClick={(e) => handleSubmit()}>Send Request</Button>
      </ButtonGroup>

      {jokesList.length > 0 ?
        <><Typography variant="h3" sx={{ margin: 2 }}>Jokes for the search criteria</Typography>
          <Grid container spacing={2} sx={{ margin: 1 }}>
            {jokesList.map((joke) => {
              return (
                <Grid item xs={6} md={6}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>

                      <Typography sx={{ fontSize: 14 }} gutterBottom>
                        {"Joke Category : " + joke["category"]}
                      </Typography>
                      <Typography variant="h5" component="div">

                      </Typography>


                      <Typography variant="body2">
                        {Object.keys(joke).includes("joke") ?
                          <Typography>{joke["joke"]}</Typography> :
                          <><Typography>{"Statement :" + joke["setup"]}</Typography>
                            <Typography>{"Expression : " + joke["delivery"]}</Typography></>}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )

            })}</Grid></> :
        <Typography>{errorMessage}</Typography>
      }



    </>


  )
}
export default PostAJoke;