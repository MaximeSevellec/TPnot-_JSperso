<!DOCTYPE html>
<html>
<head>
    <title>Ma page PHP</title>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./static/css/index.css">
  <title>Gestion des personnages</title>
</head>
<header>
    <h1>Gestion des personnages</h1>
</header>
<body>
  <main>
    <input type="text" id="search" placeholder="Rechercher...">
    <button id="fav">Favoris</button>
    <div id="character-list"></div>
    <div id="pagination"></div>

    <script type="module" src="./static/js/Character.js"></script>
    <script type="module" src="./static/js/CharacterService.js"></script>
    <script type="module" src="./static/js/NotesService.js"></script>
    <script type="module" src="./static/js/Pagination.js"></script>
    <script type="module" src="./static/js/Main.js"></script>
</body>
<footer>
    <p>© 2024 Gestion des personnages</p>
</footer>
</html>


