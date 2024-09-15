function startGame() {
    const select = document.getElementById("playerSelect");
    const numberOfPlayers = select.value;
    if (numberOfPlayers === '2' || numberOfPlayers === '3' || numberOfPlayers === '4') {
        localStorage.setItem("numberOfPlayers", numberOfPlayers);
        window.location.assign(`main.html`);
    }
}
