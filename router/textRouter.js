const express = require('express');
const router = express.Router();



// c'est ici qu'il faut developper l'API se referer à la doc 
/**
 * 
 * @param texte Chaine de caracteres.
 * @returns Un tableau trié qui contient le nombre d'apparitions de chaque caractere.
 */
function char_counter(texte){
    var char = {};
    char["total"] = texte.length;
     char["total"] = texte.length;
     for(let i = 0; i < char["total"]; i++){
         let x = texte[i];
         if(x == " "){
             x = "space";
         }
         if(char[x]){
             char[x]++;
         }
         else{
             char[x] = 1;
         }
    } 
    let select = Object.keys(char).sort();
    let array = {};
    if (char["total"]){
        array["total"] = char ["total"];
    }
    for(let i=0; i < select.length; i++){

        if (select[i] != "total" && select[i] != "space"){
            array[select[i]] = char[select[i]];
        }
    }
    if (char["space"]){
        array["space]"] = char["space"];
    }
    return array;
}

/**
 * 
 * @param texte Chaine de caracteres.
 * @returns Total de phrases.
 */
function sent_counter(texte) {
    let signs = [".", "!", "?"];
    let total = 0;

    if (texte.length > 0) {
        total++;
    }
    for (let i = 0; i < texte.length; i++) {
        if (signs.includes(texte[i])) {
            total++;
        }
    }
    return {"total": total};
}

router.get("/characters/count", (req,res) => {
    
    let texte = req.body.text || req.query.text;
    res.status(200).send(JSON.stringify(char_counter(texte)));
});

router.get("/sentences/count", (req,res) => {
    let texte = req.body.text || req.query.text;
    res.status(200).send(JSON.stringify(sent_counter(texte)));
});


module.exports = router;
