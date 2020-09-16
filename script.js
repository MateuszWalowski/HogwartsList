"use strict";

window.addEventListener("DOMContentLoaded", start);

let counter = 0

document.querySelector("button#sortfirstname").onclick = function () {
    counter += 1;

}
document.querySelector("button#sortlastname").onclick = function () {
    counter += 1;

}

let allstudents = []

let students = {
    firstname: "",
    middlename: "",
    lastname: "",
    house: "",
    studentgender: "",
    expelled: false
};

function start() {

    document.querySelectorAll(".filtering button").forEach(button => {
        button.addEventListener('click', function () {
            chooseactivebutton(button)
            return button
        })
    }, );

    function chooseactivebutton(button) {
        document.querySelectorAll("button").forEach(button => {
            button.classList.remove("active")
        }, );
        button.classList.add("active")
    }



    document.querySelector("button#sortfirstname").addEventListener("click", sortfirstname)

    document.querySelector("button#sortlastname").addEventListener("click", sortlastname)


    document.querySelector("button#filterall").addEventListener("click", loadJSON)
    document.querySelector("button#filterRavenclaw").addEventListener("click", filterRavenclaw)
    document.querySelector("button#filterHufflepuff").addEventListener("click", filterHufflepuff)
    document.querySelector("button#filterSlytherin").addEventListener("click", filterSlytherin)
    document.querySelector("button#filterGryffindor").addEventListener("click", filterGryffindor)
    document.querySelector("button#filterExpelled").addEventListener("click", filterExpelled)
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

    // console.log(newstudent)
    allstudents.push(newstudent)
    // console.log(allstudents)
    return newstudent
}

function displayList(student) {
    // clear the list
    document.querySelector("div.templatesgohere").innerHTML = "";

    // build a new list
    student.forEach(displaystudents);

    countstudents()
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


function countstudents() {



    let raven = allstudents.filter(student => student.house === "Ravenclaw")
    let huff = allstudents.filter(student => student.house === "Hufflepuff")
    let gryf = allstudents.filter(student => student.house === "Slytherin")
    let sly = allstudents.filter(student => student.house === "Gryffindor")
    let expelled = allstudents.filter(student => student.expelled === true)

    document.querySelector("#all").innerHTML = `Students in total: ${allstudents.length}`
    document.querySelector("#raven").innerHTML = `Ravenclaw students: ${raven.length}`
    document.querySelector("#huff").innerHTML = `Hufflepuff students: ${huff.length}`
    document.querySelector("#gryf").innerHTML = `Gryffindor students: ${gryf.length}`
    document.querySelector("#sly").innerHTML = `Slytherin students: ${sly.length}`
    document.querySelector("#expelled").innerHTML = `Expelled students: ${expelled.length}`


}


function filterRavenclaw() {

    document.querySelector("div.templatesgohere").innerHTML = "";
    let raven = allstudents.filter(student => student.house === "Ravenclaw")
    raven.forEach(displaystudents);
}

function filterHufflepuff() {

    document.querySelector("div.templatesgohere").innerHTML = "";
    let raven = allstudents.filter(student => student.house === "Hufflepuff")
    raven.forEach(displaystudents);
}

function filterSlytherin() {

    document.querySelector("div.templatesgohere").innerHTML = "";
    let raven = allstudents.filter(student => student.house === "Slytherin")
    raven.forEach(displaystudents);
}

function filterGryffindor() {

    document.querySelector("div.templatesgohere").innerHTML = "";
    let raven = allstudents.filter(student => student.house === "Gryffindor")
    raven.forEach(displaystudents);
}


function filterExpelled() {

    document.querySelector("div.templatesgohere").innerHTML = "";
    let raven = allstudents.filter(student => student.expelled === true)
    raven.forEach(displaystudents);
}



function compareNameascending(a, b) {
    if (a.firstname < b.firstname) {
        return -1
    } else {
        return 1
    }
}

function compareNamedescending(a, b) {
    if (a.firstname > b.firstname) {
        return -1
    } else {
        return 1
    }
}


function comparelastNameascending(a, b) {
    if (a.lastname < b.lastname) {
        return -1
    } else {
        return 1
    }
}

function comparelastNamedescending(a, b) {
    if (a.lastname > b.lastname) {
        return -1
    } else {
        return 1
    }
}




function sortfirstname() {


    if (document.querySelector("button#filterRavenclaw").className == "active") {
        document.querySelector("div.templatesgohere").innerHTML = "";
        let raven = allstudents.filter(student => student.house === "Ravenclaw")
        if (counter === 1) {
            raven.sort(compareNameascending)
        } else if (counter === 2) {
            raven.sort(compareNamedescending)
            counter = 0
        }
        raven.forEach(displaystudents);
    } else if (document.querySelector("button#filterHufflepuff").className == "active") {
        document.querySelector("div.templatesgohere").innerHTML = "";
        let huff = allstudents.filter(student => student.house === "Hufflepuff")
        if (counter === 1) {
            huff.sort(compareNameascending)
        } else if (counter === 2) {
            huff.sort(compareNamedescending)
            counter = 0
        }
        huff.forEach(displaystudents);
    } else if (document.querySelector("button#filterSlytherin").className == "active") {
        document.querySelector("div.templatesgohere").innerHTML = "";
        let sly = allstudents.filter(student => student.house === "Slytherin")
        if (counter === 1) {
            sly.sort(compareNameascending)
        } else if (counter === 2) {
            sly.sort(compareNamedescending)
            counter = 0
        }
        sly.forEach(displaystudents);
    } else if (document.querySelector("button#filterGryffindor").className == "active") {
        document.querySelector("div.templatesgohere").innerHTML = "";
        let gryf = allstudents.filter(student => student.house === "Gryffindor")
        if (counter === 1) {
            gryf.sort(compareNameascending)
        } else if (counter === 2) {
            gryf.sort(compareNamedescending)
            counter = 0
        }
        gryf.forEach(displaystudents);
    } else if (document.querySelector("button#filterExpelled").className == "active") {
        document.querySelector("div.templatesgohere").innerHTML = "";
        let expelled = allstudents.filter(student => student.expelled === true)
        if (counter === 1) {
            expelled.sort(compareNameascending)
        } else if (counter === 2) {
            expelled.sort(compareNamedescending)
            counter = 0
        }
        expelled.forEach(displaystudents);
    } else {
        document.querySelector("div.templatesgohere").innerHTML = "";
        if (counter === 1) {
            allstudents.sort(compareNameascending)
        } else if (counter === 2) {
            allstudents.sort(compareNamedescending)
            counter = 0
        }
        allstudents.forEach(displaystudents);
    }



}

function sortlastname() {
    if (document.querySelector("button#filterRavenclaw").className == "active") {
        document.querySelector("div.templatesgohere").innerHTML = "";
        let raven = allstudents.filter(student => student.house === "Ravenclaw")
        if (counter === 1) {
            raven.sort(comparelastNameascending)
        } else if (counter === 2) {
            raven.sort(comparelastNamedescending)
            counter = 0
        }
        raven.forEach(displaystudents);
    } else if (document.querySelector("button#filterHufflepuff").className == "active") {
        document.querySelector("div.templatesgohere").innerHTML = "";
        let huff = allstudents.filter(student => student.house === "Hufflepuff")
        if (counter === 1) {
            huff.sort(comparelastNameascending)
        } else if (counter === 2) {
            huff.sort(comparelastNamedescending)
            counter = 0
        }
        huff.forEach(displaystudents);
    } else if (document.querySelector("button#filterSlytherin").className == "active") {
        document.querySelector("div.templatesgohere").innerHTML = "";
        let sly = allstudents.filter(student => student.house === "Slytherin")
        if (counter === 1) {
            sly.sort(comparelastNameascending)
        } else if (counter === 2) {
            sly.sort(comparelastNamedescending)
            counter = 0
        }
        sly.forEach(displaystudents);
    } else if (document.querySelector("button#filterGryffindor").className == "active") {
        document.querySelector("div.templatesgohere").innerHTML = "";
        let gryf = allstudents.filter(student => student.house === "Gryffindor")
        if (counter === 1) {
            gryf.sort(comparelastNameascending)
        } else if (counter === 2) {
            gryf.sort(comparelastNamedescending)
            counter = 0
        }
        gryf.forEach(displaystudents);
    } else if (document.querySelector("button#filterExpelled").className == "active") {
        document.querySelector("div.templatesgohere").innerHTML = "";
        let expelled = allstudents.filter(student => student.expelled === true)
        if (counter === 1) {
            expelled.sort(comparelastNameascending)
        } else if (counter === 2) {
            expelled.sort(comparelastNamedescending)
            counter = 0
        }
        expelled.forEach(displaystudents);
    } else {
        document.querySelector("div.templatesgohere").innerHTML = "";
        if (counter === 1) {
            allstudents.sort(comparelastNameascending)
        } else if (counter === 2) {
            allstudents.sort(comparelastNamedescending)
            counter = 0
        }
        allstudents.forEach(displaystudents);
    }



}