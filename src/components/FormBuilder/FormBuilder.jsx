import React from 'react';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'movieBrowserForm';
const ADMIN_PASSWORD = '1234';

const FIELD_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'textarea', label: 'Long Text' },
  { value: 'number', label: 'Number' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'select', label: 'Select' },
  { value: 'multiselect', label: 'Multiple Select' },
  { value: 'radio', label: 'Radio Buttons' },
  { value: 'checkbox', label: 'Checkboxes' },
  { value: 'date', label: 'Date' },
  { value: 'time', label: 'Time' },
  { value: 'datetime', label: 'Date & Time' },
  { value: 'rating', label: 'Rating ' },
  { value: 'yesno', label: 'Yes / No' },
];

function FormBuilder() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [fields, setFields] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const form = JSON.parse(saved);

        setTitle(form.title || '');
        setFields(form.fields || []);
      } catch (error) {
        console.error('Could not load saved form:', error);
      }
    }
  }, []);

  const login = () => {
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setMessage('');
    } else {
      setMessage('Wrong password.');
    }
  };

  const addField = () => {
    const newField = {
      id: `${Date.now()}-${Math.random()}`,
      label: '',
      type: 'text',
      required: false,
      placeholder: '',
      options: ['Option 1', 'Option 2'],
      min: 1,
      max: 5,
    };

    setFields((current) => [...current, newField]);
  };

  const updateField = (id, property, value) => {
    setFields((current) =>
      current.map((field) =>
        field.id === id ? { ...field, [property]: value } : field
      )
    );
  };

  const removeField = (id) => {
    setFields((current) => current.filter((field) => field.id !== id));
  };

  const moveField = (index, direction) => {
    const newFields = [...fields];

    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= newFields.length) {
      return;
    }

    [newFields[index], newFields[newIndex]] = [
      newFields[newIndex],
      newFields[index],
    ];

    setFields(newFields);
  };

  const saveForm = () => {
    if (!title.trim()) {
      setMessage('Please enter a form title.');
      return;
    }

    if (fields.length === 0) {
      setMessage('Please add at least one field.');
      return;
    }

    const invalidField = fields.find((field) => !field.label.trim());

    if (invalidField) {
      setMessage('Every field needs a label.');
      return;
    }

    const form = {
      title: title.trim(),
      fields,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));

    setMessage('Form saved successfully!');
  };

  const clearBuilder = () => {
    const confirmed = window.confirm(
      'Are you sure you want to clear the form?'
    );

    if (!confirmed) {
      return;
    }

    setTitle('');
    setFields([]);
    setMessage('');

    localStorage.removeItem(STORAGE_KEY);
  };

  if (!loggedIn) {
    return (
      <div className="form-page">
        <div className="form-card admin-login">
          <h1>Form Builder</h1>

          <p>Admin Login</p>

          <input
            type="password"
            value={password}
            placeholder="Admin password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                login();
              }
            }}
          />

          <button className="save-button" onClick={login}>
            Login
          </button>

          {message && <div className="form-message error">{message}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-builder-header">
          <div>
            <h1>Form Builder</h1>
            <p>Create the form your users will fill out.</p>
          </div>

          <button
            className="secondary-button"
            onClick={() => {
              setLoggedIn(false);
              setPassword('');
            }}
          >
            Logout
          </button>
        </div>

        <label>Form Title</label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Example: Movie Request Form"
        />

        <div className="builder-fields">
          {fields.length === 0 && (
            <div className="empty-builder">
              No fields yet.
              <br />
              Click "Add Field" to start.
            </div>
          )}

          {fields.map((field, index) => (
            <div className="builder-field" key={field.id}>
              <div className="field-top">
                <strong>Field {index + 1}</strong>

                <div className="field-actions">
                  <button
                    className="small-button"
                    onClick={() => moveField(index, -1)}
                    disabled={index === 0}
                  >
                    ↑
                  </button>

                  <button
                    className="small-button"
                    onClick={() => moveField(index, 1)}
                    disabled={index === fields.length - 1}
                  >
                    ↓
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => removeField(field.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <label>Field Label</label>

              <input
                type="text"
                value={field.label}
                onChange={(e) => updateField(field.id, 'label', e.target.value)}
                placeholder="Example: Movie Name"
              />

              <label>Field Type</label>

              <select
                value={field.type}
                onChange={(e) => updateField(field.id, 'type', e.target.value)}
              >
                {FIELD_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              {/* PLACEHOLDER */}

              {['text', 'textarea', 'number', 'email', 'phone'].includes(
                field.type
              ) && (
                <>
                  <label>Placeholder</label>

                  <input
                    type="text"
                    value={field.placeholder}
                    onChange={(e) =>
                      updateField(field.id, 'placeholder', e.target.value)
                    }
                    placeholder="Example: Enter movie name"
                  />
                </>
              )}

              {['select', 'multiselect', 'radio', 'checkbox'].includes(
                field.type
              ) && (
                <div className="options-section">
                  <label>Options</label>

                  {field.options.map((option, optionIndex) => (
                    <div className="option-row" key={optionIndex}>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...field.options];

                          newOptions[optionIndex] = e.target.value;

                          updateField(field.id, 'options', newOptions);
                        }}
                      />

                      <button
                        className="delete-option"
                        onClick={() => {
                          const newOptions = field.options.filter(
                            (_, i) => i !== optionIndex
                          );

                          updateField(field.id, 'options', newOptions);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  <button
                    className="add-option-button"
                    onClick={() => {
                      updateField(field.id, 'options', [
                        ...field.options,
                        `Option ${field.options.length + 1}`,
                      ]);
                    }}
                  >
                    + Add Option
                  </button>
                </div>
              )}

              {field.type === 'rating' && (
                <div className="rating-settings">
                  <label>Maximum Rating</label>

                  <select
                    value={field.max}
                    onChange={(e) =>
                      updateField(field.id, 'max', Number(e.target.value))
                    }
                  >
                    <option value="3">3 Stars</option>

                    <option value="5">5 Stars</option>

                    <option value="10">10 Stars</option>
                  </select>
                </div>
              )}

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) =>
                    updateField(field.id, 'required', e.target.checked)
                  }
                />
                Required field
              </label>
            </div>
          ))}
        </div>

        <div className="builder-buttons">
          <button className="add-field-button" onClick={addField}>
            + Add Field
          </button>

          <button className="save-button" onClick={saveForm}>
            Save Form
          </button>

          <button className="clear-button" onClick={clearBuilder}>
            Clear
          </button>
        </div>

        {message && (
          <div
            className={`form-message ${
              message.includes('success') ? 'success' : 'error'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default FormBuilder;
