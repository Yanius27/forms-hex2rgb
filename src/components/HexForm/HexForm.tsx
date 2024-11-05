import {useRef} from 'react';

import {HEXREGEXP} from '../../constants/hexRegexp';

import './HexForm.css';

export default function HexForm() {
  const rgbRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value.length < 7 || e.target.value[0] !== '#') {
      return;
    }
    const rgbValue = hexToRgb(e.target.value);
    styleChange(rgbValue);
  
  };

  const styleChange = (value: (number | undefined)[]) => {
    if (value.includes(undefined)) {
      return;
    }
    const [r, g, b] = value as number[];
    if (!value.includes(undefined) && rgbRef.current && formRef.current) {
      if (value.includes(NaN)) {
        rgbRef.current.textContent = 'Ошибка!';
        formRef.current.style.backgroundColor = 'rgb(255, 138, 13)';
        rgbRef.current.style.backgroundColor = 'rgb(230, 120, 5)';
      } else {
        rgbRef.current.textContent = `rgb(${r}, ${g}, ${b})`;
        formRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        rgbRef.current.style.backgroundColor = `rgb(${r - 20}, ${g - 20}, ${b - 20})`;
        if ([r, g, b].filter(a => a <= 211).length <= 1) {
          rgbRef.current.style.color = 'black';
        } else {
          rgbRef.current.style.color = 'white';
        }
      }
    }
  };

  const hexToRgb = (hex: string) => {
    const match = hex.match(/\w\w/g);
    if (!match || !hex.match(HEXREGEXP)) return [NaN];
    const [r, g, b] = match.map(x => parseInt(x, 16));

    return [r, g, b];
  };


  return (
    <div
      className="HexForm"
      ref={formRef}
    >
      <form>
        <input
          type="text"
          className="HexForm__input"
          onChange={onInputChange}
        />
        <div
          className="HexForm__rgb-block"
          ref={rgbRef}
        />
      </form>
    </div>
  );
}
