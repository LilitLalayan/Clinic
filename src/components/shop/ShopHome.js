import React from "react";
import Link from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect, useRef } from "react";
import "./ShopStyles.css";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import FormHelperText from '@material-ui/core/FormHelperText';

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
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import ShoppingItem from "./ShoppingItem";
import CategoryItem from "./categories/CategoryItem";
import { storage } from "../..";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { db } from "../..";
import { ContactsOutlined } from "@material-ui/icons";
import formHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

//  states for  categories for pacients

// state for sub category set

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "30px",
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

  option : {
    padding: "4px"
  }
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
  console.log(temporaryBasket,"vvvvvvvvvvvvvvvvvvvvvvvvv")
  console.log(basket,"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
  const isSearchCld = useRef({
    i: false
  });
  const [filter, setFilter] = useState({
    age: '',
    name: 'hai',
  });

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   setState({
  //     ...state,
  //     [name]: event.target.value,
  //   });
  // };
  console.log(allShoppingItems, "jjjjjjjjjjjjjjjjjjjjjjjjj");
  const dispatch = useDispatch();
  useEffect(() => {
    // adding data from firestore instead of empty arrays
    // db.collection("shopItems")
    //   .doc("tootPaste1")
    //   .set({
    //     id: "30",
    //     title: "Aquafresh",
    //     subCategoryId: "3",
    //     imgUrl:
    //       "https://firebasestorage.googleapis.com/v0/b/dental-clinic-92719.appspot.com/o/shop%2Fpaste%2Fimg1.jpg?alt=media&token=38e25aca-1126-49d8-978a-09e3837c1fff",
    //     price: "500 amd",
    //     descTitle: " Standard Configuration",
    //     descBody:
    //       "3-way syringe (cold and hot)<br/>2 piece\nAdjustable headrest<br/>Double armrest<br/>Down-mounted tool tray<br/>5-posistion for handpieces,syringe and scaler<br/>Water suction and saliva ejector<br/>LED lamp with senso",
    //     date: new Date(),
    //     popularity: 2,
    //   })
    //   .then(() => {
    //     console.log("Document successfully written!");
    //   })
    //   .catch((error) => {
    //     console.error("Error writing document: ", error);
    //   });

    // db.collection("shopItems")
    //   .doc("toothPaste2")
    //   .set({
    //     id: "31",
    //     title: "Sensodyne",
    //     subCategoryId: "3",
    //     imageUrl:
    //       "https://firebasestorage.googleapis.com/v0/b/dental-clinic-92719.appspot.com/o/shop%2Fpaste%2Fimg2.jpg?alt=media&token=b20f4274-6c7b-4d49-a3f0-e1f7777d472f",
    //     price: "460 amd",
    //     descTitle: " Standard Configuration",
    //     descBody:
    //       "3-way syringe (cold and hot)<br/>2 piece\nAdjustable headrest<br/>Double armrest<br/>Down-mounted tool tray<br/>5-posistion for handpieces,syringe and scaler<br/>Water suction and saliva ejector<br/>LED lamp with senso",
    //     date: new Date(),
    //     popularity: 5,
    //   })
    //   .then(() => {
    //     console.log("Document successfully written!");
    //   })
    //   .catch((error) => {
    //     console.error("Error writing document: ", error);
    //   });

    // db.collection("shopItems")
    //   .doc("toothPaste3")
    //   .set({
    //     id: "32",
    //     title: "Crest",
    //     subCategoryId: "3",
    //     imageUrl:
    //       "https://firebasestorage.googleapis.com/v0/b/dental-clinic-92719.appspot.com/o/shop%2Fpaste%2Fimg3.jpg?alt=media&token=9bd6252d-fe38-44f6-9ce6-06ed07f2f6a6",
    //     price: "700 amd",
    //     descTitle: " Standard Configuration",
    //     descBody:
    //       "3-way syringe (cold and hot)<br/>2 piece\nAdjustable headrest<br/>Double armrest<br/>Down-mounted tool tray<br/>5-posistion for handpieces,syringe and scaler<br/>Water suction and saliva ejector<br/>LED lamp with senso",
    //     date: new Date(),
    //     popularity: 2,
    //   })
    //   .then(() => {
    //     console.log("Document successfully written!");
    //   })
    //   .catch((error) => {
    //     console.error("Error writing document: ", error);
    //   });

    // db.collection("shopItems")
    //   .doc("toothPaste4")
    //   .set({
    //     id: "33",
    //     title: "Blend A Med",
    //     subCategoryId: "3",
    //     imageUrl:
    //       "https://firebasestorage.googleapis.com/v0/b/dental-clinic-92719.appspot.com/o/shop%2Fpaste%2Fimg4.jpg?alt=media&token=f56bf213-ff12-4ede-8343-a842f0f1e3ab",
    //     price: "800 amd",
    //     descTitle: " Standard Configuration",
    //     descBody:
    //       "t comes in a blue gel format, provides protection from sensitivity, cavity protection, strengthens the teeth and gives a long lasting fresh breath feeling <br />With twice daily brushing it provides daily care for sensitive teeth with all the benefits of a regular toothpaste. <br />Bad breath or halitosis is mainly caused by plaque and bacteria build-up on the teeth and gums <br />Regular twice daily brushing with Sensodyne Extra Fresh Gel helps prevent plaque and bacteria build-up on teeth",
    //     date: new Date(),
    //     popularity: 4,
    //   })
    //   .then(() => {
    //     console.log("Document successfully written!");
    //   })
    //   .catch((error) => {
    //     console.error("Error writing document: ", error);
    //   });

    // db.collection("shopItems")
    //   .doc("toothPaste5")
    //   .set({
    //     id: "34",
    //     title: "Aim",
    //     subCategoryId: "3",
    //     imageUrl:
    //       "https://firebasestorage.googleapis.com/v0/b/dental-clinic-92719.appspot.com/o/shop%2Fpaste%2Fimg5.jpg?alt=media&token=72ae0c34-0034-476a-99ba-8ff26de08ee4",
    //     price: "850 amd",
    //     descTitle: " Standard Configuration",
    //     descBody:
    //       "t comes in a blue gel format, provides protection from sensitivity, cavity protection, strengthens the teeth and gives a long lasting fresh breath feeling <br />With twice daily brushing it provides daily care for sensitive teeth with all the benefits of a regular toothpaste. <br />Bad breath or halitosis is mainly caused by plaque and bacteria build-up on the teeth and gums <br />Regular twice daily brushing with Sensodyne Extra Fresh Gel helps prevent plaque and bacteria build-up on teeth",

    //     date: new Date(),
    //     popularity: 3,
    //   })
    //   .then(() => {
    //     console.log("Document successfully written!");
    //   })
    //   .catch((error) => {
    //     console.error("Error writing document: ", error);
    //   });

    // db.collection("shopItems")
    //   .doc("toothPaste6")
    //   .set({
    //     id: "35",
    //     title: "Colgate",
    //     subCategoryId: "3",
    //     imageUrl:
    //       "https://firebasestorage.googleapis.com/v0/b/dental-clinic-92719.appspot.com/o/shop%2Fpaste%2Fimg6.jpg?alt=media&token=0913e1d6-c7ec-42a1-9548-10fb499cb5a7",
    //     price: "500 amd",
    //     descTitle: " Standard Configuration",
    //     descBody:
    //       "t comes in a blue gel format, provides protection from sensitivity, cavity protection, strengthens the teeth and gives a long lasting fresh breath feeling <br />With twice daily brushing it provides daily care for sensitive teeth with all the benefits of a regular toothpaste. <br />Bad breath or halitosis is mainly caused by plaque and bacteria build-up on the teeth and gums <br />Regular twice daily brushing with Sensodyne Extra Fresh Gel helps prevent plaque and bacteria build-up on teeth",

    //     date: new Date(),
    //     popularity: 4,
    //   })
    //   .then(() => {
    //     console.log("Document successfully written!");
    //   })
    //   .catch((error) => {
    //     console.error("Error writing document: ", error);
    //   });

    // db.collection("shopItems")
    //   .doc("toothPaste7")
    //   .set({
    //     id: "36",
    //     title: "Pepsodent",
    //     subCategoryId: "3",
    //     imageUrl:
    //       "https://firebasestorage.googleapis.com/v0/b/dental-clinic-92719.appspot.com/o/shop%2Fpaste%2Fimg7.jpg?alt=media&token=1b1b6e71-fab7-403e-8dae-5b2e3fab6154",
    //     price: "800 amd",
    //     descTitle: " Standard Configuration",
    //     descBody:
    //       "t comes in a blue gel format, provides protection from sensitivity, cavity protection, strengthens the teeth and gives a long lasting fresh breath feeling <br />With twice daily brushing it provides daily care for sensitive teeth with all the benefits of a regular toothpaste. <br />Bad breath or halitosis is mainly caused by plaque and bacteria build-up on the teeth and gums <br />Regular twice daily brushing with Sensodyne Extra Fresh Gel helps prevent plaque and bacteria build-up on teeth",
    //     date: new Date(),
    //     popularity: 5,
    //   })
    //   .then(() => {
    //     console.log("Document successfully written!");
    //   })
    //   .catch((error) => {
    //     console.error("Error writing document: ", error);
    //   });

    // db.collection("shopItems")
    //   .doc("toothPaste8")
    //   .set({
    //     id: "37",
    //     title: "Close Up",
    //     subCategoryId: "3",
    //     imageUrl:
    //       "https://firebasestorage.googleapis.com/v0/b/dental-clinic-92719.appspot.com/o/shop%2Fpaste%2Fimg7.jpg?alt=media&token=1b1b6e71-fab7-403e-8dae-5b2e3fab6154",
    //     price: "900 amd",
    //     descTitle: " Standard Configuration",
    //     descBody:
    //       "t comes in a blue gel format, provides protection from sensitivity, cavity protection, strengthens the teeth and gives a long lasting fresh breath feeling <br />With twice daily brushing it provides daily care for sensitive teeth with all the benefits of a regular toothpaste. <br />Bad breath or halitosis is mainly caused by plaque and bacteria build-up on the teeth and gums <br />Regular twice daily brushing with Sensodyne Extra Fresh Gel helps prevent plaque and bacteria build-up on teeth",

    //     date: new Date(),
    //     popularity: 5,
    //   })
    //   .then(() => {
    //     console.log("Document successfully written!");
    //   })
    //   .catch((error) => {
    //     console.error("Error writing document: ", error);
    //   });

    // db.collection("shopItems")
    //   .doc("toothPaste9")
    //   .set({
    //     id: "38",
    //     title: "Dabur Red",
    //     subCategoryId: "3",
    //     imageUrl:
    //       "https://firebasestorage.googleapis.com/v0/b/dental-clinic-92719.appspot.com/o/shop%2Fpaste%2Fimg9.jpg?alt=media&token=b32eed6e-6c30-4cac-b2ba-e316f4b56a67",
    //     price: "450 amd",
    //     descTitle: " Standard Configuration",
    //     descBody:
    //       "t comes in a blue gel format, provides protection from sensitivity, cavity protection, strengthens the teeth and gives a long lasting fresh breath feeling <br />With twice daily brushing it provides daily care for sensitive teeth with all the benefits of a regular toothpaste. <br />Bad breath or halitosis is mainly caused by plaque and bacteria build-up on the teeth and gums <br />Regular twice daily brushing with Sensodyne Extra Fresh Gel helps prevent plaque and bacteria build-up on teeth",

    //     date: new Date(),
    //     popularity: 5,
    //   })
    //   .then(() => {
    //     console.log("Document successfully written!");
    //   })
    //   .catch((error) => {
    //     console.error("Error writing document: ", error);
    //   });

    // db.collection("shopItems")
    //   .doc("shopItem10")
    //   .set({
    //     id: "69",
    //     title: "ZZ-888",
    //     subCategoryId: "3",
    //     imageUrl:
    //       "https://firebasestorage.googleapis.com/v0/b/dental-clinic-92719.appspot.com/o/shop%2Fabarudovanie%2Fimg8.jpg?alt=media&token=500f08aa-3e60-4e21-a6ca-be42fe91be7e",
    //     price: "500 amd",
    //     descTitle: " Standard Configuration",
    //     descBody:
    //       "t comes in a blue gel format, provides protection from sensitivity, cavity protection, strengthens the teeth and gives a long lasting fresh breath feeling <br />With twice daily brushing it provides daily care for sensitive teeth with all the benefits of a regular toothpaste. <br />Bad breath or halitosis is mainly caused by plaque and bacteria build-up on the teeth and gums <br />Regular twice daily brushing with Sensodyne Extra Fresh Gel helps prevent plaque and bacteria build-up on teeth",

    //     date: new Date(),
    //     popularity: 5,
    //   })
    //   .then(() => {
    //     console.log("Document successfully written!");
    //   })
    //   .catch((error) => {
    //     console.error("Error writing document: ", error);
    //   });
    // var washingtonRef = db.collection("shopItems").doc("toothPaste9");

    // // Set the "capital" field of the city 'DC'
    // return washingtonRef
    //   .update({
    //     searchPriority: 0,
    //   })
    //   .then(() => {
    //     console.log("Document successfully updated!");
    //   })
    //   .catch((error) => {
    //     // The document probably doesn't exist.
    //     console.error("Error updating document: ", error);
    //   });

    // get all catgeroies data from firestore
    const categories = db
      .collection("categories")
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          console.log(doc, "wwwwwwwwww");
          // doc.data() is never undefined for query doc snapshots
          data.push(doc.data());
        });
        console.log(typeof data[0].id, "lllllllll");
        setAllCategories(data);
      });
    // get all subCategories data from firestore`
    const subCategories = db
      .collection("subCategories")
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          console.log(doc, "wwwwwwwwww");
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
          console.log(doc.data(), "wwwwwwwwww");
          // doc.data() is never undefined for query doc snapshots
          data.push(doc.data());
        });
        console.log(data[0], ";;;;;;;;;;;;;;;");
        setAllShoppingItems(data);
      });
  }, []);

  const handleClick = (event, id, groupId) => {
    console.log(groupId, "qqqqqqqqqqqqqqqqq");
    switch (groupId) {
      case "0": {
        console.log(
          +event.target.id,
          event.target.title,
          "uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu"
        );
        setCurrentCategory(id);
        break;
      }

      case "1": {
        console.log(id, "ttttttttttttttttttttttttttttttt");
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
    console.log(allShoppingItems, "iiiiiiiiiiiiiiiiiiiiiiii");
    splittedSearchValue.forEach((value) => {
      allShoppingItems.forEach((item) =>
        item.tags.includes(value) ? arr.push(item) : null
      );
    });
    // const set(...result)
    console.log(arr, "tttttttttttttttt");
    
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i].title === arr[j].title) {
          
          arr[i].searchPriority++;
        }
      }
    }
    console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    setIsSearchClicked(true);
    // isSearchCld.current.i = true;
    setSearchResult(Array.from(new Set(arr)).slice().sort((a,b) => b.searchPriority - a.searchPriority));
    arr.forEach(item => item.searchPriority = 0)
    
  };

  const handleFilterChange = (e) => {
    console.log(e.target.value,"ppppppppppppppppp")
    switch(e.target.value) {
      case "priceAcc": {
        console.log(allShoppingItems,"rrrrrrrrrrrrrrrrrr")

        setAllShoppingItems(allShoppingItems.slice().sort((a,b) => Number.parseInt(a.price) - Number.parseInt(b.price)));
        setSearchResult(searchResult.slice().sort((a,b) => Number.parseInt(a.price) - Number.parseInt(b.price)))
        break;
      }

      case "priceDescending": {
        console.log(allShoppingItems,"eeeeeeeeeeeeeeeeeeeeee")
        setSearchResult(searchResult.slice().sort((a,b) => Number.parseInt(b.price) - Number.parseInt(a.price)))

        setAllShoppingItems(allShoppingItems.slice().sort((a,b) => Number.parseInt(b.price) - Number.parseInt(a.price)));
        break;
      }

      case "popularityAcc": {
        console.log(allShoppingItems,"qqqqqqqqqqrrrrrrrrrr")
        setSearchResult(searchResult.slice().sort((a,b) => Number.parseInt(a.popularity) - Number.parseInt(b.popularity)))

        setAllShoppingItems(allShoppingItems.slice().sort((a,b) => Number.parseInt(a.popularity) - Number.parseInt(b.popularity)));
        break;
      }

      case "popularityDescending": {
        setSearchResult(searchResult.slice().sort((a,b) => Number.parseInt(b.popularity) - Number.parseInt(a.popularity)))
        setAllShoppingItems(allShoppingItems.slice().sort((a,b) => Number.parseInt(b.popularity) - Number.parseInt(a.popularity)));
        break;
      }
    }
  }

  const handleItemAddRemove = (e, name,itemId) => {
    switch(name) {
      case "increment": {
        setTemporaryBasket((oldState) => ({
          ...oldState,
          [itemId] : oldState[itemId] === undefined ? 1 : oldState[itemId] + 1
        }))
        break;
      }

      case "decrement": {
        setTemporaryBasket((oldState) => ({
          ...oldState,
          [itemId] : oldState[itemId] === undefined ? 1 : oldState[itemId] - 1
        }))
        break;
      }
    }
    
    
  }

  const handleAddToBasket = (e,id) => {
    setBasket((oldState) => ({
      ...oldState,
      [id]: temporaryBasket[id]
    }))
  }
  console.log("ccccccccccccccccccccccccccccccccccccccccccccc")

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  console.log(allCategories, "ccccccccccc");
  console.log(allShoppingItems, "ssssssssss");
  console.log(allSubCategories, "eeeeeeee");

  const a = () => {
    console.log(isSearchClicked,"uuuuuuuuuuuuuuuuuuuuuuuu")
    if (isSearchClicked) {
      console.log(isSearchCld.current.i ," xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
      // setIsSearchClicked(false);
      // isSearchCld.current.i = false;
      return searchResult.map(shoppingItem => {
        return (<ShoppingItem
        id={shoppingItem.id}
        title={shoppingItem.title}
        price={shoppingItem.price}
        imageUrl={shoppingItem.imageUrl}
        date={shoppingItem.date}
        popularity={shoppingItem.popularity}
        tmpItemCount={temporaryBasket[shoppingItem.id]}
        handleItemAddRemove={handleItemAddRemove}
        handleAddToBasket={handleAddToBasket}
        onClick={(event) =>
          handleClick(event, shoppingItem.id, shoppingItem.groupId)
        }
      />)
      });
      // setIsSearchClicked(false);
      
    } else {
      console.log("ssssssssssssssssssssssssssssssssss")
      return allShoppingItems
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
            tmpItemCount={temporaryBasket[shoppingItem.id]}
            handleSearchClick={handleAddToBasket}
            popularity={shoppingItem.popularity}
            handleItemAddRemove={handleItemAddRemove}
            handleAddToBasket={handleAddToBasket}
            onClick={(event) =>
              handleClick(event, shoppingItem.id, shoppingItem.groupId)
            }
          />
        );
      });
    }

    
  }
  return (
    <StylesProvider>
      <div className="categories">
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
            name: 'age',
            id: 'age-native-helper',
          }}
        >
          <option aria-label="None" value="" />
          <option value={"priceAcc"} className={classes.option}>By Price accending</option>
          <option value={"priceDescending"} className={classes.option}>By Price descending</option>
          <option value={"popularityAcc"} className={classes.option}>By Popularity accending</option>
          <option value={"popularityDescending"} className={classes.option}>By Popularity descending</option>

        </NativeSelect>
      </FormControl>
        </form>

        <Typography className={classes.typography} variant="h6" align="center">
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
            .filter((subCategory) => subCategory.categoryId === currentCategory)
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
    </StylesProvider>
  );
}

export default ShopHome;
