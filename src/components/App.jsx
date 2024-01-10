import React, { Component } from 'react';
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import { Container, Title, Heading2 } from './App.styled';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: ''
  }
  
  componentDidMount() { 
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({ contacts: parseContacts })
    }    
  }

  componentDidUpdate(prevState) {
  
    if (this.state.contacts !== prevState.contacts) {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  }
}

   addContact = (newContact) => {
    const { contacts } = this.state;

    const newName = newContact.name.toLowerCase();
    const isCheckedContact = contacts.find(({ name }) => name.toLowerCase() === newName);

    if (!isCheckedContact) {
      newContact.id = nanoid();

      this.setState({ contacts: [...this.state.contacts, newContact] });
    } else {
      Notify.failure(`${newContact.name} is already in contacts`);
    }
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id)
    }));
  };

  setFilter = (filterValue) => {
    this.setState({
      filter: filterValue
    });
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
  }

  render() {
    const { filter } = this.state;

    return (
      <Container>
        <Title>Phonebook📱</Title>
        <ContactForm addContact={this.addContact}/>

        <Heading2>Contacts</Heading2>
        <Filter filter={filter} setFilter={this.setFilter} />
        <ContactList contacts={this.filteredContacts()} deleteContact={this.deleteContact} />
      </Container>
    );
  }
}

export default App;
