export const DayModeSVG = props => {
  return (
    <svg className={props.className} width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <line x1='1' x2='4' y1='14' y2='14' />
      <line x1='24' x2='27' y1='14' y2='14' />
      <line x1='14' x2='14' y1='1' y2='4' />
      <line x1='14' x2='14' y1='24' y2='27' />
      <line x1='5' x2='7' y1='5' y2='7' />
      <line x1='21' x2='23' y1='21' y2='23' />
      <line x1='5' x2='7' y1='23' y2='21' />
      <line x1='21' x2='23' y1='7' y2='5' />
      <circle cx='14' cy='14' r='5.2' />
    </svg>
  );
};
