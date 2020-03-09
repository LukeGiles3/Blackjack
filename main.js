function getNewDeck() {
    return new Promise((resolve, reject) => {
      fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(response => {
          return response.json();
        })
        .then(deck => {
          resolve(deck);
        });
    });
  }
  
  const newDeckPromise = getNewDeck();
  
  newDeckPromise.then(deck => {
    const cardsPromise = getCards(deck.deck_id, 4);
  
    cardsPromise.then(cards => {
      displayCards('player1', cards.slice(0, 2));
      displayCards('player2', cards.slice(2, 4));
    });
  });
  
  function getCards(deckId, cardCount) {
    return new Promise((resolve, reject) => {
      fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${cardCount}`
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          resolve(data.cards);
        });
    });
  }
  
  function displayCards(playerId, cards) {
    const playerDivElm = document.getElementById(playerId);
  
    cards.forEach(card => {
      playerDivElm.innerHTML += `<img style="max-height: 200px" src="${card.image}">`;
    });
  }
  
  function getCard(playerId) {
    const getCardPromise = newDeckPromise.then(deck => getCards(deck.deck_id, 1));
  
    getCardPromise.then(cards => displayCards(playerId, cards));
  }