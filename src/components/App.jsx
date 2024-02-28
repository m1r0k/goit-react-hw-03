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

  const [filter, setFilter] = useState('');

  const addContact = (newContact) => {
    const isDuplicateNumber = contacts.some((contact) => contact.number === newContact.number);
    if (isDuplicateNumber) {
      alert('This phone number already exists!');
    } else {
      setContacts((prevContacts) => {
        return [
          ...prevContacts, newContact
        ];
      });
    };
  }

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

  return (
    <div>
      <h1 className={css.header}>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <Filter value={filter} onFilter={setFilter} />
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
    </div>
  );
}