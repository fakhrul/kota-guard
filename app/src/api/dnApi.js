// import firebase from 'react-native-firebase';
// import uuid4 from 'uuid/v4';
import * as fb from "../config/firebase";
import * as Facebook from "expo-facebook";

// export function login({ email, password }) {
//   firebase
//     .auth()
//     .signInWithEmailAndPassword(email, password)
//     .then((value) => console.log(value));
// }

// export async function loginWithFacebook() {
//   await Facebook.initializeAsync("596268807638268");

//   const { type, token } = await Facebook.logInWithReadPermissionsAsync({
//     permissions: ["public_profile", "email"],
//   });
//   if (type === "success" && token) {
//     // Build Firebase credential with the Facebook access token.
//     const credential = fb.fb.auth.FacebookAuthProvider.credential(token);

//     // Sign in with credential from the Facebook user.
//     await fb.auth.signInWithCredential(credential);
//   }
// }

// export function signup({ email, password, displayName }) {
//   try {
//     fb.auth
//       .createUserWithEmailAndPassword(email, password)
//       .then((userInfo) => {
//         userInfo.user.updateProfile({ displayName: displayName.trim() });
//       })
//       .catch((error) => {
//         throw new Error(error.message);
//       });
//   } catch (error) {
//     alert(error.message);
//   }
// }

// export function subscribeToAuthChanges(authStateChanged) {
//   firebase.auth().onAuthStateChanged((user) => {
//     authStateChanged(user);
//   });
// }

// export function signout(onSignedOut) {
//   firebase
//     .auth()
//     .signOut()
//     .then(() => {
//       onSignedOut();
//     });
// }

// export function updateFood(food, updateComplete) {
//   food.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
//   console.log("Updating food in firebase");

//   firebase.firestore()
//     .collection('Foods')
//     .doc(food.id).set(food)
//     .then(() => updateComplete(food))
//     .catch((error) => console.log(error));
// }

// export function deleteFood(food, deleteComplete) {
//   console.log(food);

//   firebase.firestore()
//     .collection('Foods')
//     .doc(food.id).delete()
//     .then(() => deleteComplete())
//     .catch((error) => console.log(error));
// }

// export async function getFoods(foodsRetreived) {

//   var foodList = [];

//   var snapshot = await firebase.firestore()
//     .collection('Foods')
//     .orderBy('createdAt')
//     .get()

//   snapshot.forEach((doc) => {
//     const foodItem = doc.data();
//     foodItem.id = doc.id;
//     foodList.push(foodItem);
//   });

//   foodsRetreived(foodList);
// }

// export function uploadFood(food, onFoodUploaded, { updating }) {

//   if (food.imageUri) {
//     const fileExtension = food.imageUri.split('.').pop();
//     console.log("EXT: " + fileExtension);

//     var uuid = uuid4();

//     const fileName = `${uuid}.${fileExtension}`;
//     console.log(fileName);

//     var storageRef = firebase.storage().ref(`foods/images/${fileName}`);

//     storageRef.putFile(food.imageUri)
//       .on(
//         firebase.storage.TaskEvent.STATE_CHANGED,
//         snapshot => {
//           console.log("snapshot: " + snapshot.state);
//           console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

//           if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
//             console.log("Success");
//           }
//         },
//         error => {
//           unsubscribe();
//           console.log("image upload error: " + error.toString());
//         },
//         () => {
//           storageRef.getDownloadURL()
//             .then((downloadUrl) => {
//               console.log("File available at: " + downloadUrl);

//               food.image = downloadUrl;

//               delete food.imageUri;

//               if (updating) {
//                 console.log("Updating....");
//                 updateFood(food, onFoodUploaded);
//               } else {
//                 console.log("adding...");
//                 addFood(food, onFoodUploaded);
//               }
//             })
//         }
//       )
//   } else {
//     console.log("Skipping image upload");

//     delete food.imageUri;

//     if (updating) {
//       console.log("Updating....");
//       updateFood(food, onFoodUploaded);
//     } else {
//       console.log("adding...");
//       addFood(food, onFoodUploaded);
//     }
//   }
// }

// export function addFood(food, addComplete) {
//   food.createdAt = firebase.firestore.FieldValue.serverTimestamp();

//   firebase.firestore()
//     .collection('Foods')
//     .add(food)
//     .then((snapshot) => {
//       food.id = snapshot.id;
//       snapshot.set(food);
//     }).then(() => addComplete(food))
//     .catch((error) => console.log(error));
// }
