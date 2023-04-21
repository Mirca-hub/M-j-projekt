/* 
const miroslav = new Pojistenec("Miroslav", "Dvořák", new Date(1973, 10, 25), "123456789", "muž");
const miroslava = new Pojistenec("Miroslava", "Dvořáková", new Date(2000, 3, 27), "987654321", "žena");
const robert = new Pojistenec("Robert", "Dominguez", new Date(1991, 10, 23), "987123546", "muž");
*/

const Pohlavi = {
    MUZ: "muž",
    ZENA: "žena",
}

const Idcka = {
    DATUM_NAROZENI: "inputDatumNarozeni",
    POHLAVI_MUZ: "pohlavi-muz",
    POHLAVI_ZENA: "pohlavi-zena",
    FORMULAR: "formular",
    HLAVA: "hlava",
}

const AktualniPojistenec = {
    pohlavi: Pohlavi.MUZ,
    vek: null
}

const DEFAULTNI_DATUM_NAROZENI = "2000-01-01"

const aplikace = new Aplikace()

aplikace.vypisVsechnyPojistence();

const hlavaSpan = document.getElementById(Idcka.HLAVA);
const inputDatumNarozeni = document.getElementById(Idcka.DATUM_NAROZENI);
inputDatumNarozeni.max = new Date().toISOString().split("T")[0];
const formular = document.getElementById(Idcka.FORMULAR);
formular.addEventListener("submit", potvrdFormular);
const pohlaviMuzInput = document.getElementById(Idcka.POHLAVI_MUZ);
const pohlaviZenaInput = document.getElementById(Idcka.POHLAVI_ZENA);
pohlaviMuzInput.addEventListener("change", zmenHlavu);
pohlaviZenaInput.addEventListener("change", zmenHlavu);
inputDatumNarozeni.addEventListener("change", zmenHlavu);


function zmenHlavu(udalost) {
    if (udalost.target.id !== Idcka.DATUM_NAROZENI && !(AktualniPojistenec.vek >= 0)) {
        return nastavIkonuHlavy()
    }
    if (udalost.target.id === Idcka.DATUM_NAROZENI) {
        const datumNarozeni = new Date(udalost.target.value)
        AktualniPojistenec.vek = vratVek(datumNarozeni)
    }
    if (udalost.target.id === Idcka.POHLAVI_MUZ) {
        AktualniPojistenec.pohlavi = udalost.target.checked ? Pohlavi.MUZ : Pohlavi.ZENA
    }
    if (udalost.target.id === Idcka.POHLAVI_ZENA) {
        AktualniPojistenec.pohlavi = udalost.target.checked ? Pohlavi.ZENA : Pohlavi.MUZ
    }
    nastavIkonuHlavy(AktualniPojistenec.vek, AktualniPojistenec.pohlavi)
}

function nastavIkonuHlavy(vek, pohlavi) {
    hlavaSpan.style.border = pohlavi === Pohlavi.MUZ ? "2px solid #9eeaf9" : "2px solid #feaad4"
    hlavaSpan.style.backgroundColor = pohlavi === Pohlavi.MUZ ? "#cff4fc" : "#f6dde9"
    return hlavaSpan.innerHTML = vyberIkonuHlavy(vek, pohlavi)
}

function vyberIkonuHlavy(vek, pohlavi) {
    if (vek >= 0 && vek < 4) {
        return "&#128118;"
    }
    if (vek >= 4 && vek < 15) {
        return "&#129490;"
    }
    if (vek >= 15 && vek < 25) {
        return pohlavi === Pohlavi.MUZ ? "&#128102;" : "&#128103;"
    }
    if (vek >= 25 && vek < 45) {
        return pohlavi === Pohlavi.MUZ ? "&#128104;" : "&#128105;"
    }
    if (vek >= 45) {
        return pohlavi === Pohlavi.MUZ ? "&#128116;" : "&#128117;"
    }
    return "&#129458;"
}

function resetujIkonuHlavy(){
    hlavaSpan.innerHTML = "&#129458;"
    hlavaSpan.style.border = "2px solid #b7b7b7"
    hlavaSpan.style.backgroundColor = "#f3eeee"
    AktualniPojistenec.pohlavi = Pohlavi.MUZ
    AktualniPojistenec.vek = null
}


function vratVek(datumNarozeni) {
    const ted = Date.now()
    const vekVMs = ted - datumNarozeni.getTime()
    const vekJakoDatum = new Date(vekVMs);
    return Math.abs(vekJakoDatum.getUTCFullYear() - 1970);
}

function potvrdFormular(udalost) {
    udalost.preventDefault()
    const jmeno = udalost.target[0].value
    const prijmeni = udalost.target[1].value
    const telefon = udalost.target[2].value
    const datumNarozeni = new Date(udalost.target[3].value)
    const vek = vratVek(datumNarozeni)
    const muz = udalost.target[4].checked
    const zena = udalost.target[5].checked
    const pohlavi = muz ? Pohlavi.MUZ : zena ? Pohlavi.ZENA : ""
    const ikona = vyberIkonuHlavy(vek, pohlavi)

    const novyPojistenec = new Pojistenec(jmeno, prijmeni, vek, telefon, pohlavi, ikona);
    aplikace.pridejPojistenceDoSeznamu(novyPojistenec)
    resetujIkonuHlavy()
    udalost.target.reset()
}

function smazPojistence(id) {
    aplikace.vymazPojistence(id)
}