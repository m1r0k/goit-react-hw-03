import css from './ContactForm.module.css'
import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

const phoneRegExp = /^(\d{3}-\d{2}-\d{2})$/;;
const contactSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too short!').max(30, 'Too long!').required('This is required you dummy!'),
    number: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('This is required you dummy!')
});

export default function ContactForm ({ onAdd }) {
    const contactNameFieldId = useId();
    const numberFieldId = useId();

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({
            name: e.target.elements.name.value,
            phone: e.target.elements.number.value
        });
        e.target.reset();
    };

    return (
        <Formik initialValues={{
            id: '',
            name: '',
            number: ''
        }} validationSchema={contactSchema}
            onSubmit={(values, actions) => {
            onAdd(values);
            actions.resetForm();
        }}>
            <Form className={css.form} onSubmit={handleSubmit}>
                <div className={css.div}>
                    <label htmlFor={contactNameFieldId}>Name</label>
                    <Field className={css.input} name='name' id={contactNameFieldId} placeholder="Name" />
                    <ErrorMessage className={css.error} name='name' component='span'></ErrorMessage>
                </div>
                <div className={css.div}>
                    <label htmlFor={numberFieldId}>Number</label>
                    <Field className={css.input} type="tel" name='number' id={numberFieldId} placeholder="123-45-67" />
                    <ErrorMessage className={css.error} name='number' component='span'></ErrorMessage>
                </div>
                <button className={css.btn} type='submit'>Add contact</button>
            </Form>
        </Formik>
    );
}