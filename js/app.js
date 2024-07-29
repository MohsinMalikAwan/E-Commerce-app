import {
  auth,
  storage,
  db,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  getDoc,
  getDocs,
  collection,
  doc,
  getDownloadURL
} from "./utils.js";

const logout_btn = document.getElementById('logout_btn')
const addProduct = document.getElementById('addProduct')
const login_link = document.getElementById('login_link')
const user_img = document.getElementById('user_img')
const product_card_container = document.getElementById('product_card_container')
getAllProduct()
// console.log("auth=>",auth);
// console.log("storage=>",storage);
// console.log("db=>",db);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    login_link.style.display = 'none';
    user_img.style.display = 'inline-block';
    getUserInfo(uid)
    // ...
  } else {
    // window.location.href = "/login/index.html";
    login_link.style.display = 'inline-block';
    user_img.style.display = 'none';
    logout_btn.style.display = 'none'
    addProduct.style.display = 'none'
  }
});

logout_btn.addEventListener('click' , ()=>{
  signOut(auth);
});

function getUserInfo(uid) {
  const userRef = doc(db, "users", uid);
  getDoc(userRef).then((data)=>{
    console.log("data=>", data.id);
    console.log("data=>", data.data());
    user_img.src = data.data().img
  })
}

async function getAllProduct() {
  try {
    
    const querySnapshot = await getDocs(collection(db, "Products"));
    product_card_container.innerHTML = ''
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);      
      const product = doc.data()

const {img , name , price} = product

      const card = `  <div class="product__item" >
                        <div class="product__item__pic set-bg h-10 w-7 ">
                            <img src="${img}" alt="">
                            <ul class="product__hover">
                                <li><a href="#"><img src="img/icon/heart.png" alt=""></a></li>
                                <li><a href="#"><img src="img/icon/compare.png" alt=""> <span>Compare</span></a></li>
                                <li><a href="#"><img src="img/icon/search.png" alt=""></a></li>
                            </ul>
                        </div>
                        <div class="product__item__text">
                            <h6>${name}</h6>
                            <a href="#" class="add-cart">+ Add To Cart</a>
                            <div class="rating">
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                            </div>
                            <h5>$${price}</h5>
                            <div class="product__color__select">
                                <label for="pc-22">
                                    <input type="radio" id="pc-22">
                                </label>
                                <label class="active black" for="pc-23">
                                    <input type="radio" id="pc-23">
                                </label>
                                <label class="grey" for="pc-24">
                                    <input type="radio" id="pc-24">
                                </label>
                            </div>
                        </div>
                    </div>` ;

                        product_card_container.innerHTML += card;
      console.log("product=>", product);
    });

  } catch (err) {
    alert(err)
  }
}


