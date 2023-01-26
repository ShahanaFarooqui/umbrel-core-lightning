import './DateBox.scss';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DateBox = props => {

  const convertIntoDateFormat = () => {
    let newDate = new Date(props.dataValue * 1000);
    return newDate.getDate() + ' ' + MONTH_NAMES[newDate.getMonth()] + ', ' + newDate.getHours() + ':' + newDate.getMinutes();
  }

  return (
    <div className={props.className}>
      {convertIntoDateFormat()}
    </div>
  );
};

export default DateBox;
