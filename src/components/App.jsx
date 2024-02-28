import { useState, useEffect } from 'react';
import css from './App.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './SearchBox/SearchBox';
import initialContacts from './data/contactBook.json';

export default function App () {

  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      return JSON.parse(savedContacts);
    } else {return initialContacts};
    }
  )

  const [nextId, setNextId] = useState(() => {
    const savedNextId = localStorage.getItem('nextId');
    return savedNextId ? parseInt(savedNextId) : 1;
  });

  const [filter, setFilter] = useState('');

  const addContact = (newContact) => {
    setContacts((prevContacts) => {
      return [
        ...prevContacts,
        {id: `id-${nextId}`,
        ...newContact}
      ];
    });
    setNextId((prevId) => prevId + 1);
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) => {
      return prevContacts.filter((contact) => contact.id !== contactId);
    });
  };

  const visibleContacts = contacts.filter(
    (contact) => contact.name &&
      contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('nextId', nextId);
  }, [nextId]);

  return (
    <div>
      <h1 className={css.header}>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <Filter value={filter} onFilter={setFilter} />
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
    </div>
  );
}