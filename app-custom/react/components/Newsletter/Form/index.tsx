import React, { useState } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { newsletterFactory } from '../NewsletterFactory'

export const HANDLES_POPUPNEWSLETTER = [
  'newsletterform',
  'newsletterform__image',
  'newsletterform__close',
  'newsletterform__form',
  'newsletterform__formTitle',
  'newsletterform__formSubtitle',
  'newsletterform__formInputEmail',
  'newsletterform__formInputName',
  'newsletterform__formSubmit',
  'newsletterform__success',
  'newsletterform__newsletterlabel',
  'newsletterform__radiogroup',
  'newsletterform__newsletterlabelInput'
] as const

export function NewsletterForm() {
  const { handles } = useCssHandles(HANDLES_POPUPNEWSLETTER)
  const [data, setData] = useState({
    success: false,
  })

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    const newsletterData = {
      nome: form.get('name') as string,
      email: form.get('email') as string,
      sexo: form.get('gender') as string,
    }


    const newsletter = newsletterFactory()
    newsletter.send(newsletterData).then(function () {
      setData(() => ({ ...data, success: true }))
    })

  }

  return (
    <div
      className={applyModifiers(
        handles.newsletterform,
        data.success ? 'success' : ''
      )}
    >
      <span className={handles.newsletterform__formTitle}>
        FIQUE POR DENTRO DAS <strong className="strong">NOVIDADES</strong>
      </span>
      <form className={handles.newsletterform__form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="DIGITE SEU NOME"
          aria-label="DIGITE SEU NOME"
          required
          className={handles.newsletterform__formInputName}
        />
        <input
          type="email"
          name="email"
          placeholder="DIGITE SEU E-MAIL"
          aria-label="DIGITE SEU E-MAIL"
          required
          className={handles.newsletterform__formInputEmail}
        />

        <div className={handles.newsletterform__radiogroup}>
          <label className={handles.newsletterform__newsletterlabel}>
            <input className={handles.newsletterform__newsletterlabelInput}
              type="radio"
              name="gender"
              value="feminino"
              data-gender="feminino"
              required
            />
            Feminino
          </label>
          <label className={handles.newsletterform__newsletterlabel}>
            <input className={handles.newsletterform__newsletterlabelInput}
              type="radio"
              name="gender"
              value="masculino"
              data-gender="masculino"
              required
            />
            Masculino
          </label>
          <label className={handles.newsletterform__newsletterlabel}>
            <input className={handles.newsletterform__newsletterlabelInput}
              type="radio"
              name="gender"
              value="ambos"
              data-gender="ambos"
              required
            />
            Ambos
          </label>
        </div>

        <button
          type="submit"
          className={handles.newsletterform__formSubmit}
          onClick={(e) => {
            const selectedGender = document.querySelector('input[name="gender"]:checked')?.getAttribute('data-gender');
            if (selectedGender) {
              (e.currentTarget as HTMLButtonElement).setAttribute('data-gender', selectedGender);
            }
          }}
        >
          Cadastrar
        </button>
      </form>

      <div className={handles.newsletterform__success}>Cadastrado com sucesso</div>
    </div>
  )


}
