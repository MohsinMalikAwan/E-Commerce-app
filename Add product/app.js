import { ref, storage, uploadBytes, getDownloadURL, db , collection , addDoc } from "../js/utils.js";

const product_from = document.getElementById('product-from')

product_from.addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log(e);

    const productInfo = {
        img : e.target[0].files[0],
        name : e.target[1].value,
        des : e.target[2].value,
        price : e.target[3].value,
        category : e.target[3].value,
    }
    console.log(productInfo);

    const imgRef = ref(storage , productInfo.img.name)
    uploadBytes(imgRef , productInfo.img).then(()=>{
        console.log('File Uploaded');

        getDownloadURL(imgRef).then((url)=>{
            console.log('Url Found', url);
            productInfo.img = url;


            // add document to addproduct collection
            const productCollection =collection(db , "Products")
            addDoc(productCollection , productInfo).then(()=>{
                console.log('Document Added');

                window.location.href = '/E-Commerce-app'
            })
        })
    })
})