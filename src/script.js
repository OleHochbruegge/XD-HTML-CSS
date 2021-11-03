  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKHyomGtaBubIlyuiDwt9td2xBBh17Il4",
  authDomain: "setup01-26724.firebaseapp.com",
  projectId: "setup01-26724",
  storageBucket: "setup01-26724.appspot.com",
  messagingSenderId: "260548198479",
  appId: "1:260548198479:web:a511b147639bed2c90ea3a",
  measurementId: "G-EYZM6G3F43"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const todoList = document.querySelector('#todo-list')
const form = document.querySelector('#add-todo-form')
const updateBtn = document.querySelector('#update')
let newTitle = ""
let updateId = null

function renderList(doc) {
  let li = document.createElement('li');
  li.className = "collection-item"
  li.setAttribute('data-id', doc.id)
  let div = document.createElement('div');
  let title = document.createElement('span')
  title.textContent = doc.data().title
  let anchor = document.createElement('a')
  anchor.href = "#modal1"
  anchor.className = "modal-trigger secondary-content"
  let editBtn = document.createElement('i')
  editBtn.className = "material-icons"
  editBtn.innerText = "edit"
  let deleteBtn = document.createElement('i')
  deleteBtn.className = "material-icons secondary-content"
  deleteBtn.innerText = "delete"
  anchor.appendChild(editBtn)
  div.appendChild(title)
  div.appendChild(deleteBtn)
  div.appendChild(anchor)
  li.appendChild(div)

  deleteBtn.addEventListener('click', e => {
    let id = e.target.parentElement.parentElement.getAttribute('data-id')
    db.collection('todo').doc(id).delete()

  })

  editBtn.addEventListener('click', e => {
    updateId = e.target.parentElement.parentElement.parentElement.getAttribute('data-id')
  })

  todoList.append(li)
}
updateBtn.addEventListener('click', e => {
  newTitle = document.getElementsByName('newtitle')[0].value
  db.collection('todo').doc(updateId).update({
    title : newTitle
  })
})

form.addEventListener('submit', e => {
  e.preventDefault()
  db.collection('todo').add({
    title:form.title.value
  })
  form.title.value = ""
})


db.collection('todo').orderBy('title').onSnapshot(snapshot => {
  let changes = snapshot.docChanges()
  // console.log(changes)
  changes.forEach(change => {
    if (change.type === 'added') {
      renderList(change.doc)
    } else if (change.type === 'removed') {
      let li = todoList.querySelector(`[data-id=${change.doc.id}]`)
      todoList.removeChild(li)
    } else if (change.type === 'modified') {
      let li = todoList.querySelector(`[data-id=${change.doc.id}]`)
      li.getElementsByTagName('span')[0].textContent = newTitle
      newTitle = ''
    } else if (change.type.trim() === "") {
      return
    }
  }) 
})






(function($) {
  "use strict"; // Start of use strict
  // Configure tooltips for collapsed side navigation
  $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
    template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip" style="pointer-events: none;"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
  })
  // Toggle the side navigation
  $("#sidenavToggler").click(function(e) {
    e.preventDefault();
    $("body").toggleClass("sidenav-toggled");
    $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
    $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
  });
  // Force the toggled class to be removed when a collapsible nav link is clicked
  $(".navbar-sidenav .nav-link-collapse").click(function(e) {
    e.preventDefault();
    $("body").removeClass("sidenav-toggled");
  });
  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse').on('mousewheel DOMMouseScroll', function(e) {
    var e0 = e.originalEvent,
      delta = e0.wheelDelta || -e0.detail;
    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    e.preventDefault();
  });
  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });
  // Configure tooltips globally
  $('[data-toggle="tooltip"]').tooltip()
  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });
})(jQuery); // End of use strict

