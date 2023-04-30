// 1. buat userreducer .
// userreducer = function dengan parameter state,action.
// kegunaan dari user reducer function yg digunakan untuk membuat global state.
// global state yang digunakan dapat berubah tergantung dari action.typenya

// 2. store
// store = menampung semua reducer. dikumpulkan jadi 1 dalam rootReducer dengan menggunakan
// combine reducer

// 3. index js
// panggil Provider dari react-redux . sebagai HOC(high order component)
// untuk membungkus App.js (kumpulan component) .
// buat sebuah variable store sebagai configurasi store yang dapat ditampung oleh Provider

// 4. kita dapat memanggil global state kita lewat sebuah
// useSelector((state) =>state.auth ) yang ditampung dalam variable bernama
// userSelector.
// userSelector merupakan sebuah object. yang kita init dari userReducer.



npx json-server database.json -p 2000