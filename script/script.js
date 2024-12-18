function createStarRating(rating) {
  let stars = '';
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars;

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fa-solid fa-star"></i>';
  }
  if (halfStar > 0) {
    stars += '<i class="fa-solid fa-star-half-stroke"></i>';
  }
  for (let i = 0; i < 5 - fullStars - (halfStar > 0 ? 1 : 0); i++) {
    stars += '<i class="fa-regular fa-star"></i>';
  }
  return stars;
}

function loadProducts() {
  const storedProducts = localStorage.getItem('galleryProducts');
  let products;

  if (storedProducts) {
    try {
      products = JSON.parse(storedProducts);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      products = []; 
    }
  } else {
    products = [];
  }

  return products;
}

function displayProductsByCategory(products) {
  const productsList = document.getElementById('hienthisach');
  productsList.innerHTML = ''; 

  
  const categories = products.reduce((acc, product) => {
    if (!acc[product.danhMuc]) {
      acc[product.danhMuc] = [];
    }
    acc[product.danhMuc].push(product);
    return acc;
  }, {});

  
  Object.keys(categories).forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('product-gallery-one-content-product');
    categoryDiv.innerHTML = `<h3>${category}</h3>`;

    categories[category].forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product-gallery-one-content-product-item');
      const giaSauGiam = parseFloat((product.giaGoc * (1 - product.giamGia / 100)).toFixed(2));
      productDiv.setAttribute('onclick', `duaVaoGioHang(${product.id})`);
      productDiv.innerHTML = `
        <img src="../${product.anh}" alt="${product.tenSach}">
        <div class="product-gallery-one-content-product-item-text">
          <li>${product.tenSach}</li>
          <li>${product.moTa}</li>
          <li><a>${product.giaGoc.toLocaleString('en-US')} </a><sup>đ</sup> <span>-${product.giamGia}%</span></li>
          <li>${giaSauGiam.toLocaleString('en-US')} <sup>đ</sup></li>
          <li>Tặng mã giảm ${product.giamGiaMa} <sup>đ</sup></li>
          <li class="star-ratings">
            ${createStarRating(product.danhGia)}
          </li>
        </div>
      `;

      categoryDiv.appendChild(productDiv);
    });

    productsList.appendChild(categoryDiv);
  });
}

// Example usage
document.addEventListener('DOMContentLoaded', function () {
  const products = loadProducts();
  if (products.length > 0) {
    displayProductsByCategory(products);
  } else {
    console.log("No products to display");
  }
});

function duaVaoGioHang(idSach) {
  alert('Đã thêm vào giỏ hàng' );
  var danhSachItemGioHang = layDanhSachItemGioHang();
  var index = danhSachItemGioHang.findIndex(item => item.id == idSach);
  if (index >= 0) {
      danhSachItemGioHang[index].soLuong++;
  } else {
      danhSachItemGioHang.push(taoDoiTuongItemGioHang(idSach, 1));
  }
  localStorage.setItem('gioHang', JSON.stringify(danhSachItemGioHang));
}

var galleryProducts = JSON.parse(localStorage.getItem('galleryProducts'));
function taoDoiTuongItemGioHang(id, soLuong) {
  return {
      id: id,
      soLuong: soLuong
  };
}

function layDanhSachItemGioHang() {
  var layDanhSachItemGioHang = localStorage.getItem('gioHang');
  if (layDanhSachItemGioHang) {
      return JSON.parse(layDanhSachItemGioHang);
  } else {
      return [];
  }
}





    