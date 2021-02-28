"use strict";

window.addEventListener("DOMContentLoaded", start);

let counter = 0;
let bloodarray = [];
var halfbloodarray = [];
var purebloodarray = [];

document.querySelector("button#sortfirstname").onclick = function () {
  counter += 1;
};
document.querySelector("button#sortlastname").onclick = function () {
  counter += 1;
};
const modal = document.querySelector(".modal-background");

let allstudents = [];
let expelledstudents = [];

let students = {
  firstname: "",
  middlename: "",
  lastname: "",
  house: "",
  gender: "",
  bloodstatus: "",
  expelled: false,
};

function start() {
  document.querySelectorAll(".filtering button").forEach((button) => {
    button.addEventListener("click", function () {
      chooseactivebutton(button);
      return button;
    });
  });

  function chooseactivebutton(button) {
    document.querySelectorAll("button").forEach((button) => {
      button.classList.remove("active");
    });
    button.classList.add("active");
  }

  document
    .querySelector("button#sortfirstname")
    .addEventListener("click", sortfirstname);
  document
    .querySelector("button#sortlastname")
    .addEventListener("click", sortlastname);
  document
    .querySelector("button#filterall")
    .addEventListener("click", function () {
      document.querySelector("div.templatesgohere").innerHTML = "";
      allstudents.forEach(displaystudents);
    });
  document
    .querySelector("button#filterRavenclaw")
    .addEventListener("click", filterRavenclaw);
  document
    .querySelector("button#filterHufflepuff")
    .addEventListener("click", filterHufflepuff);
  document
    .querySelector("button#filterSlytherin")
    .addEventListener("click", filterSlytherin);
  document
    .querySelector("button#filterGryffindor")
    .addEventListener("click", filterGryffindor);
  document
    .querySelector("button#filterExpelled")
    .addEventListener("click", filterExpelled);
  loadJSON();
}

function loadJSON() {
  fetch("https://petlatkea.dk/2020/hogwarts/students.json")
    .then((response) => response.json())
    .then((jsonData) => {
      prepareObjects(jsonData);
    });

  fetch("https://petlatkea.dk/2021/hogwarts/families.json")
    .then((response) => response.json())
    .then((blooddata) => {
      createbloodarrays(blooddata);
    });
}

function createbloodarrays(blooddata) {
  bloodarray.push(blooddata);
  var halfbloods = bloodarray[0].half;
  halfbloodarray.push(halfbloods);
  var purebloods = bloodarray[0].pure;
  purebloodarray.push(purebloods);
}

function prepareObjects(jsonData) {
  allstudents = jsonData.map(preapareObject);
  displayList(allstudents);
}

function preapareObject(jsonObject) {
  const newstudent = Object.create(students);

  let trimming = jsonObject.fullname.trim();
  let breaking = trimming.split(" ");
  let house = jsonObject.house;
  let housetrim = house.trim();
  let uppercasefirstletterofhouse = housetrim.charAt(0).toUpperCase();
  let lowecaserestofhouse = housetrim.slice(1).toLowerCase();
  let housefixed = uppercasefirstletterofhouse + lowecaserestofhouse;

  if (breaking.length == 1) {
    let uppercasefirstletteroffirstname = breaking[0].charAt(0).toUpperCase();
    let lowecaserestofthefirstname = breaking[0].slice(1).toLowerCase();
    let fixedfirstname =
      uppercasefirstletteroffirstname + lowecaserestofthefirstname;
    newstudent.firstname = fixedfirstname;
    newstudent.gender = jsonObject.gender;
    newstudent.house = housefixed;
    newstudent.bloodstatus = "muggle";
  } else if (breaking.length == 2) {
    let uppercasefirstletteroffirstname = breaking[0].charAt(0).toUpperCase();
    let lowecaserestofthefirstname = breaking[0].slice(1).toLowerCase();
    let fixedfirstname =
      uppercasefirstletteroffirstname + lowecaserestofthefirstname;
    // console.log(fixedfirstname)
    let uppercasefirstletteroflastname = breaking[1].charAt(0).toUpperCase();
    let lowecaserestofthelastname = breaking[1].slice(1).toLowerCase();
    let fixedlastname =
      uppercasefirstletteroflastname + lowecaserestofthelastname;
    // console.log(fixedlastname)
    newstudent.firstname = fixedfirstname;
    newstudent.lastname = fixedlastname;
    newstudent.gender = jsonObject.gender;
    newstudent.house = housefixed;
    checkblood();
  } else if (breaking.length == 3) {
    let uppercasefirstletteroffirstname = breaking[0].charAt(0).toUpperCase();
    let lowecaserestofthefirstname = breaking[0].slice(1).toLowerCase();
    let fixedfirstname =
      uppercasefirstletteroffirstname + lowecaserestofthefirstname;
    // console.log(fixedfirstname)
    let uppercasefirstletterofmiddlename = breaking[1].charAt(0).toUpperCase();
    let lowecaserestoofmiddlename = breaking[1].slice(1).toLowerCase();
    let fixedmiddlename =
      uppercasefirstletterofmiddlename + lowecaserestoofmiddlename;
    // console.log(fixedmiddlename)
    let uppercasefirstletteroflastname = breaking[2].charAt(0).toUpperCase();
    let lowecaserestofthelastname = breaking[2].slice(1).toLowerCase();
    let fixedlastname =
      uppercasefirstletteroflastname + lowecaserestofthelastname;
    // console.log(fixedlastname)
    newstudent.firstname = fixedfirstname;
    newstudent.middlename = fixedmiddlename;
    newstudent.lastname = fixedlastname;
    newstudent.gender = jsonObject.gender;
    newstudent.house = housefixed;
    checkblood();
  }

  function checkblood() {
    // console.log(newstudent.lastname);
    console.log(halfbloodarray);
    if (halfbloodarray.includes("Abbott")) {
      console.log("sometihng ");
    }
  }

  //   console.log(newstudent);
  allstudents.push(newstudent);
  // console.log(allstudents)
  return newstudent;
}

function displayList(student) {
  // clear the list
  document.querySelector("div.templatesgohere").innerHTML = "";

  // build a new list
  allstudents.forEach(displaystudents);

  countstudents();
}

function displaystudents(student) {
  const clone = document
    .querySelector("template.student")
    .content.cloneNode(true);

  // set clone data

  clone.querySelector(".firstname").textContent = student.firstname;
  clone.querySelector(".secondname").textContent = student.middlename;
  clone.querySelector(".lastname").textContent = student.lastname;
  clone.querySelector(".gender").textContent = student.gender;
  clone.querySelector(".house").textContent = student.house;
  clone.querySelector(".blood").textContent = student.bloodstatus;

  clone.querySelector(
    ".studentimage"
  ).src = `./images/${student.lastname.toLowerCase()}_${student.firstname
    .substring(0, 1)
    .toLowerCase()}.png`;

  if (student.lastname == "Finch-fletchley") {
    clone.querySelector(".studentimage").src = `./images/fletchley_j.png`;
  } else if (student.lastname == "Patil" && student.firstname == "Parvati") {
    clone.querySelector(".studentimage").src = `./images/patil_parvati.png`;
  } else if (student.lastname == "Patil" && student.firstname == "Padma") {
    clone.querySelector(".studentimage").src = `./images/patil_padma.png`;
  } else if (student.firstname == "Leanne" || student.firstname == "Mateusz") {
    clone.querySelector(".studentimage").src = `./images/default.png`;
  }

  clone.querySelector(".studentimage").alt =
    student.firstname + " " + student.lastname;

  clone.querySelector(".singlestudent").addEventListener("click", () => {
    console.log("click", student);
    modal.classList.remove("hide");
    document.querySelector("#modalcrest").alt = student.house;

    modal.querySelector("#firstnamemodal").textContent = student.firstname;
    modal.querySelector("#middlenamemodal").textContent = student.middlename;
    modal.querySelector("#lastnamemodal").textContent = student.lastname;
    modal.querySelector("#housemodal").textContent = student.house;
    modal.querySelector("#studentgendermodal").textContent = student.gender;

    // Placeholder for calculating blood status
    // let bloodarray = ["pureblood", "halfblood", "muggle"];
    // student.bloodstatus =
    //   bloodarray[Math.floor(Math.random() * bloodarray.length)];
    // modal.querySelector("#bloodstatusmodal").textContent = student.bloodstatus;

    modal.querySelector(
      "#imagemodal"
    ).src = `./images/${student.lastname.toLowerCase()}_${student.firstname
      .substring(0, 1)
      .toLowerCase()}.png`;

    if (student.lastname == "Finch-fletchley") {
      modal.querySelector("#imagemodal").src = `./images/fletchley_j.png`;
    } else if (student.lastname == "Patil" && student.firstname == "Parvati") {
      modal.querySelector("#imagemodal").src = `./images/patil_parvati.png`;
    } else if (student.lastname == "Patil" && student.firstname == "Padma") {
      modal.querySelector("#imagemodal").src = `./images/patil_padma.png`;
    } else if (
      student.firstname == "Leanne" ||
      student.firstname == "Mateusz"
    ) {
      modal.querySelector("#imagemodal").src = `./images/default.png`;
    }

    modal.querySelector("#imagemodal").alt =
      student.firstname + " " + student.lastname;

    if (student.house == "Ravenclaw") {
      document.querySelector("#modal-content").classList.remove("Hufflepuff");
      document.querySelector("#modal-content").classList.remove("Slytherin");
      document.querySelector("#modal-content").classList.remove("Gryffindor");
      document.querySelector("#modal-content").classList.add("Ravenclaw");
      document.querySelector(
        "#modalcrest"
      ).src = `./images/crests/Ravenclaw.webp`;
    } else if (student.house == "Hufflepuff") {
      document.querySelector("#modal-content").classList.remove("Gryffindor");
      document.querySelector("#modal-content").classList.remove("Ravenclaw");
      document.querySelector("#modal-content").classList.remove("Slytherin");
      document.querySelector("#modal-content").classList.add("Hufflepuff");
      document.querySelector(
        "#modalcrest"
      ).src = `./images/crests/Hufflepuff.webp`;
    } else if (student.house == "Gryffindor") {
      document.querySelector("#modal-content").classList.remove("Hufflepuff");
      document.querySelector("#modal-content").classList.remove("Ravenclaw");
      document.querySelector("#modal-content").classList.remove("Slytherin");
      document.querySelector("#modal-content").classList.add("Gryffindor");
      document.querySelector(
        "#modalcrest"
      ).src = `./images/crests/Gryffindor.webp`;
    } else if (student.house == "Slytherin") {
      document.querySelector("#modal-content").classList.remove("Hufflepuff");
      document.querySelector("#modal-content").classList.remove("Ravenclaw");
      document.querySelector("#modal-content").classList.remove("Gryffindor");
      document.querySelector("#modal-content").classList.add("Slytherin");
      document.querySelector(
        "#modalcrest"
      ).src = `./images/crests/Slytherin.webp`;
    }
  });

  document.querySelector(".templatesgohere").appendChild(clone);

  const closemodal = document.querySelector("#closemodal");
  closemodal.addEventListener("click", () => {
    document.querySelector(".modal-background").classList.add("hide");
  });
}

function countstudents() {
  let raven = allstudents.filter((student) => student.house === "Ravenclaw");
  let huff = allstudents.filter((student) => student.house === "Hufflepuff");
  let sly = allstudents.filter((student) => student.house === "Slytherin");
  let gryf = allstudents.filter((student) => student.house === "Gryffindor");
  let expelled = allstudents.filter((student) => student.expelled === true);

  document.querySelector(
    "#all"
  ).innerHTML = `Students in total: ${allstudents.length}`;
  document.querySelector("#raven").innerHTML = `Ravenclaw: ${raven.length}`;
  document.querySelector("#huff").innerHTML = `Hufflepuff: ${huff.length}`;
  document.querySelector("#gryf").innerHTML = `Gryffindor: ${gryf.length}`;
  document.querySelector("#sly").innerHTML = `Slytherin: ${sly.length}`;
  document.querySelector(
    "#expelled"
  ).innerHTML = `Expelled: ${expelled.length}`;
}

function filterRavenclaw() {
  document.querySelector("div.templatesgohere").innerHTML = "";
  let raven = allstudents.filter((student) => student.house === "Ravenclaw");
  raven.forEach(displaystudents);
}

function filterHufflepuff() {
  document.querySelector("div.templatesgohere").innerHTML = "";
  let raven = allstudents.filter((student) => student.house === "Hufflepuff");
  raven.forEach(displaystudents);
}

function filterSlytherin() {
  document.querySelector("div.templatesgohere").innerHTML = "";
  let raven = allstudents.filter((student) => student.house === "Slytherin");
  raven.forEach(displaystudents);
}

function filterGryffindor() {
  document.querySelector("div.templatesgohere").innerHTML = "";
  let raven = allstudents.filter((student) => student.house === "Gryffindor");
  raven.forEach(displaystudents);
}

function filterExpelled() {
  document.querySelector("div.templatesgohere").innerHTML = "";
  let raven = allstudents.filter((student) => student.expelled === true);
  raven.forEach(displaystudents);
}

function compareNameascending(a, b) {
  if (a.firstname < b.firstname) {
    return -1;
  } else {
    return 1;
  }
}

function compareNamedescending(a, b) {
  if (a.firstname > b.firstname) {
    return -1;
  } else {
    return 1;
  }
}

function comparelastNameascending(a, b) {
  if (a.lastname < b.lastname) {
    return -1;
  } else {
    return 1;
  }
}

function comparelastNamedescending(a, b) {
  if (a.lastname > b.lastname) {
    return -1;
  } else {
    return 1;
  }
}

function sortfirstname() {
  if (document.querySelector("button#filterRavenclaw").className == "active") {
    document.querySelector("div.templatesgohere").innerHTML = "";
    let raven = allstudents.filter((student) => student.house === "Ravenclaw");
    if (counter === 1) {
      raven.sort(compareNameascending);
    } else if (counter === 2) {
      raven.sort(compareNamedescending);
      counter = 0;
    }
    raven.forEach(displaystudents);
  } else if (
    document.querySelector("button#filterHufflepuff").className == "active"
  ) {
    document.querySelector("div.templatesgohere").innerHTML = "";
    let huff = allstudents.filter((student) => student.house === "Hufflepuff");
    if (counter === 1) {
      huff.sort(compareNameascending);
    } else if (counter === 2) {
      huff.sort(compareNamedescending);
      counter = 0;
    }
    huff.forEach(displaystudents);
  } else if (
    document.querySelector("button#filterSlytherin").className == "active"
  ) {
    document.querySelector("div.templatesgohere").innerHTML = "";
    let sly = allstudents.filter((student) => student.house === "Slytherin");
    if (counter === 1) {
      sly.sort(compareNameascending);
    } else if (counter === 2) {
      sly.sort(compareNamedescending);
      counter = 0;
    }
    sly.forEach(displaystudents);
  } else if (
    document.querySelector("button#filterGryffindor").className == "active"
  ) {
    document.querySelector("div.templatesgohere").innerHTML = "";
    let gryf = allstudents.filter((student) => student.house === "Gryffindor");
    if (counter === 1) {
      gryf.sort(compareNameascending);
    } else if (counter === 2) {
      gryf.sort(compareNamedescending);
      counter = 0;
    }
    gryf.forEach(displaystudents);
  } else if (
    document.querySelector("button#filterExpelled").className == "active"
  ) {
    document.querySelector("div.templatesgohere").innerHTML = "";
    let expelled = allstudents.filter((student) => student.expelled === true);
    if (counter === 1) {
      expelled.sort(compareNameascending);
    } else if (counter === 2) {
      expelled.sort(compareNamedescending);
      counter = 0;
    }
    expelled.forEach(displaystudents);
  } else {
    document.querySelector("div.templatesgohere").innerHTML = "";
    if (counter === 1) {
      allstudents.sort(compareNameascending);
    } else if (counter === 2) {
      allstudents.sort(compareNamedescending);
      counter = 0;
    }
    allstudents.forEach(displaystudents);
  }
}

function sortlastname() {
  if (document.querySelector("button#filterRavenclaw").className == "active") {
    document.querySelector("div.templatesgohere").innerHTML = "";
    let raven = allstudents.filter((student) => student.house === "Ravenclaw");
    if (counter === 1) {
      raven.sort(comparelastNameascending);
    } else if (counter === 2) {
      raven.sort(comparelastNamedescending);
      counter = 0;
    }
    raven.forEach(displaystudents);
  } else if (
    document.querySelector("button#filterHufflepuff").className == "active"
  ) {
    document.querySelector("div.templatesgohere").innerHTML = "";
    let huff = allstudents.filter((student) => student.house === "Hufflepuff");
    if (counter === 1) {
      huff.sort(comparelastNameascending);
    } else if (counter === 2) {
      huff.sort(comparelastNamedescending);
      counter = 0;
    }
    huff.forEach(displaystudents);
  } else if (
    document.querySelector("button#filterSlytherin").className == "active"
  ) {
    document.querySelector("div.templatesgohere").innerHTML = "";
    let sly = allstudents.filter((student) => student.house === "Slytherin");
    if (counter === 1) {
      sly.sort(comparelastNameascending);
    } else if (counter === 2) {
      sly.sort(comparelastNamedescending);
      counter = 0;
    }
    sly.forEach(displaystudents);
  } else if (
    document.querySelector("button#filterGryffindor").className == "active"
  ) {
    document.querySelector("div.templatesgohere").innerHTML = "";
    let gryf = allstudents.filter((student) => student.house === "Gryffindor");
    if (counter === 1) {
      gryf.sort(comparelastNameascending);
    } else if (counter === 2) {
      gryf.sort(comparelastNamedescending);
      counter = 0;
    }
    gryf.forEach(displaystudents);
  } else if (
    document.querySelector("button#filterExpelled").className == "active"
  ) {
    document.querySelector("div.templatesgohere").innerHTML = "";
    let expelled = allstudents.filter((student) => student.expelled === true);
    if (counter === 1) {
      expelled.sort(comparelastNameascending);
    } else if (counter === 2) {
      expelled.sort(comparelastNamedescending);
      counter = 0;
    }
    expelled.forEach(displaystudents);
  } else {
    document.querySelector("div.templatesgohere").innerHTML = "";
    if (counter === 1) {
      allstudents.sort(comparelastNameascending);
    } else if (counter === 2) {
      allstudents.sort(comparelastNamedescending);
      counter = 0;
    }
    allstudents.forEach(displaystudents);
  }
}

let hackcounter = 0;
document.addEventListener("keydown", (event) => {
  if (event.keyCode === 13 && hackcounter === 0) {
    hackcounter += 1;
    hackTheSystem();
  } else {
  }
});

function hackTheSystem() {
  alert("System have been hacked!");

  let bloodarray = ["pureblood", "halfblood", "muggle"];
  allstudents.forEach(
    (student) =>
      (student.bloodstatus =
        bloodarray[Math.floor(Math.random() * bloodarray.length)])
  );

  const newstudent = Object.create(students);
  newstudent.firstname = "Mateusz";
  newstudent.middlename = "Krzysztof";
  newstudent.lastname = "Walowski";
  newstudent.house = "Gryffindor";
  newstudent.gender = "boy";
  newstudent.bloodstatus = "pure";
  newstudent.expelled = false;
  allstudents.unshift(newstudent);

  countstudents();

  document.querySelector("div.templatesgohere").innerHTML = "";

  allstudents.forEach(displaystudents);
}
