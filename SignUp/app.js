import {
  auth,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  storage,
  db,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../js/utils.js";

const signup_form = document.getElementById("signup_form");
const submit_btn = document.getElementById("submit_btn");

signup_form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(e);
  console.log(e.target);
  const img = e.target[0].files[0];
  const email = e.target[1].value;
  const password = e.target[2].value;
  const firstName = e.target[4].value;
  const lastName = e.target[5].value;
  const phone = e.target[6].value;
  const company = e.target[7].value;

  const userInfo = {
    img,
    email,
    password,
    firstName,
    lastName,
    phone,
    company,
  };

  // create Account

  submit_btn.disabled = true;
  submit_btn.innerText = "Loding...";
  createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log("user=>", user.user.uid);

      const userRef = ref(storage, `user/${user.user.uid}`);
      uploadBytes(userRef, img)
        .then(() => {
          console.log("user image Uploded");

          getDownloadURL(userRef)
            .then((url) => {
              console.log("URL Found =>", url);

              // update user info object
              userInfo.img = url;

              // create user Document Refrance
              const userDocRef = doc(db, "users", user.user.uid);

              //  set this document to db
              setDoc(userDocRef, userInfo).then(() => {
                console.log("user Object Updated Into db");
                window.location.href = 'E-Commerce-app/';

                submit_btn.disabled = false;
                submit_btn.innerText = "Submit";
              });
            })
            .catch((err) => console.log("URL Not Found"));
          submit_btn.disabled = false;
          submit_btn.innerText = "Submit";
        })
        .catch(() => {
          console.log("Error in Uploding User Image");
          submit_btn.disabled = false;
          submit_btn.innerText = "Submit";
        });
    })
    .catch((err) => {
      alert(err), submit_btn.disabled = false;
      submit_btn.innerText = "Submit";
    });

  console.log(userInfo);
});
