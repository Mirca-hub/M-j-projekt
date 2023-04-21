class Pojistenec {
    constructor(jmeno, prijmeni, vek, telefon, pohlavi, ikona) {
        this.id = Date.now()
        this.jmeno = jmeno
        this.prijmeni = prijmeni
        this.vek = vek
        this.telefon = telefon
        this.pohlavi = pohlavi
        this.ikona = ikona
    }

    toString() {
        return `${this.jmeno} ${this.prijmeni}, je starý ${this.vek} ${this._vyzklonujRok(this.vek)} a je to ${this.pohlavi}.`
    }

    _vyzklonujRok(pocetLet) {
        if (pocetLet <= 1) {
            return "rok";
        } else if (pocetLet >= 2 && pocetLet <= 4) {
            return "roky"
        } else {
            return "let"
        }
    }
}


