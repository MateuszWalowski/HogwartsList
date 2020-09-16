"use strict";

window.addEventListener("DOMContentLoaded", start);


let allstudents = []

let students = {
    firstname: "",
    middlename: "",
    lastname: "",
    house: "",
    studentgender: ""
};

function start() {


    // document.querySelector("button#sortfirstname").addEventListener("click", sortfirstname)
    // document.querySelector("button#sortsecondname").addEventListener("click", sortsecondname)
    // document.querySelector("button#sortlastname").addEventListener("click", sortlastname)
    // document.querySelector("button#sortgender").addEventListener("click", sortgender);
    // document.querySelector("button#sorthouse").addEventListener("click", sorthouse);

    // document.querySelector("button#filterall").addEventListener("click", showall)
    // document.querySelector("button#filterRavenclaw").addEventListener("click", filterdogs)
    // document.querySelector("button#filterHufflepuff").addEventListener("click", loadJSON)
    // document.querySelector("button#filterSlytherin").addEventListener("click", loadJSON)
    // document.querySelector("button#filterGryffindor").addEventListener("click", loadJSON)
    // document.querySelector("button#filterBoys").addEventListener("click", loadJSON)
    // document.querySelector("button#filterGirls").addEventListener("click", loadJSON)
    // document.querySelector("button#filterExpelled").addEventListener("click", loadJSON)
    loadJSON()
}





function loadJSON() {
    fetch("https://petlatkea.dk/2020/hogwarts/students.json")
        .then(response => response.json())
        .then(jsonData => {
            prepareObjects(jsonData);
        });
}

function prepareObjects(jsonData) {
    allstudents = jsonData.map(preapareObject);

    displayList(allstudents);
}


function preapareObject(jsonObject) {

    const newstudent = Object.create(students)

    let trimming = jsonObject.fullname.trim()
    let breaking = trimming.split(" ")
    let house = jsonObject.house
    let housetrim = house.trim()
    let uppercasefirstletterofhouse = housetrim.charAt(0).toUpperCase();
    let lowecaserestofhouse = housetrim.slice(1).toLowerCase();
    let housefixed = uppercasefirstletterofhouse + lowecaserestofhouse



    if (breaking.length == 1) {
        let uppercasefirstletteroffirstname = breaking[0].charAt(0).toUpperCase();
        let lowecaserestofthefirstname = breaking[0].slice(1).toLowerCase();
        let fixedfirstname = uppercasefirstletteroffirstname + lowecaserestofthefirstname;
        newstudent.firstname = fixedfirstname;
        newstudent.gender = jsonObject.gender;
        newstudent.house = housefixed

    } else if (breaking.length == 2) {
        let uppercasefirstletteroffirstname = breaking[0].charAt(0).toUpperCase();
        let lowecaserestofthefirstname = breaking[0].slice(1).toLowerCase();
        let fixedfirstname = uppercasefirstletteroffirstname + lowecaserestofthefirstname;
        // console.log(fixedfirstname)
        let uppercasefirstletteroflastname = breaking[1].charAt(0).toUpperCase();
        let lowecaserestofthelastname = breaking[1].slice(1).toLowerCase();
        let fixedlastname = uppercasefirstletteroflastname + lowecaserestofthelastname;
        // console.log(fixedlastname)
        newstudent.firstname = fixedfirstname;
        newstudent.lastname = fixedlastname;
        newstudent.gender = jsonObject.gender;
        newstudent.house = housefixed

    } else if (breaking.length == 3) {
        let uppercasefirstletteroffirstname = breaking[0].charAt(0).toUpperCase();
        let lowecaserestofthefirstname = breaking[0].slice(1).toLowerCase();
        let fixedfirstname = uppercasefirstletteroffirstname + lowecaserestofthefirstname;
        // console.log(fixedfirstname)
        let uppercasefirstletterofmiddlename = breaking[1].charAt(0).toUpperCase();
        let lowecaserestoofmiddlename = breaking[1].slice(1).toLowerCase();
        let fixedmiddlename = uppercasefirstletterofmiddlename + lowecaserestoofmiddlename;
        // console.log(fixedmiddlename)
        let uppercasefirstletteroflastname = breaking[2].charAt(0).toUpperCase();
        let lowecaserestofthelastname = breaking[2].slice(1).toLowerCase();
        let fixedlastname = uppercasefirstletteroflastname + lowecaserestofthelastname;
        // console.log(fixedlastname)
        newstudent.firstname = fixedfirstname;
        newstudent.middlename = fixedmiddlename;
        newstudent.lastname = fixedlastname;
        newstudent.gender = jsonObject.gender;
        newstudent.house = housefixed
    }

    console.log(newstudent)
    allstudents.push(newstudent)
    // console.log(allstudents)
    return newstudent
}

function displayList(student) {
    // clear the list
    document.querySelector("div.templatesgohere").innerHTML = "";

    // build a new list
    student.forEach(displaystudents);
}


function displaystudents(student) {


    const clone = document.querySelector("template.student").content.cloneNode(true);

    // set clone data

    clone.querySelector(".firstname").textContent = student.firstname;
    clone.querySelector(".secondname").textContent = student.middlename;
    clone.querySelector(".lastname").textContent = student.lastname;
    clone.querySelector(".gender").textContent = student.gender;
    clone.querySelector(".house").textContent = student.house;

    clone.querySelector(".studentimage").src = `./images/${student.lastname.toLowerCase()}_${student.firstname.substring(0,1).toLowerCase()}.png`;

    if (student.lastname == "Finch-fletchley") {
        clone.querySelector(".studentimage").src = `./images/fletchley_j.png`
    } else if (student.lastname == "Patil" && student.firstname == "Parvati") {
        clone.querySelector(".studentimage").src = `./images/patil_parvati.png`

    } else if (student.lastname == "Patil" && student.firstname == "Padma") {
        clone.querySelector(".studentimage").src = `./images/patil_padma.png`


    } else if (student.firstname == "Leanne") {
        clone.querySelector(".studentimage").src = `./images/default.png`

    }

    document.querySelector(".templatesgohere").appendChild(clone);


}