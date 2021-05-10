import React from "react";
import Link from "@material-ui/core/Link";
import { StylesProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect, useRef } from "react";
import "./ShopStyles.css";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import FormHelperText from "@material-ui/core/FormHelperText";
import BasketIcon from "@material-ui/icons/ShoppingCart";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Basket from "./Basket";
import ShoppingItem from "./ShoppingItem";
import CategoryItem from "./categories/CategoryItem";
import { storage } from "../..";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { db } from "../..";
import { ContactsOutlined } from "@material-ui/icons";
import formHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
//  states for  categories for pacients

// state for sub category set

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "30px",
  },

  basketIcon: {
    color: "red",
    position: "fixed",
    bottom: "5%",
    right: "2%",
    fontSize: "50px",
    cursor: "pointer",
  },

  typography: {
    // marginTop: "60px",
  },

  searchForm: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    maxHeight: "100px",
    marginTop: "30px",
  },

  textField: {
    width: "30%",
  },

  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  option: {
    padding: "4px",
  },
}));

function ShopHome() {
  const [spacing, setSpacing] = React.useState(5);
  const classes = useStyles();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubCategory, setCurrentSubCategory] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [allShoppingItems, setAllShoppingItems] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [categoriesData, setCategoriesData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [temporaryBasket, setTemporaryBasket] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchPainting, setSearchPainting] = useState([]);
  const [basket, setBasket] = useState({});
  const [basketOpen, setBasketOpen] = useState(false);

  const isSearchCld = useRef({
    i: false,
  });
  const [filter, setFilter] = useState({
    age: "",
    name: "hai",
  });

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   setState({
  //     ...state,
  //     [name]: event.target.value,
  //   });
  // };
  const dispatch = useDispatch();
  useEffect(() => {
    // adding data from firestore instead of empty arrays
    

    // get all catgeroies data from firestore
    const categories = db
      .collection("categories")
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push(doc.data());
        });
        setAllCategories(data);
      });
    // get all subCategories data from firestore`
    const subCategories = db
      .collection("subCategories")
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push(doc.data());
        });

        setAllSubCategories(data);
      });
    // get all shopping items data from firestore
    const shoppingItems = db
      .collection("shopItems")
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push(doc.data());
        });
        setAllShoppingItems(data);
      });
  }, []);

  const handleClick = (event, id, groupId) => {
    switch (groupId) {
      case "0": {
       
        setCurrentCategory(id);
        break;
      }

      case "1": {
        setCurrentSubCategory(id);
        setIsSearchClicked(false);
      }

      // case "2" : {
      //   setcu
      // }
    }
  };

  const handleSearchClick = (e) => {
    const arr = [];
    const splittedSearchValue = searchValue.toLowerCase().split(" ");
    splittedSearchValue.forEach((value) => {
      allShoppingItems.forEach((item) =>
        item.tags.includes(value) ? arr.push(item) : null
      );
    });
    // const set(...result)

    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i].title === arr[j].title) {
          arr[i].searchPriority++;
        }
      }
    }
    setIsSearchClicked(true);
    // isSearchCld.current.i = true;
    setSearchResult(
      Array.from(new Set(arr))
        .slice()
        .sort((a, b) => b.searchPriority - a.searchPriority)
    );
    arr.forEach((item) => (item.searchPriority = 0));
  };

  const handleFilterChange = (e) => {
    switch (e.target.value) {
      case "priceAcc": {

        setAllShoppingItems(
          allShoppingItems
            .slice()
            .sort((a, b) => Number.parseInt(a.price) - Number.parseInt(b.price))
        );
        setSearchResult(
          searchResult
            .slice()
            .sort((a, b) => Number.parseInt(a.price) - Number.parseInt(b.price))
        );
        break;
      }

      case "priceDescending": {
        setSearchResult(
          searchResult
            .slice()
            .sort((a, b) => Number.parseInt(b.price) - Number.parseInt(a.price))
        );

        setAllShoppingItems(
          allShoppingItems
            .slice()
            .sort((a, b) => Number.parseInt(b.price) - Number.parseInt(a.price))
        );
        break;
      }

      case "popularityAcc": {
        setSearchResult(
          searchResult
            .slice()
            .sort(
              (a, b) =>
                Number.parseInt(a.popularity) - Number.parseInt(b.popularity)
            )
        );

        setAllShoppingItems(
          allShoppingItems
            .slice()
            .sort(
              (a, b) =>
                Number.parseInt(a.popularity) - Number.parseInt(b.popularity)
            )
        );
        break;
      }

      case "popularityDescending": {
        setSearchResult(
          searchResult
            .slice()
            .sort(
              (a, b) =>
                Number.parseInt(b.popularity) - Number.parseInt(a.popularity)
            )
        );
        setAllShoppingItems(
          allShoppingItems
            .slice()
            .sort(
              (a, b) =>
                Number.parseInt(b.popularity) - Number.parseInt(a.popularity)
            )
        );
        break;
      }
    }
  };

  const handleItemAddRemove = (
    e,
    name,
    itemId,
    itemImageUrl,
    itemTitle,
    itemPrice,
    quantity
  ) => {
    switch (name) {
      case "increment": {
        setTemporaryBasket((oldState) => ({
          ...oldState,
          [itemId]: {
            ...oldState[itemId],
            price: itemPrice,
            imageUrl: itemImageUrl,
            title: itemTitle,
            quantity: oldState[itemId] ? oldState[itemId].quantity + 1 : 1,
          },
        }));
        break;
      }
      // oldState[itemId] === undefined ? 1 : oldState[itemId] + 1
      case "decrement": {
        setTemporaryBasket((oldState) => ({
          ...oldState,
          [itemId]: {
            ...oldState[itemId],
            price: itemPrice,
            imageUrl: itemImageUrl,
            title: itemTitle,
            quantity: oldState[itemId]
              ? oldState[itemId].quantity === 0
                ? 0
                : oldState[itemId].quantity - 1
              : 1,
          },
        }));
        break;
      }
    }
  };

  const handleAddToBasket = (e, id) => {
    setBasket((oldState) => ({
      ...oldState,
      [id]: temporaryBasket[id],
    }));
  };

  const handleBasketDialogOpen = () => {
    setBasketOpen(true);
  };
  const handleBasketDialogClose = () => {
    setBasketOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

 

  const a = () => {
    if (isSearchClicked) {
      
      // setIsSearchClicked(false);
      // isSearchCld.current.i = false;
      return searchResult.map((shoppingItem) => {
        return (
          <ShoppingItem
            id={shoppingItem.id}
            title={shoppingItem.title}
            price={shoppingItem.price}
            imageUrl={shoppingItem.imageUrl}
            date={shoppingItem.date}
            popularity={shoppingItem.popularity}
            quantity={
              temporaryBasket[shoppingItem.id] === undefined
                ? 0
                : temporaryBasket[shoppingItem.id].quantity
            }
            handleItemAddRemove={handleItemAddRemove}
            handleAddToBasket={handleAddToBasket}
            onClick={(event) =>
              handleClick(event, shoppingItem.id, shoppingItem.groupId)
            }
          />
        );
      });
      // setIsSearchClicked(false);
    } else {
      return allShoppingItems
        .filter(
          (shoppingItem) => shoppingItem.subCategoryId === currentSubCategory
        )
        .map((shoppingItem) => {
          return (
            <ShoppingItem
              id={shoppingItem.id}
              title={shoppingItem.title}
              price={shoppingItem.price}
              imageUrl={shoppingItem.imageUrl}
              date={shoppingItem.date}
              quantity={
                temporaryBasket[shoppingItem.id] === undefined
                  ? 0
                  : temporaryBasket[shoppingItem.id].quantity
              }
              handleSearchClick={handleAddToBasket}
              popularity={shoppingItem.popularity}
              handleItemAddRemove={handleItemAddRemove}
              handleAddToBasket={(e) => handleAddToBasket(e)}
              onClick={(event) =>
                handleClick(event, shoppingItem.id, shoppingItem.groupId)
              }
            />
          );
        });
    }
  };
  return (
    <StylesProvider>
      <Container fixed>
        <div className="categories">
          <Link onClick={handleBasketDialogOpen}>
            <BasketIcon className={classes.basketIcon} />
          </Link>
          <Basket
            allShoppingItems={allShoppingItems}
            basket={temporaryBasket}
            basketOpen={basketOpen}
            handleItemAddRemove={handleItemAddRemove}
            handleBasketDialogOpen={handleBasketDialogOpen}
            handleBasketDialogClose={handleBasketDialogClose}
          />
          <form action="" className={classes.searchForm}>
            <TextField
              label="Search"
              align="center"
              className={classes.textField}
              onChange={handleSearchChange}
            ></TextField>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSearchClick}
            >
              <SearchIcon />
            </Button>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-helper">Filter</InputLabel>
              <NativeSelect
                // value={state.age}
                onChange={handleFilterChange}
                inputProps={{
                  name: "age",
                  id: "age-native-helper",
                }}
              >
                <option aria-label="None" value="" />
                <option value={"priceAcc"} className={classes.option}>
                  By Price accending
                </option>
                <option value={"priceDescending"} className={classes.option}>
                  By Price descending
                </option>
                <option value={"popularityAcc"} className={classes.option}>
                  By Popularity accending
                </option>
                <option
                  value={"popularityDescending"}
                  className={classes.option}
                >
                  By Popularity descending
                </option>
              </NativeSelect>
            </FormControl>
          </form>

          <Typography
            className={classes.typography}
            variant="h6"
            align="center"
          >
            <br />
          </Typography>
          <Grid
            container
            justify="center"
            spacing={spacing}
            className={classes.container}
          >
            {/* painting categories */}
            {allCategories.map((category) => {
              return (
                <CategoryItem
                  xs
                  id={category.id}
                  title={category.title}
                  handleClick={(event) =>
                    handleClick(event, category.id, category.groupId)
                  }
                />
              );
            })}
          </Grid>

          <Grid
            container
            justify="center"
            spacing={spacing}
            className={classes.container}
          >
            {/* filtering categories and painting */}
            {allSubCategories
              .filter(
                (subCategory) => subCategory.categoryId === currentCategory
              )
              .map((subCategory) => {
                return (
                  <CategoryItem
                    id={subCategory.id}
                    title={subCategory.title}
                    handleClick={(event) =>
                      handleClick(event, subCategory.id, subCategory.groupId)
                    }
                  />
                );
              })}
          </Grid>

          <Grid
            container
            justify="center"
            spacing={spacing}
            className={classes.container}
          >
            {a()}
            {/* filtering categories and painting */}
            {/* { (isSearchClicked)  ?  searchResult.map(shoppingItem => {
            return (<ShoppingItem
            id={shoppingItem.id}
            title={shoppingItem.title}
            price={shoppingItem.price}
            imageUrl={shoppingItem.imageUrl}
            date={shoppingItem.date}
            popularity={shoppingItem.popularity}
            onClick={(event) =>
              handleClick(event, shoppingItem.id, shoppingItem.groupId)
            }
          />)
          }) :  allShoppingItems
            .filter(
              (shoppingItem) =>
                shoppingItem.subCategoryId === currentSubCategory
            )
            .map((shoppingItem) => {
              return (
                <ShoppingItem
                  id={shoppingItem.id}
                  title={shoppingItem.title}
                  price={shoppingItem.price}
                  imageUrl={shoppingItem.imageUrl}
                  date={shoppingItem.date}
                  popularity={shoppingItem.popularity}
                  onClick={(event) =>
                    handleClick(event, shoppingItem.id, shoppingItem.groupId)
                  }
                />
              );
            })} */}
          </Grid>
        </div>
      </Container>
    </StylesProvider>
  );
}

export default ShopHome;
