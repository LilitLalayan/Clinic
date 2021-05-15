// react imports
import React from "react";
import { useState, useEffect, useRef } from "react";

// components import
import Basket from "./Basket";
import ShoppingItem from "./ShoppingItem";
import CategoryItem from "./categories/CategoryItem";

// material ui imports
import Link from "@material-ui/core/Link";
import { StylesProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import BasketIcon from "@material-ui/icons/ShoppingCart";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import NativeSelect from "@material-ui/core/NativeSelect";
import SearchIcon from "@material-ui/icons/Search";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

// firebase imports
import { db } from "../..";

// css imports
// hint just to ovverride material styles with styleProvider
import "./ShopStyles.css";


//material ui components styling
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

// main component of shop
function ShopHome() {
  // to give spacing between material ui grid items
  const [spacing, setSpacing] = React.useState(5);
  const classes = useStyles();

  // react useStates
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubCategory, setCurrentSubCategory] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [allShoppingItems, setAllShoppingItems] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  // const [categoriesData, setCategoriesData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [temporaryBasket, setTemporaryBasket] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchPainting, setSearchPainting] = useState([]);
  const [basket, setBasket] = useState({});
  const [basketOpen, setBasketOpen] = useState(false);

  // const [filter, setFilter] = useState({
  //   age: "",
  //   name: "hai",
  // });

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   setState({
  //     ...state,
  //     [name]: event.target.value,
  //   });
  // };
  // const dispatch = useDispatch();
  useEffect(() => {
    

    // get all catgeroies data from firestore
    const categories = db
      .collection("categories")
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          // getting data from collection document
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

  //attributes groupId = just to minimize clickHandlers count to one using switch
  const handleClick = (event, id, groupId) => {
    switch (groupId) {
      // category groupId === 0
      case "0": {
        setCurrentCategory(id);
        break;
      }
      // subCategory groupId === 1
      case "1": {
        setCurrentSubCategory(id);
        setIsSearchClicked(false);
      }

      // case "2" : {
      //   setcu
      // }
    }
  };

  // items search algorithm using tags that every item has predefined in firebase data as property
  const handleSearchClick = (e) => {
    const res = [];
    // splitting search value entered in search input
    const splittedSearchValue = searchValue.toLowerCase().split(" ");
    //pushing all items which has search value
    splittedSearchValue.forEach((value) => {
      allShoppingItems.forEach((item) =>
        item.tags.includes(value) ? res.push(item) : null
      );
    });
    // if we have more than one item with same title than we increase priority of item
    // to show first in search results
    for (let i = 0; i < res.length; i++) {
      for (let j = i + 1; j < res.length; j++) {
        if (res[i].title === res[j].title) {
          res[i].searchPriority++;
        }
      }
    }
    setIsSearchClicked(true);
    // isSearchCld.current.i = true;
    //using set to remove same items from array
    setSearchResult(
      //sorting by priority
      Array.from(new Set(res))
        .slice()
        .sort((a, b) => b.searchPriority - a.searchPriority)
    );
    // clearing priority
    res.forEach((item) => (item.searchPriority = 0));
  };

  // filter algorithms
  const handleFilterChange = (e) => {
    switch (e.target.value) {
      case "priceAcc": {
        // sorting itmes by price
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
      // sorting items by popularity
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

  // handling incrementing and decrementing items to basket
  const handleItemAddRemove = (
    e,
    name,
    itemId,
    itemImageUrl,
    itemTitle,
    itemPrice,
    quantity
  ) => {
    // storing items in temporary basket
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
              ? oldState[itemId].quantity <= 0
                ? 0
                : oldState[itemId].quantity - 1
              : 0,
          },
        }));
        break;
      }
    }
  };

  // const handleAddToBasket = (e, id) => {
  //   setBasket((oldState) => ({
  //     ...oldState,
  //     [id]: temporaryBasket[id],
  //   }));
  // };

  const handleBasketDialogOpen = () => {
    setBasketOpen(true);
  };
  const handleBasketDialogClose = () => {
    setBasketOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const showShoppingItems = () => {
    if (isSearchClicked) {
      // if search button clicked than painting search result items
      // othervise items from subCategory
      return searchResult.map((shoppingItem,index) => {
        return (
          <ShoppingItem
          key={index}
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
            // handleAddToBasket={handleAddToBasket}
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
        .map((shoppingItem,index) => {
          return (
            <ShoppingItem
            key={index}
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
              handleSearchClick={handleItemAddRemove}
              popularity={shoppingItem.popularity}
              handleItemAddRemove={handleItemAddRemove}
               
              onClick={(event) =>
                handleClick(event, shoppingItem.id, shoppingItem.groupId)
              }
            />
          );
        });
    }
  };
  return (
    // using styprovider to change default styles of material ui components
    <StylesProvider>
      <Container fixed>
        <div className="categories">
          <Link onClick={handleBasketDialogOpen}>
            <BasketIcon className={classes.basketIcon} />
          </Link>
          <Basket
          // sending handlers as props to basket to use them both from basket and shop home
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
            {allCategories.map((category,index) => {
              return (
                <CategoryItem
                key={index}
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
            {/* filtering subCategories and painting */}
            {allSubCategories
              .filter(
                (subCategory) => subCategory.categoryId === currentCategory
              )
              .map((subCategory,index) => {
                return (
                  <CategoryItem
                  key={index}
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
            {showShoppingItems()}
            
          </Grid>
        </div>
      </Container>
    </StylesProvider>
  );
}

export default ShopHome;
