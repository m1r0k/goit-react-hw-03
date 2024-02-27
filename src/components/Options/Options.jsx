import css from './Options.module.css';

export default function Options({ handleClick, totalClicks, resetClick }) {
    return (
        <div className={css.options}>
            <button onClick={() => handleClick('good')}>Good</button>
            <button onClick={() => handleClick('neutral')}>Neutral</button>
            <button onClick={() => handleClick('bad')}>Bad</button>
            {totalClicks !== 0 && <button onClick={() => resetClick()}>Reset</button>}
        </div>
    );
}