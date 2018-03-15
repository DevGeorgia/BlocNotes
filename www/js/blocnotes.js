

function init() {
    $("#btCreer").click(creerFichier);
    $("#btOuvrir").click(listerFichier);
    $("#btAjouter").click(ajouterFichier);
    $("#btSupprimer").click(supprFichier);
    $("#btConfOuvrir").click(ouvrirFichier);
}

function listerFichier() {

    // Vide l'élément select afin de refresh la liste d'options
    $('#selection').html("");

    // Affiche la liste déroulante de toutes les notes
    $('#liste').show();
    // Masque l'élément div comment
    $('#comment').hide();

    // Boucle sur les clés du tableau localStorage
    for (var i = 0; i < localStorage.length; i++) {
        var cle = localStorage.key(i);
        var liste = document.getElementById("selection");
        var option = document.createElement("option");
        option.value = cle;
        option.text = cle;

        liste.add(option);
    }

}

function creerFichier() {

    // Affiche l'élément div note si masqué
    $('#note').show();
    //Cache l'élément liste
    $('#liste').hide();
    // Vide l'élément div commentaire
    $('#comment').html("");
    // Vide le nom du fichier = grâce à son id nameFile
    $('#nameFile').val("");
    // Vide le contenu du fichier = grâce à son id contentFile
    $('#contentFile').val("");

}

function ajouterFichier() {

    // Lorsque l'utilisateur clique sur Enregistrer :


    // Vide l'élément div commentaire
    $('#comment').html("");

    // Définit 3 variables : nom du fichier saisi, texte saisi, clé présente dans le localStorage
    var lsFile = $('#nameFile').val();
    var lsContent = $('#contentFile').val();
    var lsKey = localStorage.getItem(lsFile);

    // Condition si le nom du fichier a bien été saisi
    if (lsFile !== "") {
        // Condition si la clé existe déjà dans le localStorage
        if (lsKey !== null) {

            // Si la clé existe déjà dans le localStorage, demande confirmation d'écraser les données
            var resultat = confirm("Le fichier existe déjà, voulez-vous l'écraser ?");

            // Si l'utilisateur confirme qu'il souhaite écraser les données du fichier dans le localStorage
            if (resultat) {
                var lsFile = $('#nameFile').val();
                localStorage.setItem(lsFile, lsContent);
                $('#comment').html("Note modifiée.");
            }
            // Si l'utilisateur refuse d'écraser les données du localStorage
            else {
                $('#comment').html("Note inchangée.");
            }
        }
        // Si la clé n'existe pas dans le localStorage, ajoute une nouvelle clé dans le localStorage
        else {
            localStorage.setItem(lsFile, lsContent);
            $('#comment').html("Nouvelle note enregistrée.");
        }
    }
    // Si aucun nom de fichier n'a été entré
    else {
        $('#comment').html("Veuillez entrer un nom de fichier.");
    }
    $('#liste').hide();
    $('#comment').show();


}


function ouvrirFichier() {

    // Masque l'élément div comment
    $('#comment').hide();

    var select = document.getElementById("selection");
    var idfichier = select.options[select.selectedIndex].value;

    $('#nameFile').val(idfichier);
    $('#contentFile').val(localStorage.getItem(idfichier));
}

function supprFichier() {



    var lsFile = $('#nameFile').val();

    // Condition si le nom du fichier a bien été saisi
    if (lsFile !== "") {

        // Demande confirmation de supprimer la note (key+value) du localStorage
        var alerte = confirm("Voulez-vous supprimer cette note ?");

        // Si l'utilisateur confirme la suppression
        if (alerte) {
            var lsFile = $('#nameFile').val();
            var lsContent = $('#contentFile').val();
            // Supprime la clé et la valeur sélectionnée du localStorage
            localStorage.removeItem(lsFile, lsContent);
            $('#comment').html("Note supprimée.");
        }

        // Si l'utilisateur annule la suppression des données
        else {
            $('#comment').html("La note n'a pas été supprimée.");
        }
    }
    // Si l'utilisateur n'a pas saisi de nom de fichier
    else {
        $('#comment').html("Veuillez sélectionner un fichier.");
    }
    $('#liste').hide();
    $('#comment').show();


}

$(document).ready(init);

