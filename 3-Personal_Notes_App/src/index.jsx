import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/style.css';
import PersonalNotes from './components/PersonalNotes';

const root = createRoot(document.getElementById('root'));
root.render(<PersonalNotes />);