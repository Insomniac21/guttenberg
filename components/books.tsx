import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Grid, Text, Input, Button, Checkbox, Loading, Spacer } from '@nextui-org/react';
import Star from './star';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase.config';
import MustSigninPopOver from './mustSignInPopOver';


export default function Books() {
  const [user, loading] = useAuthState(auth);
  const [ books , setBooks ] = useState([]);
  const [ isBookLoading, setIsBookLoading ] = useState(false);
  const [ isNextBookLoading, setIsNextBookLoading ] = useState(false);
  const [ showFavoriteBooksOnly, setShowFavoriteBooksOnly ] = useState(false);
  const [ myFavoriteBooks, setMyFavoriteBooks ] = useState([]);
  const [ searchText, setSearchText ] = useState('');
  const [ next, setNext ] = useState(null);

  const handleSearchInputKeyPress = (e) => {
    if (e.key !== 'Enter' || showFavoriteBooksOnly) return;
    load();
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleAddButtonClick = (book) => {
    if (isBookInFavorite(book)) {
      removeFromFavorite(book);
      setMyFavoriteBooks((prevState) => prevState.filter((favoriteBook) => favoriteBook.id !== book.id));
      setBooks((prevState) => prevState.filter((favoriteBook) => favoriteBook.id !== book.id));
    } else {
      addToFavorite(book);
      setMyFavoriteBooks((prevState) => [ ...prevState, book ]);
    } 
  };

  const handleShowFavoriteBooksOnly = () => {
    setShowFavoriteBooksOnly(!showFavoriteBooksOnly);
    if (!showFavoriteBooksOnly)
      setBooks(myFavoriteBooks);
    else
      load();
  };

  useEffect(() => {
    if (user)
      loadFavorites();
    load();
  }, []);
  
  async function load() {
    setIsBookLoading(true);
    const res = await fetch('https://gutendex.com/books?search=' + searchText);
    console.log(res);
    const data = await res.json();
    console.log(data);
    setNext(data.next);
    setBooks(data.results);
    setIsBookLoading(false);
  }

  async function loadNext() {
    setIsNextBookLoading(true);
    const res = await fetch(next);
    const data = await res.json();
    setNext(data.next);
    setBooks((prevState) => [ ...prevState, ...data.results ]);
    setIsNextBookLoading(false);
  }

  async function loadFavorites() {
    const res = await fetch('/api/favorite?userUID=' + user?.uid);
    const data = await res.json();
    setMyFavoriteBooks(data.books);
  }

  async function addToFavorite(book) {
    await fetch('/api/favorite', { method: 'POST', body: JSON.stringify({ id: book.id, formats: book.formats, userUID: user?.uid }) });
  }

  async function removeFromFavorite(book) {
    await fetch('/api/favorite', { method: 'DELETE', body: JSON.stringify({ id: book.id, userUID: user?.uid }) });
  }

  const renderBookCards = () => {
    if (isBookLoading) return <Loading />;
    if (books.length === 0 && !showFavoriteBooksOnly) return <h3>No books found</h3>;
    if (books.length === 0 && showFavoriteBooksOnly) return <h3>No favorite books found</h3>;

    return books.map((book) => {  
      return (<Grid key={book.id} xs={2}>{renderBookCard(book)}</Grid>);
    });
  };

  const renderBookCard = (book) => {
    return (<Card css={{ p: "$6", mh: "55vh", mw: "40vw" }}>
              <Card.Header>
                <Grid xs={12}>
                  {renderStar(book)}
                </Grid>
              </Card.Header>
              <Card.Image src={book.formats['image/jpeg']} />
              <Card.Body>
              </Card.Body>
              <Card.Footer><Text b>{book.title}</Text></Card.Footer>
            </Card>
    );
  };

  const renderStar = (book) => {
    if (user) {
      return (<Star isSelected={isBookInFavorite(book)} onClick={() => handleAddButtonClick(book)} />);
    } else {
      return (<MustSigninPopOver />);
    }
  };

  const isBookInFavorite = (book) => {
    if (!myFavoriteBooks) return false;
    return myFavoriteBooks.some((favoriteBook) => favoriteBook.id === book.id);
  };

  const isThereMoreBooks = () => {
    return next !== undefined && next !== null && !showFavoriteBooksOnly;
  };

  const isUserSignedIn = () => {
    return user !== undefined && user !== null;
  };

  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={12} justify="center">
        <h2>Search for books</h2>
      </Grid>
      <Grid xs={12} justify="center">
        <Grid xs={4}></Grid>
        <Grid xs={4} justify="center"><Input width='50vw' aria-label="Book search input" placeholder="Search by author or title" onChange={handleSearchInputChange} onKeyPress={handleSearchInputKeyPress} /></Grid>
        <Grid xs={4}><Checkbox style={{ pointerEvents: !isUserSignedIn ? "none" : "auto" }} isDisabled={!isUserSignedIn()} onClick={handleShowFavoriteBooksOnly}>See my favorite</Checkbox></Grid>
      </Grid>
      {renderBookCards()}
      <Grid xs={12} justify="center">
        { isNextBookLoading && <Loading /> }
        { isNextBookLoading && <Spacer x={2} /> }
        <Button disabled={!isThereMoreBooks()} onClick={loadNext}>Load more</Button>
      </Grid>
    </Grid.Container>
  );
}