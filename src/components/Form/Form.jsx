import React from 'react';
import { useEffect, useState } from 'react';

const FORM_KEY = 'movieBrowserForm';
const ANSWERS_KEY = 'movieBrowserAnswers';

function Form() {
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadForm();
  }, []);

  const loadForm = () => {
    const saved = localStorage.getItem(FORM_KEY);

    if (!saved) {
      setForm(null);
      return;
    }

    try {
      const parsedForm = JSON.parse(saved);
      setForm(parsedForm);

      const savedAnswers = localStorage.getItem(ANSWERS_KEY);

      if (savedAnswers) {
        const parsedAnswers = JSON.parse(savedAnswers);

        if (parsedAnswers.answers) {
          setAnswers(parsedAnswers.answers);
        } else {
          setAnswers(parsedAnswers);
        }
      }
    } catch (error) {
      console.error('Could not load form:', error);
    }
  };

  const updateAnswer = (fieldId, value) => {
    setAnswers((current) => ({
      ...current,
      [fieldId]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submission = {
      formTitle: form.title,
      answers,
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem(ANSWERS_KEY, JSON.stringify(submission));

    setSubmitted(true);
  };

  if (!form) {
    return (
      <div className="form-page">
        <div className="form-container">
          <h2>No Form Available</h2>
          <p>The admin has not created a form yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="form-container">
        {/* FORM TITLE */}
        <h1 className="form-title">{form.title}</h1>

        <p className="form-description">Please fill out the form below.</p>

        <form onSubmit={handleSubmit}>
          {/* EACH BUILDER FIELD IS ITS OWN ROW */}
          <div className="form-fields">
            {form.fields.map((field) => (
              <div className="user-form-field" key={field.id}>
                {/* FIELD LABEL */}
                <label className="field-label">
                  {field.label}

                  {field.required && <span className="required"> *</span>}
                </label>

                {/* TEXT */}
                {field.type === 'text' && (
                  <input
                    className="form-input"
                    type="text"
                    value={answers[field.id] || ''}
                    required={field.required}
                    placeholder={field.placeholder || field.label}
                    onChange={(e) => updateAnswer(field.id, e.target.value)}
                  />
                )}

                {/* LONG TEXT */}
                {field.type === 'textarea' && (
                  <textarea
                    className="form-input form-textarea"
                    value={answers[field.id] || ''}
                    required={field.required}
                    placeholder={field.placeholder || field.label}
                    onChange={(e) => updateAnswer(field.id, e.target.value)}
                  />
                )}

                {field.type === 'number' && (
                  <input
                    className="form-input"
                    type="number"
                    value={answers[field.id] || ''}
                    required={field.required}
                    placeholder={field.placeholder || field.label}
                    onChange={(e) => updateAnswer(field.id, e.target.value)}
                  />
                )}

                {field.type === 'email' && (
                  <input
                    className="form-input"
                    type="email"
                    value={answers[field.id] || ''}
                    required={field.required}
                    placeholder={field.placeholder || field.label}
                    onChange={(e) => updateAnswer(field.id, e.target.value)}
                  />
                )}

                {field.type === 'phone' && (
                  <input
                    className="form-input"
                    type="tel"
                    value={answers[field.id] || ''}
                    required={field.required}
                    placeholder={field.placeholder || field.label}
                    onChange={(e) => updateAnswer(field.id, e.target.value)}
                  />
                )}

                {field.type === 'date' && (
                  <input
                    className="form-input"
                    type="date"
                    value={answers[field.id] || ''}
                    required={field.required}
                    onChange={(e) => updateAnswer(field.id, e.target.value)}
                  />
                )}

                {field.type === 'time' && (
                  <input
                    className="form-input"
                    type="time"
                    value={answers[field.id] || ''}
                    required={field.required}
                    onChange={(e) => updateAnswer(field.id, e.target.value)}
                  />
                )}

                {field.type === 'datetime' && (
                  <input
                    className="form-input"
                    type="datetime-local"
                    value={answers[field.id] || ''}
                    required={field.required}
                    onChange={(e) => updateAnswer(field.id, e.target.value)}
                  />
                )}

                {field.type === 'select' && (
                  <select
                    className="form-input"
                    value={answers[field.id] || ''}
                    required={field.required}
                    onChange={(e) => updateAnswer(field.id, e.target.value)}
                  >
                    <option value="">Select...</option>

                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}

                {field.type === 'multiselect' && (
                  <select
                    className="form-input"
                    multiple
                    onChange={(e) => {
                      const values = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      );

                      updateAnswer(field.id, values);
                    }}
                  >
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}

                {field.type === 'radio' && (
                  <div className="radio-options">
                    {field.options?.map((option) => (
                      <label key={option} className="radio-option">
                        <input
                          type="radio"
                          name={field.id}
                          value={option}
                          checked={answers[field.id] === option}
                          required={field.required}
                          onChange={(e) =>
                            updateAnswer(field.id, e.target.value)
                          }
                        />

                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {field.type === 'checkbox' && (
                  <div className="checkbox-options">
                    {field.options?.map((option) => {
                      const current = answers[field.id] || [];

                      return (
                        <label key={option} className="checkbox-option">
                          <input
                            type="checkbox"
                            value={option}
                            checked={current.includes(option)}
                            onChange={(e) => {
                              const newValues = e.target.checked
                                ? [...current, option]
                                : current.filter((value) => value !== option);

                              updateAnswer(field.id, newValues);
                            }}
                          />

                          <span>{option}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {field.type === 'yesno' && (
                  <select
                    className="form-input"
                    value={answers[field.id] || ''}
                    required={field.required}
                    onChange={(e) => updateAnswer(field.id, e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                )}

                {field.type === 'rating' && (
                  <select
                    className="form-input"
                    value={answers[field.id] || ''}
                    required={field.required}
                    onChange={(e) => updateAnswer(field.id, e.target.value)}
                  >
                    <option value="">Select rating...</option>

                    {Array.from(
                      { length: field.max || 5 },
                      (_, index) => index + 1
                    ).map((rating) => (
                      <option key={rating} value={rating}>
                        {'⭐'.repeat(rating)}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>

          <button type="submit" className="submit-form-button">
            Submit
          </button>
        </form>

        {submitted && (
          <div className="submitted-message">Form submitted successfully.</div>
        )}
      </div>
    </div>
  );
}

export default Form;
