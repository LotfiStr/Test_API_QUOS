const express = require('express');
const router = express.Router();



// c'est ici qu'il faut developper l'API se referer à la doc 
/**
 * 
 * @param texte Chaine de caracteres.
 * @returns Un tableau trié qui contient le nombre d'apparitions de chaque caractere.
 */
function compte_caracteres(texte){
    let caracteres = {};
    caracteres["total"] = texte.length;
    for(let i = 0; i < caracteres["total"]; i++){
        let lettre = texte[i];
        if(lettre == " "){
            lettre = "space";
        }
        if(caracteres[lettre]){
            caracteres[lettre]++;
        }
        else{
            caracteres[lettre] = 1;
        }
    }
    let trie = Object.keys(caracteres).sort();
    let newArray = {};
    if (caracteres["total"]) {
        newArray["total"] = caracteres["total"];
    }
    for (let i = 0; i < trie.length; i++) {
        if (trie[i] != "total" && trie[i] != "space") {
            newArray[trie[i]] = caracteres[trie[i]];
        }
    }
    if (caracteres["space"]) {
        newArray["space"] = caracteres["space"];
    }

    return newArray;
}

/**
 * 
 * @param texte Chaine de caracteres.
 * @returns Total de phrases.
 */
function compte_phrases(texte) {
    let ponctuation = [".", "!", "?"];
    let total = 0;

    if (texte.length > 0) {
        total++;
    }
    for (let i = 0; i < texte.length; i++) {
        if (ponctuation.includes(texte[i])) {
            total++;
        }
    }
    return {"total": total};
}

router.get("/characters/count", (req,res) => {
    
    let texte = req.body.text || req.query.text;
    res.status(200).send(JSON.stringify(compte_caracteres(texte)));
});

router.get("/sentences/count", (req,res) => {
    let texte = req.body.text || req.query.text;
    res.status(200).send(JSON.stringify(compte_phrases(texte)));
});


module.exports = router;
