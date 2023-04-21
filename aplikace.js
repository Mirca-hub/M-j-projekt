const SEZNAM_POJISTENCU_KLIC = "seznamPojistencu"

class Aplikace {

    pridejPojistenceDoSeznamu(pojistenec) {
        const seznamPojistencu = this._nactiSeznamPojistencu()
        seznamPojistencu.push(pojistenec)
        this._ulozSeznamPojistencu(seznamPojistencu)
        this.vypisVsechnyPojistence(seznamPojistencu)
    }

    vymazPojistence(id) {
        const seznamPojistencu = this._nactiSeznamPojistencu()
        const seznamPojistencuBezSmazaneho = seznamPojistencu.filter(poj => poj.id !== id)
        this._ulozSeznamPojistencu(seznamPojistencuBezSmazaneho)
        this.vypisVsechnyPojistence(seznamPojistencuBezSmazaneho)
    }

    vypisVsechnyPojistence(seznamPojistencu) {
        if (!seznamPojistencu) {
            seznamPojistencu = this._nactiSeznamPojistencu()
        }
        const teloTabulky = document.getElementById("pojistenci")
        let pojistenciHtml = "";
        for (const pojistenec of seznamPojistencu) {
            pojistenciHtml += this._prevedPojistenceNaRadekTabulky(pojistenec)
        }
        teloTabulky.innerHTML = pojistenciHtml

    }

    _nactiSeznamPojistencu() {
        const seznamPojistencuJson = localStorage.getItem(SEZNAM_POJISTENCU_KLIC) || "[]"
        return JSON.parse(seznamPojistencuJson)
    }

    _ulozSeznamPojistencu(seznamPojistencu) {
        localStorage.setItem(SEZNAM_POJISTENCU_KLIC, JSON.stringify(seznamPojistencu))
    }

    _prevedPojistenceNaRadekTabulky(pojistenec) {
        return `<tr>
        <td>${pojistenec.ikona ? pojistenec.ikona : ""} ${pojistenec.jmeno} ${pojistenec.prijmeni}</td>
        <td>${pojistenec.pohlavi}</td>
        <td>${pojistenec.telefon ? pojistenec.telefon : "není"}</td>
        <td>${pojistenec.vek}</td>
        <td class="vpravo">
            <button onclick="smazPojistence(${pojistenec.id})" class="tlacitko-smazat">+</button>
            </td>
      </tr>`
    }
}

