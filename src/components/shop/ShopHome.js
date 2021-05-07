import React from "react";
import Link from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
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

import {
  hasSubCategories,
  hasShoppingItems,
} from "../../actions/changeCategory";
import ShoppingItem from "./ShoppingItem";
import CategoryItem from "./categories/CategoryItem";
import { storage } from "../..";

import { db } from "../..";
import { ContactsOutlined } from "@material-ui/icons";
//  states for  categories for pacients

// state for sub category set

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "30px",
  },

  typography: {
    // marginTop: "60px",
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
  console.log(allShoppingItems,"jjjjjjjjjjjjjjjjjjjjjjjjj")
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
      }

      // case "2" : {
      //   setcu
      // }
    }
  };

  console.log(allCategories, "ccccccccccc");
  console.log(allShoppingItems, "ssssssssss");
  console.log(allSubCategories, "eeeeeeee");
  return (
    <div className="categories">
      <button
        onClick={() => {
          // dispatch(type: INCREMENT)
          {
          }
        }}
      >
        increment
      </button>
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
        {/* filtering categories and painting */}
        {allShoppingItems
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
                popularity={shoppingItem.popularity}
                onClick={(event) =>
                  handleClick(event, shoppingItem.id, shoppingItem.groupId)
                }
              />
            );
          })}
      </Grid>
    </div>
  );
}

export default ShopHome;
